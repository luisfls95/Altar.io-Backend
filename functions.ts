export const getValuesArray = (row: number, col:number, inputLetter: string): Array<string>[] => {
    const availableLetters = "abcdefghijklmnopqrstuvwxyz"
    const valuesToExport: Array<string>[] = []
    const percentage: number = 20 //%

    if (inputLetter == '' || inputLetter == ' '){
        for (let rowI = 0; rowI < row; rowI++){
            valuesToExport.push([])
            for (let colI = 0; colI < col; colI++){
                const rng = Math.floor(Math.random() * availableLetters.length)
                valuesToExport[valuesToExport.length-1].push(availableLetters[rng])
            }
        }
    }
    else {
        const inputLetterIndex = availableLetters.indexOf(inputLetter)
        const inputLetterLocations = []
        for (let rowI = 0; rowI < row; rowI++){
            valuesToExport.push([])
            for (let colI = 0; colI < col; colI++){
                let rng = Math.floor(Math.random() * availableLetters.length)
                if (rng == inputLetterIndex){
                    if (rng <= Math.floor(availableLetters.length/2) ) rng ++
                    else rng --
                }
                valuesToExport[valuesToExport.length-1].push(availableLetters[rng])
                inputLetterLocations.push([rowI, colI])
            }
        }

        const sampleSize: number = percentage * row * col / 100
        for (let i=0; i<sampleSize; i++){
            const rng = Math.floor(Math.random() * inputLetterLocations.length)
            const coords = inputLetterLocations.splice(rng, 1)[0]
            valuesToExport[coords[0]][coords[1]] = inputLetter
        }
    }

    return valuesToExport
}

export const getCode = (gridArray: Array<string>[]): number =>{
    const dataObj = new Date(Date.now())
    let secs = dataObj.getSeconds().toString()
    if (secs.length == 1) secs = '0' + secs
    const x: number = parseInt(secs[0])
    const y: number = parseInt(secs[1])
    const char1: string = gridArray[x][y]
    const char2: string = gridArray[y][x]
    let occurrencesChar1 = 0
    let occurrencesChar2 = 0
    gridArray.forEach(elem=>{
        elem.forEach(subElem=>{
            if (subElem == char1) occurrencesChar1++
            if (subElem == char2) occurrencesChar2++
        })
    })

    if (occurrencesChar1 > 9) {
        const num: string = occurrencesChar1.toString()
        const units: number = parseInt(num.substring(0, num.length-1)) + 1
        occurrencesChar1 = Math.floor(occurrencesChar1 / units)
    }
    if (occurrencesChar2 > 9) {
        const num: string = occurrencesChar2.toString()
        const units: number = parseInt(num.substring(0, num.length-1)) + 1
        occurrencesChar2 = Math.floor(occurrencesChar2 / units)
    }

    const code: number = parseInt(occurrencesChar1.toString() + occurrencesChar2.toString()) 

    return code
}

