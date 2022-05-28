"use strict";
import * as Asc from './AscFunc.js';
const MaxPop = 5;                                       // Количество экземпляров в новом поколении
const parents = 2;                                      // Количество родителей, который будут давать потомство
const equation = { x1: -70, x2: 1, x3: 3, x4: 4, y:-600 };  // Уравнение
const numUnknowns = 4;                                  // Количество неизвестных в уравнении
var pepl = [];
for(var i = 0; i < MaxPop; i++)
{
    pepl.push([Asc.Rand(1, 30), Asc.Rand(1, 30), Asc.Rand(1, 30), Asc.Rand(1, 30)]);
}
console.log(pepl)

var solEq = [];
for (var i = 0; i<MaxPop; i++)
{
    //solEq.push((equation.x1 * pepl[i][0])+(equation.x2 * (pepl[i][1]**2))+(equation.x3 * (pepl[i][2]**3))+(equation.x4 * (pepl[i][3]**4)));
    solEq.push((equation.x1 * pepl[i][0])+(equation.x2 * (pepl[i][0]**2))/*+(equation.x3 * (pepl[i][2]**3))+(equation.x4 * (pepl[i][3]**4))*/);
    solEq[i] = Math.abs(solEq[i] - equation.y);
}
var iterations = 0;
while (!solEq.includes(0))
{
    var peplsId = Asc.GetMinimalId(solEq, parents);
    var newPepl = Asc.CreateNewPopulation(pepl, peplsId, MaxPop, numUnknowns);
    pepl = newPepl.slice();
    iterations+= 1;
    solEq = [];
    for (var i = 0; i<MaxPop; i++)
    {
        //solEq.push((equation.x1 * pepl[i][0])+(equation.x2 * pepl[i][1]**2)+(equation.x3 * pepl[i][2]**3)+(equation.x4 * pepl[i][3]**4));
        solEq.push((equation.x1 * pepl[i][0])+(equation.x2 * (pepl[i][0]**2))/*+(equation.x3 * (pepl[i][2]**3))+(equation.x4 * (pepl[i][3]**4))*/);
        solEq[i] = Math.abs(solEq[i] - equation.y);
    }
    console.log(iterations);
}

console.log(solEq);
console.log(pepl);
var result = pepl[solEq.indexOf(0)];
console.log(result);
console.log(result[0] + " + 2*" + result[1] + "^2 + 3*" + result[2] + "^3 + 4*" + result[3] + "^4 = " + equation.y);
console.log("x1: " + result[0] + ", x2: " + result[1] + ", x3: " + result[2] + ", x4: " + result[3]);