$( function() {
    document.getElementById("go").onclick = function() {metricQuery();};
    
});

function metricQuery(){
    
        var res = getWords($("#search").val());

        if(res !== "NaN"){

            $.get("metricDiv.html", function(data, status) {
              
            $("#MetricDivGoesHere").append(data);
                $( data ).ready( function () { 
                    $("#metric").val(res["type"]);
                    $("#metric").trigger("change");
                    
                    $("#lhs_input").val(res["value"]);
                    $("#lhs_unit").val(res["from"]);
                    $("#rhs_unit").val(res["to"]);
                    
                    $("#lhs_input, #lhs_unit, #rhs_unit").trigger("change");
                });
            });          

        }else{
            alert("Not a metric query...");
        }
}

var convert= ["convert","conv",
              "kilometers","km", "kilometer", "meters","m", "meter","yard", "yd","mile", "miles", "mi","inch","foot","ft", "feet",
//              "m2","cm2","meter-square","square-meter","square-centimeter","centimeter-square","cm-square","m-square","m-sq","cm-sq","sq-m","sq-cm",
//              "min","sec","ms","minutes","seconds","milliseconds",
              "farenheit","kelvin","celcius","c","f","k",
              "miles-per-hour", "mph", "km-per-hour", "kmph", "feet-per-sec", "fs", "knot", "knott", "mps", "meter-per-sec",
              "kg","kilogram","kilo","kilos","ton","gram","gm","ounce","oz","ounces","milligram","mg","pound", "lbs", "lb",
              "byte", "bytes", "b", "kilobyte", "kilobytes", "kb", "megabyte", "megabytes", "mb", "gigabyte", "gigabytes", "gb", "terabyte", "terabytes", "tb",
              "km/litre", "kmpl", "kilometerpermile", "kilometerspermile", "mpg", "mile/gallon", "gallonpermile", "gallonspermile", "litre/100"];

var Length= ["kilometers","km", "kilometer", "meters","m", "meter","yard", "yd","mile", "miles", "mi","inch","foot","ft", "feet"];
var lengthValue = {"kilometer": ["kilometers","km", "kilometer"], "meter": ["meters","m", "meter"], "mile": ["mile", "miles", "mi"], "foot": ["foot","ft", "feet"], "yard": ["yard", "yd"], "inch": ["inch"]};
//var area = ["m2","cm2","meter-square","square-meter","square-centimeter","centimeter-square","cm-square","m-square","m-sq","cm-sq","sq-m","sq-cm"];
//
//var time = ["min","sec","ms","minutes","seconds","milliseconds"];

var Mass = ["kg","kilogram","kilo","kilos","ton","gram","gm","ounce","oz","milligram","mg","pound", "lbs", "lb", "ounces"];
var massValue = {"metric_ton":["ton"], "kilogram":["kg","kilogram","kilo","kilos"], "milligram":["milligram","mg"], "gram":["gram","gm"], "pound":["pound", "lbs", "lb"], "ounce":["ounce", "oz", "ounces"]}

var Temperature = ["farenheit", "kelvin", "celcius", "c", "f", "k", "fahrenheit"];
var tempValue = {"Fahrenheit": ["farenheit", "f", "fahrenheit"], "Celsius": ["celcius", "c"], "Kelvin": ["kelvin", "k"]};

var Speed = ["miles-per-hour", "mph","km-per-hour", "kmph", "feet-per-sec", "fs","knot", "knott","ms", "mps", "meter-per-sec"];
var speedValue = {"mph": ["miles-per-hour", "mph"], "kmph": ["km-per-hour", "kmph"], "fs": ["feet-per-sec", "fs"], "knot": ["knot", "knott"], "ms": ["mps", "meter-per-sec"]};

var DigitalStorage = ["byte", "bytes", "b", "kilobyte", "kilobytes", "kb", "megabyte", "megabytes", "mb", "gigabyte", "gigabytes", "gb", "terabyte", "terabytes", "tb"]
var digitalStorageValue = {"byte": ["byte", "bytes", "b"], "kilobyte": ["kilobyte", "kilobytes", "kb"], "megabyte": ["megabyte", "megabytes", "mb"], "gigabyte": ["gigabyte", "gigabytes", "gb"], "terabyte": ["terabyte", "terabytes", "tb"]};

var FuelConsumption = ["km/litre", "kmpl", "kilometerpermile", "kilometerspermile", "mpg", "mile/gallon", "gallonpermile", "gallonspermile", "litre/100"];
var fuelConsumptionValue = {"km_litre": ["km/litre", "kmpl", "kilometerpermile", "kilometerspermile"], "MPG": ["mpg", "mile/gallon", "gallonpermile"], "litre_100": ["litre/100"]};

var getType = {4:"Mass", 9:"Temperature" , 16:"Speed", 25:"DigitalStorage", 36:"FuelConsumption", 49:"Length"};
var map = {"Temperature": tempValue, "Speed": speedValue, "Mass": massValue, "DigitalStorage": digitalStorageValue, "FuelConsumption": fuelConsumptionValue, "Length": lengthValue};
var modules = [Mass, Temperature, Speed, DigitalStorage, FuelConsumption, Length];

function getWords(query){

    query=query.toLowerCase();
    subQuery = query.replace(/\d+/g,"");

    var splitString = subQuery.split(" ");
    var flag=0;
    var digit = 1;
    var determine =1;
    var finalReturn = {};

    for (i=0;i<=splitString.length;i++){

        if (convert.indexOf(splitString[i])>=0){

            flag+=1;
            if (flag==2){
            break;
            }
        }
    }

    if (flag == 2){
        var storeLis =[];

        var pattern =/convert (\d+)\s?(.*) to (.*)|(\d+)\s?(.*) to (.*)|convert (.*) to (.*)|from (.*) to (.*)|(.*) to (.*)|(\d+)\s?(.*) to (.*)|(.*) - (.*)/i;

        var val = query.match(pattern);
        if (val!=null){
        for (i=0;i<val.length;i++){
            if (! (typeof val[i] == "undefined")){	
                if(val[i].trim().indexOf(" ")<0)
                {
                storeLis.push(val[i]);			
                }
            }
        }

        for(j=0;j<modules.length;j++){
                for (i=0;i<splitString.length;i++){

                    if (modules[j].indexOf(splitString[i])>=0) {
                        determine = determine*(j+2);
                    }
                }
            }

            if (Object.keys(getType).indexOf(""+determine)>=0){
            if (storeLis.length==2){
                finalReturn = {"type":getType[determine],"value":digit,"from":storeLis[0],"to":storeLis[1]};
            }

            else if(storeLis.length==3){

                if (parseInt(storeLis[0]) != "NaN")
                    digit=parseInt(storeLis[0]);

                finalReturn = {"type":getType[determine],"value":digit,"from":storeLis[1],"to":storeLis[2]};			

            }
          }
        }
        
        var foo = map[finalReturn["type"]]
        for (var key in foo){
            if (foo[key].indexOf(finalReturn["from"]) !== -1){
                finalReturn["from"] = key;
            }
            if (foo[key].indexOf(finalReturn["to"]) !== -1){
                finalReturn["to"] = key;
            }
        }
        console.log(finalReturn);
        return finalReturn;
        }
    else{
        return "NaN";
    }
}