const searchInput = document.getElementById('search-input')
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed')
        //Initiate Search
        let searchValue = searchInput.value
        console.log(searchValue)
        searchAndHighlight(searchValue)
        var closeButton = document.getElementsByClassName('search-bar')[1]
        closeButton.style.display = 'flex'
    }
    else if(event.key == 'Escape'){
        //clear the search input and bring back all the notes
        searchInput.value = ""
        //get all the notes
        const notes = document.getElementsByClassName('notes-class')
        for(let i = 0; i < notes.length; i++){
            notes[i].style.display = 'block'
            notes[i].classList.remove('highlight')
        }
        var closeButton = document.getElementsByClassName('search-bar')[1]
        closeButton.style.display = 'none'
    }
});


function searchAndHighlight(searchTerm){
    //searchTerm to lower case
    searchTerm = searchTerm.toLowerCase()

    const notes = document.getElementsByClassName('notes-class')
    const titles = document.getElementsByClassName('notes-title')
    const content = document.getElementsByClassName('notes-content')
    let ar = [] //array to store the indices of the notes with search term
    //start searching
    for(let i = 0; i < notes.length; i++){
        let title = titles[i].innerHTML
        let text = content[i].innerHTML
        title = title.toLowerCase()
        text = text.toLowerCase()
        let titleIndex = title.indexOf(searchTerm)
        let textIndex = text.indexOf(searchTerm)
        var flag = false
        if(textIndex != -1){
            ar.push(i)
            flag = true
            //add highlight class to the note
            notes[i].classList.add('highlight')
            continue
        }
        if(titleIndex != -1){
            ar.push(i)
            flag = true
            //add highlight class to the note
            notes[i].classList.add('highlight')
            continue
        }
    }
    //hide the notes which do not have the search term
    for(let i = 0; i < notes.length; i++){
        if(!ar.includes(i)){
            notes[i].style.display = 'none'
        }
    }
}