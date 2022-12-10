import workData from './workData.js';
import skillsData from './skillsData.js';
import HScroll from './scroll.js';

let nav = document.querySelector('.nav')
let navToggle = document.querySelector('.nav__toggle')
let liquidContainer = document.querySelector('.liquid-blobs');
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let cursorPoint = document.querySelector('.cursor__point');
let cursorRing = document.querySelector('.cursor__ring');
let lottieContainer = document.getElementById("lottie-container");

// Lottie Animation
lottieContainer.style.width = windowWidth > windowHeight ? `${windowWidth}px` : `${windowWidth * 2}px`;

window.addEventListener('load', () => {
    setTimeout(() => { lottieContainer.remove(); }, 3000);
})

// CURSOR LOGIC
let xPos = 0;
let yPos = 0;
let yOffset = 0;
document.addEventListener('mousemove', e => {
    xPos = e.pageX;
    yPos = e.pageY;
    // cursorPoint.style.setProperty('transform', `translate(${xPos}px, ${yPos}px)`);
    // cursorRing.style.setProperty('transform', `translate(${xPos}px, ${yPos}px)`);
    cursorPoint.style.top = `${yPos}px`;
    cursorPoint.style.left = `${xPos}px`;
    cursorRing.style.top = `${yPos}px`;
    cursorRing.style.left = `${xPos}px`;
    yOffset = yPos - window.scrollY;
})

window.addEventListener('scroll', () => {
    let scroll = window.scrollY;
    // cursorPoint.style.setProperty('transform', `translate(${xPos}px, ${scroll + yOffset}px)`);
    // cursorRing.style.setProperty('transform', `translate(${xPos}px, ${scroll + yOffset}px)`);
    cursorPoint.style.top = `${scroll + yOffset}px`;
    cursorRing.style.top = `${scroll + yOffset}px`;
})

// NAVBAR TOGGLE
navToggle.addEventListener('click', () => {
    let isOpen = nav.getAttribute('data-is-open')
    nav.setAttribute('data-is-open', isOpen === 'true' ? 'false' : 'true')
})

// LIQUID LOGIC
let noOfBlobs = parseInt(windowWidth / 5);
console.log(noOfBlobs);
while (noOfBlobs-- > 0) {
    liquidContainer.appendChild(createBlob());
}

function createBlob() {
    let blob = document.createElement('div');
    blob.classList.add('blob');
    blob.style.animationDuration = `${getRandomNum(5, 15)}s`;
    let blobSize = getRandomNum(2, 4);
    blob.style.height = `${blobSize}rem`;
    blob.style.width = `${blobSize}rem`;
    blob.style.left = `${getRandomNum(0, 100)}%`;
    return blob;
}


// HORIZONTAL SCROLL LOGIC

let containers = document.getElementsByClassName('hscroll-container');

for (let i = 0; i < containers.length; i++) {
    const container = containers[i];

    new HScroll(container, workData[Object.keys(workData)[i]]);

    container.addEventListener("mouseover", (e) => {
        disableScroll();
    });
    container.addEventListener("mouseout", (e) => {
        enableScroll();
    });
}

// SKILLS DATA

let skillsContainer = document.querySelector('.skills__logos-container');
let image = document.createElement('img');
image.src = 'assets/Figma logo.svg';

skillsData.Skills.forEach(skill => {
    let image = document.createElement('img');
    let div = document.createElement('div');
    let p = document.createElement('p');
    image.src = skill.src;
    image.alt = skill.name;
    p.innerText = skill.name.replace(' Logo', '');
    div.classList.add('skills__logo');
    div.appendChild(image);
    div.appendChild(p);
    skillsContainer.appendChild(div);
})





// DISABLE SCROLL

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}


function getRandomNum(min, max) { return Math.random() * (max - min) + min; }