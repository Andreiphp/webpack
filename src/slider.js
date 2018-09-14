class ShowProject {
    constructor() {
        this.wrepperImages = document.querySelector('.check-slide');
        this.border = document.getElementById('border');
        this.mainContainer = document.querySelector('.view-img-show');
        this.setImgr = document.querySelector('.preview-img');
        this.imgView = document.getElementById('img-view');
        this.currentImages = 0;
        this.btnPrev = document.getElementById('left');
        this.btnNext = document.getElementById('right');
        this.trigger = document.getElementById('openImage');
        this.setCurrentImage();
        this.setBorder();
        this.clickArrow();
        this.openBigImage();
        this.closeWr();

        this.mainContainer.children[0].src = this.wrepperImages.children[this.currentImages].src;
        window.onresize = function () {
            this.setBorder();
        }.bind(this);
        window.onscroll = function () {
            this.setBorder();
        }.bind(this);
    }


    setCurrentImage() {
        this.setImgr.addEventListener('click', function (event) {
            let newImg = event.target.src;
            if (this.imgView.src !== newImg && event.target.className === 'check-img') {
                this.mainContainer.style.opacity = '0';
                this.mainContainer.style.transition = '0.4s';
                this.mainContainer.addEventListener('transitionend', function () {
                    this.mainContainer.children[1].src = newImg;
                    this.mainContainer.style.opacity = '1';
                    this.setCurrentBorderClick(event.target);
                }.bind(this));
            }
        }.bind(this));
    }

    setBorder() {
        let currElement = this.wrepperImages.children[this.currentImages];
        let position = currElement.getBoundingClientRect();
        this.border.style.left = position.left + 'px';
        this.border.style.top = position.top + 'px';

        let position2 = this.imgView.getBoundingClientRect();
        this.trigger.style.left = position2.left + position2.width - 23 + 'px';
        this.trigger.style.top = position2.top + 4 + 'px';
    }


    setCurrentBorderClick(e) {
        for (let i = 0; i <= this.wrepperImages.children.length - 1; i++) {
            if (e === this.wrepperImages.children[i]) {
                this.currentImages = i;
                this.setBorder();
                break;
            }
        }
    }

    clickArrow() {
        this.btnPrev.addEventListener('click', function (event) {
            this.currentImages = (this.currentImages === 0) ? this.wrepperImages.children.length - 1 : --this.currentImages;
            this.wrepperImages.children[this.currentImages].click();
        }.bind(this));


        this.btnNext.addEventListener('click', function (event) {
            this.currentImages = (this.currentImages === this.wrepperImages.children.length - 1) ? 0 : ++this.currentImages;
            this.wrepperImages.children[this.currentImages].click();
        }.bind(this));
    }

    openBigImage() {
        this.trigger.addEventListener('click', function () {
            document.getElementById('bigImage').src = this.mainContainer.children[1].src;
            document.getElementById('fixedImage').style.display = 'block';
        }.bind(this));
    }


    closeWr() {
        document.getElementById('closeImage').addEventListener('click', function () {
            document.getElementById('fixedImage').style.display = 'none';
        }.bind(this));
    }


}

export default ShowProject;
