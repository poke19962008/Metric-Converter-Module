$(function () {
    document.getElementById("lhs_input").onkeyup = function () {
        var lhs_isKeyUp = true;
        foo(lhs_isKeyUp)
    };
    
    document.getElementById("rhs_input").onkeyup = function () {
        var lhs_isKeyUp = false;
        foo(lhs_isKeyUp)
    };
    
    document.getElementById("lhs_unit").onchange = function() {
        var lhs_isKeyUp = false;    
        foo(lhs_isKeyUp);
    };
    
    document.getElementById("rhs_unit").onchange = function() {
        var lhs_isKeyUp = true;    
        foo(lhs_isKeyUp);
    };
    
});

function foo(lhs_isKeyUp){
    
     switch (document.getElementById("metric").value){
            case 'Temperature':
                temperature(lhs_isKeyUp);
                
                break;
            default:
                console.log("Default statement");
        
        }
}

function temperature (lhs_isKeyUp){
    var lhs_unit = document.getElementById("lhs_unit").value;
    var rhs_unit = document.getElementById("rhs_unit").value;
    
    var rhs_inp = document.getElementById("rhs_input");
    var lhs_inp = document.getElementById("lhs_input");
    
    if(lhs_unit === rhs_unit){if(lhs_isKeyUp) {rhs_inp.value=Number(lhs_inp.value);}else{lhs_inp.value=Number(rhs_inp.value);}}
    
    if(lhs_unit === "Celsius" && rhs_unit === "Fahrenheit"){if(lhs_isKeyUp) {rhs_inp.value=Number(lhs_inp.value)*(9/5)+32;}else{lhs_inp.value=Number(rhs_inp.value)*(9/5)+32;}}
    
    if(lhs_unit === "Celsius" && rhs_unit === "Kelvin"){if(lhs_isKeyUp) {rhs_inp.value=Number(lhs_inp.value)+273.15;}else{lhs_inp.value=Number(rhs_inp.value)+273.15;}}
    
    if(lhs_unit === "Fahrenheit" && rhs_unit === "Celsius"){if(lhs_isKeyUp){rhs_inp.value=Number(lhs_inp.value)*(5/9)-17.7778;}else{lhs_inp.value=Number(rhs_inp.value)*(5/9)-17.7778;}}
    
    if(lhs_unit === "Fahrenheit" && rhs_unit === "Kelvin"){if(lhs_isKeyUp){rhs_inp.value=(Number(lhs_inp.value)+459.67)*(5/9);}else{lhs_inp.value=(Number(rhs_inp.value)+459.67)*(5/9);}}
    
    if(lhs_unit === "Kelvin" && rhs_unit === "Celsius"){if(lhs_isKeyUp){rhs_inp.value=Number(lhs_inp.value)-273.15;}else{lhs_inp.value=Number(rhs_inp.value)-273.15;}}
    
     if(lhs_unit === "Kelvin" && rhs_unit === "Fahrenheit"){if(lhs_isKeyUp){rhs_inp.value=(Number(lhs_inp.value)-32)/1.8+273.15;}else{lhs_inp.value=(Number(rhs_inp.value)-32)/1.8+273.15;}}
    
}