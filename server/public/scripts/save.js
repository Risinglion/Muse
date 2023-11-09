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
    //save note to local storage
    saveNoteToLocalStorage(note)
}

function saveNoteToLocalStorage(note){
    let notes = localStorage.getItem("notes")
    if(notes == null){
        notesObj = []
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.push(note)
    localStorage.setItem("notes", JSON.stringify(notesObj))
}

function showNotes(){
    let notes = localStorage.getItem("notes")
    if(notes == null){
        notesObj = []
    }
    else{
        notesObj = JSON.parse(notes)
    }
    let savedNotes = document.getElementsByClassName("saved-notes")[0]
    console.log(notesObj)
    notesObj.forEach((element, index) => {
        const newNote = document.createElement("div")
        newNote.className = "notes-class"
        const newTitle = document.createElement("div")
        newTitle.className = "notes-title"
        newTitle.innerHTML = element.title
        const newText = document.createElement("div")
        newText.className = "notes-content"
        newText.innerHTML = element.text
        newNote.appendChild(newTitle)
        newNote.appendChild(newText)
        savedNotes.appendChild(newNote)
    })
}
