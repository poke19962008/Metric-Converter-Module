$(function () {
    
    var firstLoad = true;
    
    if(firstLoad){
        firstLoad = false;
        var lhs_isKeyUp = true;
        foo(lhs_isKeyUp);
    }
    
   $("#lhs_input").on ( 'keyup' ,function () {
        var lhs_isKeyUp = true;
        foo(lhs_isKeyUp);
    });
    
    $("#rhs_input").on ( 'keyup' ,function () {
        var lhs_isKeyUp = false;
        foo(lhs_isKeyUp);
    });
    
    $("#lhs_unit").change (function() {
        var lhs_isKeyUp = false;    
        foo(lhs_isKeyUp);
    });
    
    $("#rhs_unit").change (function() {
        var lhs_isKeyUp = true;    
        foo(lhs_isKeyUp);
    });
    
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
    var lhs_unit = $("#lhs_unit").val();
    var rhs_unit = $("#rhs_unit").val();
    
    var rhs_inp = $("#rhs_input");
    var lhs_inp = $("#lhs_input");
    
    if(lhs_unit === rhs_unit){if(lhs_isKeyUp) {rhs_inp.val(Number(lhs_inp.val()));}else{lhs_inp.val(Number(rhs_inp.val()));}}
    
    if(lhs_unit === "Celsius" && rhs_unit === "Fahrenheit"){if(lhs_isKeyUp) {rhs_inp.val(Number(lhs_inp.val())*(9/5)+32);}else{lhs_inp.val(Number(rhs_inp.val())*(9/5)+32);}}
    
    if(lhs_unit === "Celsius" && rhs_unit === "Kelvin"){if(lhs_isKeyUp) {rhs_inp.val(Number(lhs_inp.val())+273.15);}else{lhs_inp.val(Number(rhs_inp.val())+273.15);}}
    
    if(lhs_unit === "Fahrenheit" && rhs_unit === "Celsius"){if(lhs_isKeyUp){rhs_inp.val(Number(lhs_inp.val())*(5/9)-17.7778);}else{lhs_inp.val(Number(rhs_inp.vL())*(5/9)-17.7778);}}
    
    if(lhs_unit === "Fahrenheit" && rhs_unit === "Kelvin"){if(lhs_isKeyUp){rhs_inp.val((Number(lhs_inp.val())+459.67)*(5/9));}else{lhs_inp.val((Number(rhs_inp.val())+459.67)*(5/9));}}
    
    if(lhs_unit === "Kelvin" && rhs_unit === "Celsius"){if(lhs_isKeyUp){rhs_inp.val(Number(lhs_inp.val())-273.15);}else{lhs_inp.val(Number(rhs_inp.val())-273.15);}}
    
     if(lhs_unit === "Kelvin" && rhs_unit === "Fahrenheit"){if(lhs_isKeyUp){rhs_inp.val((Number(lhs_inp.val())-32)/1.8+273.15);}else{lhs_inp.val((Number(rhs_inp.val())-32)/1.8+273.15);}}
    
}