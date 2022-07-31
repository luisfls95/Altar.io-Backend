"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCode = exports.getValuesArray = void 0;
const getValuesArray = (row, col, inputLetter) => {
    const availableLetters = "abcdefghijklmnopqrstuvwxyz";
    const valuesToExport = [];
    const percentage = 20; //%
    if (inputLetter == '' || inputLetter == ' ') {
        for (let rowI = 0; rowI < row; rowI++) {
            valuesToExport.push([]);
            for (let colI = 0; colI < col; colI++) {
                const rng = Math.floor(Math.random() * availableLetters.length);
                valuesToExport[valuesToExport.length - 1].push(availableLetters[rng]);
            }
        }
    }
    else {
        const inputLetterIndex = availableLetters.indexOf(inputLetter);
        const inputLetterLocations = [];
        for (let rowI = 0; rowI < row; rowI++) {
            valuesToExport.push([]);
            for (let colI = 0; colI < col; colI++) {
                let rng = Math.floor(Math.random() * availableLetters.length);
                if (rng == inputLetterIndex) {
                    if (rng <= Math.floor(availableLetters.length / 2))
                        rng++;
                    else
                        rng--;
                }
                valuesToExport[valuesToExport.length - 1].push(availableLetters[rng]);
                inputLetterLocations.push([rowI, colI]);
            }
        }
        const sampleSize = percentage * row * col / 100;
        for (let i = 0; i < sampleSize; i++) {
            const rng = Math.floor(Math.random() * inputLetterLocations.length);
            const coords = inputLetterLocations.splice(rng, 1)[0];
            valuesToExport[coords[0]][coords[1]] = inputLetter;
        }
    }
    return valuesToExport;
};
exports.getValuesArray = getValuesArray;
const getCode = (gridArray) => {
    const dataObj = new Date(Date.now());
    let secs = dataObj.getSeconds().toString();
    if (secs.length == 1)
        secs = '0' + secs;
    const x = parseInt(secs[0]);
    const y = parseInt(secs[1]);
    const char1 = gridArray[x][y];
    const char2 = gridArray[y][x];
    let occurrencesChar1 = 0;
    let occurrencesChar2 = 0;
    gridArray.forEach(elem => {
        elem.forEach(subElem => {
            if (subElem == char1)
                occurrencesChar1++;
            if (subElem == char2)
                occurrencesChar2++;
        });
    });
    if (occurrencesChar1 > 9) {
        const num = occurrencesChar1.toString();
        const units = parseInt(num.substring(0, num.length - 1)) + 1;
        occurrencesChar1 = Math.floor(occurrencesChar1 / units);
    }
    if (occurrencesChar2 > 9) {
        const num = occurrencesChar2.toString();
        const units = parseInt(num.substring(0, num.length - 1)) + 1;
        occurrencesChar2 = Math.floor(occurrencesChar2 / units);
    }
    const code = parseInt(occurrencesChar1.toString() + occurrencesChar2.toString());
    return code;
};
exports.getCode = getCode;
