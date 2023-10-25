function alignNotes() {
    const notes = document.querySelectorAll('.notes-class')
    console.log('Function alignNotes() called.')
    const minWidth = notes[0].offsetWidth
    const containerWidth = window.innerWidth - (document.getElementsByClassName('vertical-menu')[0].offsetWidth + document.getElementById('notes-area').offsetWidth)
    console.log('minWidth: ' + minWidth)
    console.log('containerWidth: ' + containerWidth)
    console.log('numNotesPerRow: ' + (containerWidth / minWidth))
    const numNotesPerRow = Math.floor(containerWidth / minWidth)
    const notesContainer = document.getElementsByClassName('saved-notes')[0]
    //2D array to store the heights of the notes in numNotesPerRow columns and rows until there are no more notes
    let numArr = []
    let numNotes = notes.length
    console.log(numNotes)
    console.log(numNotesPerRow)
    let k = Math.ceil(numNotes/numNotesPerRow)
    console.log(k)
    let l = 0
    for(let i = 0; i < k; i++){
        numArr[i] = []
        for(let j=0; j < numNotesPerRow; j++){
            if(l < numNotes){
                numArr[i][j] = notes[l].offsetHeight
                l++
            } else {
                numArr[i][j] = 0;
            }
        }
    }
    console.log(numArr)
    //store the heights of the notes in the sorted order along with their indices
    let map = []
    let x = 0
    if(notes.length == numNotesPerRow * k){
        for(; x<notes.length; x++){
            map[x] = []
            map[x][0] = i
            map[x][1] = notes[x].offsetHeight
        }
    } else{
        for(let i = 0; i < k; i++){
            for(let j = 0; j < numNotesPerRow; j++){
                map[x] = []
                map[x][0] = i * numNotesPerRow + j
                map[x][1] = numArr[i][j]
                x++
            }
        }
    }
    map.sort(function(a, b){return a[1] - b[1]})
    console.log(map)
    //array to store the heights of each column, initially all 0
    let colHeights = []
    let colArrange = []
    for(let i = 0; i < numNotesPerRow; i++)
        colHeights[i] = 0
    for(let i = 0; i < notes.length; i++)
        colArrange[i] = 0
    //two pointer approach to assign the heights to the notes such that the difference between the heights of the columns is minimum
    let i = 0
    let j = numNotesPerRow * k - 1
    let colIterator = 0
    let numIterations = 0
    while(i<j){
        colHeights[colIterator] += (map[i][1] + map[j][1] + 6)
        //push the notes in the order of their columns
        if(map[i][0]<=notes.length && map[j][0]<=notes.length){
            colArrange[map[i][0]] = colIterator
            colArrange[map[j][0]] = colIterator 
            console.log('Notes placed in column ' + colIterator + ' with heights ' + map[i][1] + ' and ' + map[j][1])
        }
        colIterator = (colIterator + 1) % numNotesPerRow
        i++
        j--
        numIterations+=2
        let x = i
        let y = numIterations
        if(numNotesPerRow*k - numIterations <= numNotesPerRow){
            for(let i = x ; i < y; i++){
                colHeights[colIterator] += (map[i][1] + 3)
                if(map[i][0]<=notes.length) colArrange[map[i][0]] = colIterator
                console.log('Note placed in column ' + colIterator + ' with height ' + map[i][1])
                colIterator = (colIterator + 1) % numNotesPerRow
                numIterations++
            }
            break
        }
    }
    console.log(colArrange)
    console.log(colHeights)
    //prepare an array of arrays to store the notes in the order of their columns
    let notesArr = []
    for(let i = 0; i < numNotesPerRow; i++)
        notesArr[i] = []
    for(let i = 0; i < numNotesPerRow*k; i++){
        notesArr[colArrange[i]].push(i)
    }
    console.log(notesArr)
    for(let i = 0; i < numNotesPerRow; i++){
        var colCount = 0
        let colHeightSoFar = 0
        for(let j = 0; j < notesArr[i].length; j++){
            let y = colHeights[i]
            const index = notesArr[i][j]
            if(index < notes.length && colCount > 0){
                notes[index].style.transform = 'translateY(' + '-'+(colHeightSoFar - 3) + 'px)'
                colHeightSoFar += notes[index].offsetHeight
                colCount++
                y-=(notes[index].offsetHeight + 3)
            } else if(index < notes.length && colCount == 0){
                colHeightSoFar += notes[index].offsetHeight
                colCount++
                y-=(notes[index].offsetHeight + 3)
            }
        }
    }
}

// window.addEventListener('resize', alignNotes);
// window.addEventListener('load', alignAfterSave);

function alignAfterSave(){
    console.log('alignAfterSave() called.')
    setTimeout(alignNotes, 100)
}