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
}