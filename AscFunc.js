"use strict";
function Rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function GetMinimalId(arr1, count) {
    var arr = arr1.slice();
    var returnsArr = [];
    for (var j = 0; j < count; j++) {
        var flag = 0;
        while (arr[flag] === undefined)
        {
            flag = flag + 1;
        }
        var min = arr[flag];
        
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
                flag = i;
            }
        }
        returnsArr.push(flag);
        arr[flag] = undefined;
    }
    return returnsArr;
}

function RandSumOrSub(number)
{
    var newRandX = Rand(1, 5);
    var sumOrSub = Rand(0, 1);
    return (sumOrSub === 1) ? number + newRandX : number - newRandX;
}
function CreateNewPopulationCrossoverWithoutMutation(old, parentsId, MaxPop, numUnknowns) {
    var newPop = [];
    var countParents = parentsId.length;
    var currentParent = 0;
    var leftPart = 1;
    for (var i = 0; i < MaxPop; i++) {
        var newExample = [];
        for (var j = 0; j < numUnknowns; j++) {
            if (j === leftPart) {
                currentParent += 1;
            }
            if (currentParent === countParents) {
                currentParent = 0;
            }
            newExample.push(old[parentsId[currentParent]][j]);
        }
        newPop.push(newExample);
        leftPart += 1;
        if (leftPart === numUnknowns) {
            leftPart = 1;
        }
    }
    return newPop;
}
function CreateNewPopulationCrossoverWithMutationAllGenes(old, parentsId, MaxPop, numUnknowns) {
    var newPop = [];
    var countParents = parentsId.length;
    var currentParent = 0;
    var leftPart = 1;
    for (var i = 0; i < MaxPop; i++) {
        var newExample = [];
        for (var j = 0; j < numUnknowns; j++) {
            if (j === leftPart) {
                currentParent += 1;
            }
            if (currentParent === countParents) {
                currentParent = 0;
            }
            newExample.push(RandSumOrSub(old[parentsId[currentParent]][j]));
        }
        newPop.push(newExample);
        leftPart += 1;
        if (leftPart === numUnknowns) {
            leftPart = 1;
        }
    }
    return newPop;
}

function CreateNewPopulationCrossoverWithMutationOneGene(old, parentsId, MaxPop, numUnknowns) {
    var newPop = [];
    var countParents = parentsId.length;
    var currentParent = 0;
    var leftPart = 1;
    for (var i = 0; i < MaxPop; i++) {
        var newExample = [];
        for (var j = 0; j < numUnknowns; j++) {
            if (j === leftPart) {
                currentParent += 1;
            }
            if (currentParent === countParents) {
                currentParent = 0;
            }
            newExample.push(old[parentsId[currentParent]][j]);
        }
        newPop.push(newExample);
        leftPart += 1;
        if (leftPart === numUnknowns) {
            leftPart = 1;
        }
    }
    for (var i = 0; i < MaxPop; i++) {
        var randGene = Rand(0, numUnknowns - 1);
        newPop[i][randGene] = RandSumOrSub(newPop[i][randGene]);
    }
    return newPop;
}