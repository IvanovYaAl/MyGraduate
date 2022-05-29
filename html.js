

function FillCells() {
    var MaxPop = document.getElementById("population-max");
    var parents = document.getElementById("parents-max");
    var str = document.getElementsByClassName("cell");
    var arrMultiplier = document.getElementsByClassName("multiplying");
    var arrPows = document.getElementsByClassName("pow");
    var Y = document.getElementById("y");

    parents.value = Rand(2, 6);
    MaxPop.value = Rand(5, 10);
    for (var i = 0; i < str.length - 1; i++) {
        arrMultiplier[i].value = Rand(-30, 30);
        arrPows[i].value = Rand(1, 4);
    }
    Y.value = Rand(-100, 100);
}

function CreateEquations() {
    var countEq = document.getElementById('cells-count').value;
    var tmp = document.getElementById("cells");
    tmp.innerHTML = "";
    for (var i = 0; i < countEq; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = 'cell';
        if (i === countEq - 1) {
            newDiv.innerHTML = '<input type="number" class="multiplying" value="1"> <span class="multi-element">*</span> <span class="x">x</span><span class="counter">'+ (i+1) +'</span> <input type="number" class="pow" value="1"><span class="equal">= </span>';
        } else {
            newDiv.innerHTML = '<input type="number" class="multiplying" value="1"> <span class="multi-element">*</span> <span class="x">x</span><span class="counter">'+ (i+1) +'</span> <input type="number" class="pow" value="1"><span class="plus">+ </span>';
        }
        var src = document.getElementById("cells");
        src.append(newDiv);
    }
    var equal = document.createElement("div");
    equal.className = 'cell';
    equal.innerHTML = '<input type="number" value="1" class="y" id="y">'
    var src = document.getElementById("cells");
    src.append(equal);
}
function Nextpopulation() {

}

function Solve() {
    const MaxIterations = 100000;
    const MaxPop = document.getElementById("population-max").value;
    const parents = document.getElementById("parents-max").value;
    const type = Number(document.getElementById("select-main").value);
    var str = document.getElementsByClassName("cell");
    var arrMultiplier = document.getElementsByClassName("multiplying");
    var arrPows = document.getElementsByClassName("pow");
    
    var equalY = Number(document.getElementById("y").value);
    // Создаём первое поколение
    var pepl = [];
    for(var i = 0; i < MaxPop; i++) {
        pepl.push([Rand(1, 30), Rand(1, 30), Rand(1, 30), Rand(1, 30)]);
    }

    // Находим значения первого поколения
    var solEq = [];
    var forCharts = [];
    for (var i = 0; i < MaxPop; i++) {
        var tmp = 0;
        for (var j = 0; j < str.length - 1; j++) {
            tmp += Number(arrMultiplier[j].value) * Math.pow(pepl[i][j], Number(arrPows[j].value)); 
        }
        solEq.push(tmp);
        forCharts.push(tmp);
        solEq[i] = Math.abs(solEq[i] - equalY);
    }
    CreateChart(solEq, equalY);
    var iterations = 0;
    while (!solEq.includes(0)) {
        var pepId = GetMinimalId(solEq, parents);
        var newPepl = [];
        switch(type) {
            case 1:
                newPepl = CreateNewPopulationCrossoverWithMutationAllGenes(pepl, pepId, MaxPop, str.length - 1);
                break;
            case 2:
                newPepl = CreateNewPopulationCrossoverWithoutMutation(pepl, pepId, MaxPop, str.length - 1);
                break;
            case 3:
                newPepl = CreateNewPopulationCrossoverWithMutationOneGene(pepl, pepId, MaxPop, str.length - 1);
                break;
        }
        pepl = newPepl.slice();
        iterations += 1;
        solEq = [];
        forCharts = [];
        for (var i = 0; i < MaxPop; i++) {
            var tmp1 = 0;
            for (var j = 0; j < str.length - 1; j++) {
                tmp1 += Number(arrMultiplier[j].value) * Math.pow(pepl[i][j], Number(arrPows[j].value)); 
            }
            solEq.push(tmp1);
            forCharts.push(tmp1);
            solEq[i] = Math.abs(solEq[i] - equalY);
        }
        var iter = document.getElementById("iterations").innerHTML;
        iter = 'Population: ' + iterations;
        console.log(iterations);
        /*var isEnd = confirm("Next population?");
        if (isEnd === false) {
            alert("Equation was't solved")
            break;
        }*/
        CreateChart(solEq, equalY);
        if (iterations >= MaxIterations) {
            break;
        }
    }
    if (iterations < MaxIterations) { 
        var equation = pepl[solEq.indexOf(0)];
        var result = document.createElement('div');
        result.className = 'result';
        for (var i = 0; i < str.length - 1; i++) {
            if (i !== str.length - 2) {
                result.innerHTML += '<span>'+ arrMultiplier[i].value +'</span> <span class="multi-element">*</span>' + equation[i] + '<span class="pow">'+ arrPows[i].value + '</span><span class="plus">+ </span>'
            } else {
                result.innerHTML += '<span>'+ arrMultiplier[i].value +'</span> <span class="multi-element">*</span>' + equation[i] + '<span class="pow">'+ arrPows[i].value + '</span><span class="equal">= </span>'
            }
        }
        result.innerHTML += '<span>' + equalY +'</span> <span>Populations: '+ iterations+ '</span>'
        var main = document.getElementById("main");
        main.append(result);         
    } else {
        alert('Нет решения в целых числах!')
    }
}
function CreateChart (population, main) {
    /*let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
    // Тип графика
    type: 'bubble',
    
    // Создание графиков
    data: GetData(population, main),

    // Настройки графиков
    options: {}
    });*/
}

function GetData(population, main) {
    /*var newData = [];
    for (var i = 0; i <population.length; i++) {
        var el = {
            x: population[i],
            y: Rand(3, 7),
            r: 5
        };
        newData.push(el);
    }
    var result = {
        datasets: [{
            label: 'Population',
            data: newData,
            backgroundColor: 'rgb(66, 238, 95)'
        },{
            label: 'Result of equation',
            data: [{
                x: main,
                y: 5.5,
                r: 7
            }],
            backgroundColor: 'rgb(255, 0, 0)'
        }]
    };
    return result;*/
}