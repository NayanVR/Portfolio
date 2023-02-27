export default class HScroll {

    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.init();
    }

    init() {
        this.currentPixel = Math.abs(this.container.scrollLeft);
        this.attachBlocks();
        this.container.addEventListener("wheel", (e) => {
            this.container.scrollLeft += e.deltaY * 5;
        });

        this.looper();
    }
    attachBlocks() {
        this.data.forEach((item) => {
            let block = document.createElement('div');
            block.classList.add('hscroll-block');
            block.innerHTML = `
            <a target="_blank" href="http://${item.link}">
            <h2>${item.name}</h2>
            <img src="${item.imgurl}" alt="${item.name}">
            </a>
            `;
            this.container.appendChild(block);
        });
    }
    looper() {
        let newPixel = Math.abs(this.container.scrollLeft);
        let diff = newPixel - this.currentPixel;
        let newValue = Math.min(diff * 1.5, 80);
        this.container.querySelectorAll('.hscroll-block').forEach((block) => {
            block.style.transform = `skewX(${-newValue}deg)`;
        });
        this.currentPixel = newPixel;
        requestAnimationFrame(this.looper.bind(this));
    }
}