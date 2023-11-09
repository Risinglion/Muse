function alterMenuVisibility(){
   const menuText = document.getElementsByClassName("menu-item-text")
    //togle display none
    for (let i = 0; i < menuText.length; i++) {
        const element = menuText[i];
        if(element.style.display == "block"){
            element.style.display = "none"
        }else{
            element.style.display = "block"
        }
    }
    //smooth scroll to top only if menu is hidden
    if(menuText[0].style.display == "block"){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }
}