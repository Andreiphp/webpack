class Language {
    constructor() {
        this.select = document.getElementById('check_lang');
        this.choose = document.querySelector('.check_flag');

    }

    run() {
        this.select.addEventListener('click', function () {
            if (this.choose.style.display === 'block') {
                this.choose.style.display = 'none';
            } else {
                this.choose.style.display = 'block';
            }
        }.bind(this));
    }
}

export default Language;