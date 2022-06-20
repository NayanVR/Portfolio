let nav = document.querySelector('.nav')
let navToggle = document.querySelector('.nav__toggle')
let liquidContainer = document.querySelector('.liquid-blobs');
let windowWidth = window.innerWidth;

//Navbar toggle 
navToggle.addEventListener('click', () => {    
    let isOpen = nav.getAttribute('data-is-open')
    nav.setAttribute('data-is-open', isOpen === 'true' ? 'false' : 'true')
})

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

function getRandomNum(min, max) { return Math.random() * (max - min) + min; }