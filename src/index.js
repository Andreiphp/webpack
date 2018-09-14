import slide from './classSlider';
import head from './headerAdapt';
import lang from "./language";
import linksNav from "./linksNav";
import sliderProject from "./slider";
import loadProject from "./loadProjects"



if (document.getElementById('main_section')) {
    let slider = new slide();
    slider.run();
    slider.wheel();
}

if (document.querySelector('.mobile_menu_trigger')) {
    let Header = new head();
}

if (document.getElementById('check_lang')) {
    let localisation = new lang();
    localisation.run();
}

if (document.querySelectorAll('.menu_links_items a')) {
    let linkNav = new linksNav();
    linkNav.start();
}

if (document.querySelector('.check-slide')) {
    if (document.querySelector('.check-slide').children.length > 0) {
        new sliderProject();
    }
}


if (document.getElementById('btn_load')) {
    new loadProject();
}


if (document.getElementById('up_top')) {
    document.getElementById('up_top').addEventListener('click', function () {
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    });
}

import './sass/normalize.sass'
import './sass/main.sass';
import "./sass/media.sass"




