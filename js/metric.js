$(function () {
    
    var firstLoad = true;
    
    if(firstLoad){
        firstLoad = false;
        var lhs_isKeyUp = true;
        setOptionValue();
        calculate(lhs_isKeyUp);
    }
    
   $("#metric").change( function () {  setOptionValue();  });
    
   $("#lhs_input, #rhs_unit").on ( 'keyup change' ,function () {
        var lhs_isKeyUp = true;
        calculate(lhs_isKeyUp);
    });
    
    $("#rhs_input, #lhs_unit").on ( 'keyup change' ,function () {
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
                   "<option value=\"byte\">Byte</option>"+
                   "<option value=\"kilobyte\">Kilobyte</option>"+
                   "<option value=\"megabyte\">Megabyte</option>"+
                   "<option value=\"gigabyte\">Gigabyte</option>"+
                   "<option value=\"terabyte\">Terabyte</option>";
               
               break;
           }
               
           case "FuelConsumption":{
               block = 
                   "<option value=\"MPG\">MPG (US)</option>"+
                   "<option value=\"km_litre\">Km/litre</option>"+
                   "<option value=\"litre_100\">litre/100km</option>";
               
               break;
           }
               
           case "Length":{
               block = 
                   "<option value=\"kilometer\">Kilometer</option>"+
                   "<option value=\"meter\">Meter</option>"+               
                   "<option value=\"mile\">Mile</option>"+
                   "<option value=\"yard\">Yard</option>"+
                   "<option value=\"foot\">Foot</option>"+
                   "<option value=\"inch\">Inch</option>";
               
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
            
        case "DigitalStorage":{    
            if(lhs_isKeyUp) {rhs_inp.val( digitalStorageCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( digitalStorageCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
            break;
        }
            
        case "FuelConsumption":{ 
            if(lhs_isKeyUp) {rhs_inp.val( fuelConsumptionCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( fuelConsumptionCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
            break;
        }
            
        case "Length":{ 
            if(lhs_isKeyUp) {rhs_inp.val( lengthCal(lhs_inp.val(), lhs_unit, rhs_unit) );}else{lhs_inp.val( lengthCal(rhs_inp.val(), rhs_unit, lhs_unit) );}
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

function digitalStorageCal(num, unit, unit_){
			var byte, kilobyte, megabyte, gigabyte, terabyte;
			byte= kilobyte= megabyte= gigabyte= terabyte;
            num = Number(num);
			switch(unit){
				case 'byte':{
					byte = num ;
					kilobyte = num * 0.001;
					megabyte =num / 1000000;
					gigabyte = num / 1000000000;
					terabyte = num / 1000000000000;
				}
				break;
				case 'kilobyte':{
					byte = num * 1000;
					kilobyte= num;
					megabyte =num * 0.001;
					gigabyte = num / 1000000;
					terabyte = num / 1000000000;
				}
				break;
				case 'megabyte':{
					byte = num * 1000000;
					kilobyte = num * 1000;
					megabyte = num;
					gigabyte = num * .001;
					terabyte = num / 1000000;
				}
				break;
				case 'gigabyte':{
					byte = num * 1000000000;
					kilobyte = num * 100000000;
					megabyte =num * 1000;
					gigabyte = num ;
					terabyte = num / 1000 ;
				}
				break;
				case 'terabyte':{
					byte = num *  1000000000000;
					kilobyte = num * 1000000000;
					megabyte =num * 1000000;
					gigabyte = num * 1000;
					terabyte = num  ;
				}
				break;
				default:
					break;
			}
			var data = {'byte': byte, 'kilobyte': kilobyte, 'megabyte': megabyte, 'gigabyte': gigabyte, 'terabyte': terabyte};
			return data[unit_];
		}

function fuelConsumptionCal(num, unit, unit_){
        var km_litre, MPG, litre_100;
        km_litre = MPG = litre_100 = 0;
        num = Number(num);
        switch(unit){
            case 'km_litre':{
                km_litre = num;
                MPG = num * 2.82481;
                litre_100 = num * 100;
                break;
            }
            case 'MPG':{
                km_litre = num * 0.354006;
                MPG  = num;
                litre_100 = num * 282.481;
                break;
            }
            case 'litre_100':{
            km_litre = num * 100;
            MPG = num * 282.481;
            litre_100 = num;
            break;
            }
            default : 
                break;
        }

    var data =  {"km_litre":km_litre, "MPG":MPG, "litre_100":litre_100};
    return data[unit_];
}

function lengthCal(num,unit,unit_){
			var kilometer, meter, mile, foot, yard, inch;
			kilometer = meter = mile = foot = yard = inch = 0;
            num = Number(num);
			switch(unit){
				case 'kilometer':{
					kilometer = num;
					meter = num * 1000;
					mile = num * 0.621371;
					foot = num * 3280.84;
					yard = num * 1093.61;
					inch = num * 39370.1;
					break;
				}
				case 'meter':{
					kilometer = num * 0.001;
					meter = num;
					mile = num * 0.000621371;
					foot = num * 3.28084;
					yard = num * 1.09361;
					inch = num * 39.3701;
					break;
				}
				case 'mile':{
					kilometer = num * 1.60934;
					meter = num * 1609.34;
					mile = num ;
					foot = num * 5280;
					yard = num * 1760;
					inch = num * 63360;
					break;
				}
				case 'foot':{
					kilometer = num * 0.0003048;
					meter = num * 0.3048;
					mile = num * 0.000189394;
					foot = num;
					yard = num * 0.333333;
					inch = num * 12;
                    break;
				}
				case 'yard':{
					kilometer = num * 0.0009144;
					meter = num * 0.9144;
					mile = num * 0.000568182;
					foot = num * 3;
					yard = num;
					inch = num * 36;
                    break;
				}
				case 'inch':{
					kilometer = num * Math.pow(2.54, -5);
					meter = num * 0.0254;
					mile = num * Math.pow(1.5783, -5);
					foot = num * 0.0833333;
					yard = num * 0.0277778;
					inch = num;
                    break;
				}
				default:
                    break;
			}
			var data = {'kilometer':kilometer, 'meter':meter, 'mile':mile, 'foot':foot, 'yard':yard, 'inch':inch};
    console.log(data);
            return(data[unit_]);
		}