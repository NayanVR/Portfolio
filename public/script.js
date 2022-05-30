let nav = document.querySelector('.nav')
let navToggle = document.querySelector('.nav__toggle')

navToggle.addEventListener('click', () => {    
    let isOpen = nav.getAttribute('data-is-open')
    console.log(isOpen);
    nav.setAttribute('data-is-open', isOpen === 'true' ? 'false' : 'true')
})