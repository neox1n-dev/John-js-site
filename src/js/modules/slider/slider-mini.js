import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decoriseSlides () {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.remove(this.activeClass);
            if (this.animate) {
                this.slides[i].querySelector('.card__title').style.opacity = '0.4';
                this.slides[i].querySelector('.card__controls-arrow').style.opacity = '0';
            }
        }

        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);

        }
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decoriseSlides();
        } else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decoriseSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decoriseSlides();
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decoriseSlides();
                    break;
                }
            }


        });
    }
    
    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decoriseSlides();

            if (this.autoplay) {
                setInterval(() => this.nextSlide(), 5000);
            }
        } catch (error) {}
    }
}