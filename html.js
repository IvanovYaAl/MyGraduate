function CreateEquations() {
    //alert('Create Equations');
    var countEq = document.getElementById('cells-count').value;
    var tmp = document.getElementById("cells");
    tmp.innerHTML = "";
    for (var i = 0; i < countEq; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = 'cell';
        if (i === countEq - 1) {
            newDiv.innerHTML = '<input type="number" class="multiplying" value="1"> <span class="multi-element">*</span> <span class="x">x</span><span class="counter">'+ (i+1) +'</span> <input type="number" class="pow" value="1"><span class="equal">=</span>';
        } else {
            newDiv.innerHTML = '<input type="number" class="multiplying" value="1"> <span class="multi-element">*</span> <span class="x">x</span><span class="counter">'+ (i+1) +'</span> <input type="number" class="pow" value="1"><span class="plus">+</span>';
        }
        var src = document.getElementById("cells");
        src.append(newDiv);
    }
    var equal = document.createElement("div");
    equal.className = 'cell';
    equal.innerHTML = '<input type=number value="1" class="y">'
    var src = document.getElementById("cells");
    src.append(equal);
}

function Solve() {
    const MaxPop = document.getElementById("population-max").value;
    const parents = document.getElementById("parents-max").value;
    var str = document.getElementsByClassName("cell");
    
}