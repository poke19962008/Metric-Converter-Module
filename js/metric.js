$(function () {
    
    var firstLoad = true;
    
    if(firstLoad){
        firstLoad = false;
        var lhs_isKeyUp = true;
        foo(lhs_isKeyUp);
    }
    
//   $("#metric").change( function () {
//       var val = $("#metric").val();
//      
//       if(val === "Speed"){
//           $("#lhs_unit #rhs_unit").html(
//                "<option value=\"MPH\">Celsius</option>"+
//                "<option value=\"FPS\">Fahrenheit</option>"+
//                "<option value=\"MS\">Kelvin</option>"
//           );
//       }
//   
//   })
    
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
    if(lhs_isKeyUp) {rhs_inp.val( tempCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( tempCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
    
}

function tempCal (num, unit, unit_) {
    var farenheit, celcius, kelvin;
			farenheit = celcius = kelvin = 0;
    num = Number(num);
			switch(unit){
				case 'Fahrenheit':{
					celcius = ((num-32)*(5/9));
					kelvin = (num + 459.67)*(5/9);
					farenheit = num;
				}
					break;
				case 'Celsius':{
					farenheit =  (num*(9/5))+32;
					kelvin = num + 273;
					celcius = num;
				}
					break;
				case 'Kelvin':
				{
					celcius = num - 273.15;
					farenheit = (num - (9/5))-459.67;
					kelvin = num;
				}
					break;
			}
            var data = {"Fahrenheit":farenheit,"Celsius": celcius,"Kelvin": kelvin};
			return data[unit_];
}