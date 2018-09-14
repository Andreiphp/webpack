class Header {
    constructor() {
        this.triggerWrapper = document.querySelector('.mobile_menu_trigger');
        this.triggerBtn = document.getElementById('mob_trig');
        this.mobile_menu = document.querySelector('.mobile_menu');
        this.animateTrigger();
    }

    animateTrigger() {
        let self = this;
        this.triggerWrapper.addEventListener('click', () => {
           if( self.triggerBtn.classList.contains('tool')){
               self.triggerBtn.classList.remove('tool');
               self.mobile_menu.classList.remove('mobile_menu_active');

           }else {
               self.triggerBtn.classList.add('tool');
               self.mobile_menu.classList.add('mobile_menu_active');

           }
        })
    }
}

export default Header;