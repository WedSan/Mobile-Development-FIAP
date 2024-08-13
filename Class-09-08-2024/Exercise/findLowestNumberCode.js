function findLowestNumber(array){
    lowestNumber = Number.MIN_SAFE_INTEGER;

    for(i = 0; i < array.length; i++){

        if(lowestNumber < array[i]){
            lowestNumber = array[i];        
        }
    }

    return lowestNumber;
}

// Testing function

arrayListOne = [10, 30, 40, 50, 40, 1, -120312, 19048179, 5, 12038671823712]
arrayListTwo = [10, 30, 50, 80, -1]
arrayListThree = [-10, -50, -200 -129381738]

resultOne = findLowestNumber(arrayListOne)
resultTwo = findLowestNumber(arrayListTwo)
resultThree = findLowestNumber(arrayListThree)
console.log(resultOne, resultTwo, resultThree)