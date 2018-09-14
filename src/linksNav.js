class linksNav {
    constructor() {
        this.menu_links = document.querySelectorAll('.menu_links_items a');
        this.cat_Links = document.querySelectorAll('.works_cat_li a');

    }


    start() {
        let links = this.menu_links;
        for (let i = 0; i < this.menu_links.length; i++) {
            if (window.location.href === links[i].href) {
                links[i].classList.add('active');


            }
        }
        this.catLinks();
    }

    catLinks() {
        let links = this.cat_Links;
        console.log(window.location.href);
        for (let i = 0; i < this.cat_Links.length; i++) {
            if (window.location.href === links[i].href) {
                console.log(links);
                this.menu_links[1].classList.add('active');
                links[i].classList.add('active');
            }
            // if (window.location.href === 'http://portfolio/projects/') {
            //     this.menu_links[1].classList.add('active');
            //     links[0].classList.add('active');
            // }
        }
    }


}

export default linksNav;