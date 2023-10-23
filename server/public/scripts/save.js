function saveNewNote(){
    const title = document.getElementById("note-title")
    const text = document.getElementById("note-desc")
    //get note-title and note-desc content
    const note = {
        title: title.value,
        text: text.value
    }
    //send note to server
    fetch("api/savenotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    console.log(note)
    console.log('note posted')
    //temporarily display note on screen
    const noteList = document.getElementsByClassName("saved-notes")[0]
    const newNote = document.createElement("div")
    newNote.className = "notes-class"
    const newTitle = document.createElement("div")
    newTitle.className = "notes-title"
    newTitle.innerHTML = note.title
    const newText = document.createElement("div")
    newText.className = "notes-content"
    newText.innerHTML = note.text
    newNote.appendChild(newTitle)
    newNote.appendChild(newText)
    noteList.appendChild(newNote)
    title.value = ""
    text.value = ""
    closeNoteTextBox()
    alignAfterSave()
}