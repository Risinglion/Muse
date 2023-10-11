function closeNoteTextBox() {
    //show it as a pop up over the notes area
    var newNoteTextBox = document.getElementsByClassName("new-note-text-box")[0]
    newNoteTextBox.style.display = "none"
    //reset the opacity
    var root = document.getElementById("root")
    root.style.opacity = "1"
    var topBar = document.getElementsByClassName("top-bar")[0]
    topBar.style.opacity = "1"
    var newNoteBox = document.getElementsByClassName("new-note-text-box")[0]
}

function newNoteTextBox() {
    //show it as a pop up over the notes area
      var newNoteTextBox = document.getElementsByClassName("new-note-text-box")[0]
      newNoteTextBox.style.display = "block"
      //make the rest of the body translucent
        var root = document.getElementById("root")
        root.style.opacity = "0.5"
        var topBar = document.getElementsByClassName("top-bar")[0]
        topBar.style.opacity = "0.5"
        var newNoteBox = document.getElementsByClassName("new-note-text-box")[0]
        newNoteBox.style.opacity = "1"
}