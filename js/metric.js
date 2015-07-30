$(function () {
    
    var firstLoad = true;
    
    if(firstLoad){
        firstLoad = false;
        var lhs_isKeyUp = true;
        setOptionValue();
        foo(lhs_isKeyUp);
    }
    
   $("#metric").change( function () {  setOptionValue();  });
    
   $("#lhs_input, #rhs_unit").on ( 'keyup, change' ,function () {
        var lhs_isKeyUp = true;
        foo(lhs_isKeyUp);
    });
    
    $("#rhs_input, #lhs_unit").on ( 'keyup, change' ,function () {
        var lhs_isKeyUp = false;
        foo(lhs_isKeyUp);
    });
        
});

function setOptionValue(){
    var block = "";
       switch($("#metric").val()){
           case "Temperature":{
               block =  
                    "<option value=\"Celsius\">Celsius</option>"+
                    "<option value=\"Fahrenheit\">Fahrenheit</option>"+
                    "<option value=\"Kelvin\">Kelvin</option>";
               break;
           }   
            
           case "Speed":{
               block = 
                    "<option value=\"Miles/hour\">Miles/hour</option>"+
                    "<option value=\"Feet/sec\">Feet/sec</option>"+
                    "<option value=\"Meters/sec\">Meters/sec</option>"+
                    "<option value=\"Km/hour\">Km/hour</option>"+
                    "<option value=\"Km/hour\">Km/hour</option>";
               break;
           }
               
           case "Mass":{
               block = 
                    "<option value=\"Metric ton\">Metric ton</option>"+
                    "<option value=\"Kilogram\">Kilogram</option>"+
                    "<option value=\"Gram\">Gram</option>"+
                    "<option value=\"Milligram\">Milligram</option>"+
                    "<option value=\"Mcg\">Mcg</option>"+
                    "<option value=\"Long ton\">Long ton</option>"+
                    "<option value=\"Short ton\">Short ton</option>"+
                    "<option value=\"Stone\">Stone</option>"+
                    "<option value=\"Pound\">Pound</option>"+
                    "<option value=\"Ounce\">Ounce</option>";
               
               break;
           }
               
           case "DigitalStorage":{
               block = 
                   "<option value=\"Byte\">Byte</option>"+
                   "<option value=\"Kilobyte\">Kilobyte</option>"+
                   "<option value=\"Megabyte\">Megabyte</option>"+
                   "<option value=\"Gigabyte\">Gigabyte</option>"+
                   "<option value=\"Terabyte\">Terabyte</option>";
               
               break;
           }
               
           case "FuelConsumption":{
               block = 
                   "<option value=\"MPG (US)\">MPG (US)</option>"+
                   "<option value=\"MPG (imp.)\">MPG (imp.)</option>"+
                   "<option value=\"Km/liter\">Km/liter</option>"+
                   "<option value=\"Liter/100km\">Liter/100km</option>";
               
               break;
           }
               
           case "Length":{
               block = 
                   "<option value=\"Kilometer\">Kilometer</option>"+
                   "<option value=\"Meter\">Meter</option>"+
                   "<option value=\"Centimeter\">Centimeter</option>"+
                   "<option value=\"Millimeter\">Millimeter</option>"+
                   "<option value=\"Mile\">Mile</option>"+
                   "<option value=\"Yard\">Yard</option>"+
                   "<option value=\"Foot\">Foot</option>"+
                   "<option value=\"Inch\">Inch</option>"+
                   "<option value=\"Nautical mile\">Nautical mile</option>";
               
               break;
           }
               
       }
       
       $("#lhs_unit, #rhs_unit").html(block);
}

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