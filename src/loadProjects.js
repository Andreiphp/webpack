class loadProjects {
    constructor() {
        this.btn = document.getElementById('btn_load');
        this.prod_container = document.querySelector('.portfolio_wr');
        this.preload = document.getElementById('p_prldr');
        this.start = 0;
        this.getCountProjects();
        this.load();
    }

    getCountProjects() {
        let cat = this.btn.getAttribute('data-load');
        return fetch('/countProjects/' + cat, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
        }).then((res) => {
            return res.json();
        }).then(res => {
            if (res <= 3) {
                this.btn.style.display = 'none';
            }
            return res;
        })
    }

    load() {
        this.getCountProjects();
        this.btn.addEventListener('click', function (event) {
            event.preventDefault();
            this.preload.style.display = 'block';
            this.getCountProjects().then((res) => {
                let count = res;
                let cat = this.btn.getAttribute('data-load');
                let cooks = this.getCookie('lang');
                this.start += 3;
                if (this.start + 3 >= count) {
                    this.btn.style.display = 'none';
                }
                this.request(cat, this.start, cooks);
            });
        }.bind(this));
    }

    request(cat, start, cooks) {
        fetch('/loadProjects/', {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'start=' + start + '&cat=' + cat + '&lang=' + cooks
        }).then(res => {

            if (res.statusText === 'OK') {
                return res.json();
            }
        }).then(res => {
            let temp = this.insertTemplate(res);
            return temp;

        }).then(result => {
            this.prod_container.insertAdjacentHTML('beforeEnd', result);
            let insertedElement = document.querySelectorAll('.portfolio_description');
            return insertedElement;
        }).then(result => {
            this.preload.style.display = 'none';
        })
            .catch(error => {
                this.preload.style.display = 'none';
                this.btn.style.display = 'none';
            })
    }


    template(id, img, title, description, view) {
        let tmp = `<div class='portfolio_content'>
                   <div class='portfolio_img'>
                    <span class="portfolio_overlay"></span>
                        <img alt='' title='' src='/dist/public/images/${img}'>
                    </div>
                    <div class='portfolio_description'>
                        <h2 class='portfolio_title'><a href='/project/${id}' title='${title}'>${title}</a></h2>
                        <p class='portfolio_text'>${description}</p>
                        <a href='/project/${id}' title='${title}'>${view}</a>
                    </div>
                </div>`;
        return tmp;
    }

    insertTemplate(arr) {
        let res = '';
        arr.forEach(function (element) {

            res += this.template(element.id, element.img, element.title, element.description, element.view);

        }.bind(this));
        return res;
    }

    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

}

export default loadProjects;

