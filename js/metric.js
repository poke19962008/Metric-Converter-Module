$(function () {
    
    var firstLoad = true;
    
    if(firstLoad){
        firstLoad = false;
        var lhs_isKeyUp = true;
        setOptionValue();
        calculate(lhs_isKeyUp);
    }
    
   $("#metric").change( function () {  setOptionValue();  });
    
   $("#lhs_input, #rhs_unit").on ( 'keyup, change' ,function () {
        var lhs_isKeyUp = true;
        calculate(lhs_isKeyUp);
    });
    
    $("#rhs_input, #lhs_unit").on ( 'keyup, change' ,function () {
        var lhs_isKeyUp = false;
        calculate(lhs_isKeyUp);
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
                    "<option value=\"mph\">Miles/hour</option>"+
                    "<option value=\"fs\">Feet/sec</option>"+
                    "<option value=\"ms\">Meters/sec</option>"+
                    "<option value=\"kmph\">Km/hour</option>"+
                    "<option value=\"knot\">Knot</option>";
               break;
           }
               
           case "Mass":{
               block = 
                    "<option value=\"metric_ton\">Metric ton</option>"+
                    "<option value=\"kilogram\">Kilogram</option>"+
                    "<option value=\"gram\">Gram</option>"+
                    "<option value=\"milligram\">Milligram</option>"+
                    "<option value=\"pound\">Pound</option>"+
                    "<option value=\"ounce\">Ounce</option>";
               
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

function calculate (lhs_isKeyUp){
    var lhs_unit = $("#lhs_unit").val();
    var rhs_unit = $("#rhs_unit").val();
    
    var rhs_inp = $("#rhs_input");
    var lhs_inp = $("#lhs_input");
    
    if(lhs_unit === rhs_unit){if(lhs_isKeyUp) {rhs_inp.val(Number(lhs_inp.val()));}else{lhs_inp.val(Number(rhs_inp.val()));}}    
    
    switch($("#metric").val()){
        case "Temperature":{    
            if(lhs_isKeyUp) {rhs_inp.val( tempCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( tempCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
            break;
        }
            
        case "Speed":{    
            if(lhs_isKeyUp) {rhs_inp.val( speedCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( speedCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
            break;
        }
            
        case "Mass":{    
            if(lhs_isKeyUp) {rhs_inp.val( massCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( massCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
            break;
        }
    }
    
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
				case 'Kelvin':{
					celcius = num - 273.15;
					farenheit = (num - (9/5))-459.67;
					kelvin = num;
				}
					break;
			}
            var data = {"Fahrenheit":farenheit,"Celsius": celcius,"Kelvin": kelvin};
			return data[unit_];
}

function speedCal(num, unit, unit_){
     var mph, kmph, fs, knot, ms;
     kmph = fs = knot = ms =0.0;
     num = Number(num);
    
			switch(unit){
				case 'mph':{
					kmph = num * 1.609344;
					fs = num * 1.46667;
					knot = num * 0.868976;
					ms = num * 0.44704;
					mph = num;
				}
				break;
				case 'kmph':{
					mph = num * 0.621371;
					fs = num * 0.911344;
					ms = num * 0.277778;
					knot = num * 0.539957;
					kmph = num;
				}
				break;
				case 'fs':{
					mph  = num * 0.681818;
					ms = num * 0.3048;
					kmph = num * 1.09728;
					knot = num * 0.592484;
					fs = num;
				}
				break;
				case 'knot':{
					mph = num * 1.15078;
					fs = num * 1.68781;
					ms = num * 0.514444;
					kmph = num * 1.852;
					knot = num; 
				}
				break;
				case 'ms':{
					mph = num * 2.23694;
					fs = num * 1.46667;
					kmph = num * 3.6;
					knot = num * 1.94384;
					ms = num;
				}
				break;
				default:
					break;
			}
			var data = {"mph" : mph, "kmph": kmph, "fs": fs, "knot": knot, "ms":ms};
            return data[unit_];
		}

function massCal(num, unit, unit_){
			var metric_ton, kilogram, gram, milligram, pound, ounce;
			metric_ton= kilogram= gram= milligram= pound= ounce= 0;
            num = Number(num);
    
			switch(unit){
				case 'metric_ton':{
					metric_ton =num ;
					kilogram = num * 1000;
					gram = num * 1000000;
					milligram = num * 1000000000;
					pound = num * 2204.62;
					ounce = num * 35274;
				}
				break;
				case 'kilogram':{
					metric_ton = num * 0.001;
					kilogram = num;
					gram = num * 1000;
					milligram = num * 1000000;
					pound = num * 2.20462;
					ounce = num * 35.274;
				}
				break;
			case 'milligram':{
				metric_ton = num / 100000000;
				kilogram = num /1000000 ;
				milligram =num;
				gram = num * 0.001;
				pound = num * 2.2046 * 1000000;
				ounce = num * 3.5274 * 100000;
			}
			break;
			case 'gram':{
				metric_ton = num / 1000000;
				kilogram = num * 0.001;
				milligram  =num * 1000;
				pound  = num * 0.00220462;
				ounce  = num * 0.035274;
			}
			break; 
			case 'pound':{
				metric_ton = num * 0.000453592;
				kilogram = num * 0.453592;
				milligram = num * 453592;
				gram = num * 453.592;
				pound  = num ;
				ounce = num * 16;
			}
			break;
			case 'ounce':{
				metric_ton = num * (2.835 / 100000);
				kilogram = num * 0.0283495;
				milligram = num * 28349.5;
				gram = num * 28.3495;
				ounce = num * (3.5274/100000);
			}
			break;
			default:
				break;
			}
			var data = {'metric_ton': metric_ton, 'milligram': milligram, 'gram':gram, 'kilogram': kilogram, 'pound': pound, 'ounce':ounce};
            return data[unit_];
		}	
