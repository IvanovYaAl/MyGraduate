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
var MaxPop = 5;
var equation = { x1: 1, x2: 2, x3: 3, x4: 4, y:30 };

var pepl = [];
for(var i = 0; i < MaxPop; i++)
{
    pepl.push([Rand(1, 30), Rand(1, 30), Rand(1, 30), Rand(1, 30)]);
}
var x = [Rand(1, 30), Rand(1, 30), Rand(1, 30), Rand(1, 30)]
console.log(pepl)


var solEq = [];
for (var i = 0; i<MaxPop; i++)
{
    solEq.push((equation.x1 * pepl[i][0])+(equation.x2 * pepl[i][1])+(equation.x3 * pepl[i][2])+(equation.x4 * pepl[i][3]));
    solEq[i] = Math.abs(solEq[i] - equation.y);
}
var iterations = 1;
while (!solEq.includes(0))
{
    var parents = 2; // Количество родителей, который будут давать потомство
    var peplsId = GetMinimalId(solEq, parents);

    /*solEq = solEq.sort((a, b) => a - b);
    solEq = solEq.slice(0, parents);*/

    var newPepl = [
            [RandSumOrSub(pepl[peplsId[0]][0]), RandSumOrSub(pepl[peplsId[0]][1]), RandSumOrSub(pepl[peplsId[1]][2]), RandSumOrSub(pepl[peplsId[1]][3])],
            [RandSumOrSub(pepl[peplsId[0]][0]), RandSumOrSub(pepl[peplsId[1]][1]), RandSumOrSub(pepl[peplsId[1]][2]), RandSumOrSub(pepl[peplsId[1]][3])],
            [RandSumOrSub(pepl[peplsId[0]][0]), RandSumOrSub(pepl[peplsId[0]][1]), RandSumOrSub(pepl[peplsId[0]][2]), RandSumOrSub(pepl[peplsId[1]][3])],
            [RandSumOrSub(pepl[peplsId[1]][0]), RandSumOrSub(pepl[peplsId[1]][1]), RandSumOrSub(pepl[peplsId[0]][2]), RandSumOrSub(pepl[peplsId[0]][3])],
            [RandSumOrSub(pepl[peplsId[1]][0]), RandSumOrSub(pepl[peplsId[0]][1]), RandSumOrSub(pepl[peplsId[0]][2]), RandSumOrSub(pepl[peplsId[0]][3])]
        ];
    pepl = newPepl.slice();
    //console.log(peplsId);
    //console.log(newPepl);
    //solEq = solEq.sort((a, b) => a - b);
    //console.log(solEq);
    iterations+= 1;
    solEq = [];
    for (var i = 0; i<MaxPop; i++)
    {
        solEq.push((equation.x1 * pepl[i][0])+(equation.x2 * pepl[i][1])+(equation.x3 * pepl[i][2])+(equation.x4 * pepl[i][3]));
        solEq[i] = Math.abs(solEq[i] - equation.y);
    }
    console.log(iterations);
}

console.log(solEq);
console.log(pepl);
var result = pepl[solEq.indexOf(0)];
console.log(result);
console.log(result[0] + " + 2*" + result[1] + " + 3*" + result[2] + " + 4*" + result[3] + " = " + equation.y);