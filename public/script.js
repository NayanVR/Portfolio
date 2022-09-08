import workData from './workData.js';
import skillsData from './skillsData.js';
import HScroll from './scroll.js';

let nav = document.querySelector('.nav')
let navToggle = document.querySelector('.nav__toggle')
let liquidContainer = document.querySelector('.liquid-blobs');
let navLinks = document.querySelectorAll(".nav__links a");
let windowWidth = window.innerWidth;

//Navbar toggle 
navToggle.addEventListener('click', () => {    
    let isOpen = nav.getAttribute('data-is-open')
    nav.setAttribute('data-is-open', isOpen === 'true' ? 'false' : 'true')
})

// SCROLL SMOOTH FOR NAV LINKS

navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
});

//Liquid Logic
let noOfBlobs = parseInt(windowWidth / 5);
console.log(noOfBlobs);
while (noOfBlobs-- > 0) {
    liquidContainer.appendChild(createBlob());
}

function createBlob() {
    let blob = document.createElement('div');
    blob.classList.add('blob');
    blob.style.animationDuration = `${getRandomNum(5,15)}s`;
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
    
    new HScroll(container, workData.UI);
    
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
    image.src = skill.src;
    image.alt = skill.name;
    skillsContainer.appendChild(image);
})





// DISABLE SCROLL

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
} catch(e) {}

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
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}


function getRandomNum(min, max) { return Math.random() * (max - min) + min; }