class Slider {
    constructor() {
        this.btnPrev = document.getElementById('prev');
        this.btnNext = document.getElementById('next');
        this.bcg_container = document.querySelector('.background_container');
        this.bcg_img = this.bcg_container.children;
        this.slider_content = document.querySelectorAll('.slider_content');
        this.bcg_img[0].className = 'background_img current_item';
        window.onresize = function () {
            document.getElementById('body').style.height = document.documentElement.clientHeight + 'px';
            this.bcg_container.style.height = document.documentElement.clientHeight + 'px';
            this.bcg_container.style.width = document.documentElement.clientWidth + 'px';

        }.bind(this);
        this.currentSlide = 0;
        this.prevSlide = 0;
        this.slider_content[0].classList.add('slider_content_active');
    }

    wheel() {
        document.body.addEventListener('wheel', function (e) {
            if (e.deltaY || e.detail || e.wheelDelta === -100) {
                this.btnNext.click();
            } else {
                this.btnPrev.click();
            }
        }.bind(this));
    }

    run() {
        this.btnNext.addEventListener('click', function () {
            this.setAttributeDisabled();
            this.bcg_container.classList.add('active');
            this.currentSlide = (this.currentSlide === this.bcg_img.length - 1) ? 0 : ++this.currentSlide;
            this.prevSlide = (this.currentSlide === 0) ? this.bcg_img.length - 1 : this.currentSlide - 1;
            this.setClass();
        }.bind(this));

        this.btnPrev.addEventListener('click', function () {
            this.setAttributeDisabled();
            this.bcg_container.classList.add('active');
            this.currentSlide = (this.currentSlide === 0) ? this.bcg_img.length - 1 : --this.currentSlide;
            this.prevSlide = (this.currentSlide === this.bcg_img.length - 1) ? 0 : this.currentSlide + 1;
            this.setClass();
        }.bind(this));
    }

    setClass() {
        this.bcg_img[this.currentSlide].className = 'background_img next_item';
        setTimeout(() => {
            this.bcg_img[this.prevSlide].classList.remove('current_item');
            this.bcg_img[this.currentSlide].classList.remove('next_item');
            this.bcg_img[this.prevSlide].className = 'background_img prev_item';
            this.bcg_img[this.currentSlide].className = 'background_img current_item';
            this.s();
        }, 500);
    }

    s() {
        setTimeout(() => {
            this.bcg_img[this.prevSlide].classList.remove('prev_item');
            this.bcg_img[this.currentSlide].classList.remove('next_item');
            setTimeout(() => {
                this.bcg_container.classList.remove('active');
                this.showContentSlide(this.currentSlide);
                this.removeAttributeDisabled();
            }, 300);
        }, 500)
    }


    setAttributeDisabled() {
        this.btnNext.setAttribute('disabled', 'disabled');
        this.btnPrev.setAttribute('disabled', 'disabled');
    }

    removeAttributeDisabled() {
        this.btnNext.removeAttribute('disabled');
        this.btnPrev.removeAttribute('disabled');
    }

    showContentSlide(currentSlide) {
        for (let i = 0; i < this.slider_content.length; i++) {
            if (i === currentSlide) {
                this.slider_content[i].classList.add('slider_content_active');
            } else {
                this.slider_content[i].classList.remove('slider_content_active');
            }
        }
    }
}


export default Slider;