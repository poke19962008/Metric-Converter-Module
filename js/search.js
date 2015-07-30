$( function() {
    document.getElementById("go").onclick = function() {metricQuery();};
    
});

function metricQuery(){
    
        var res = getWords($("#search").val());

        if(res !== "NaN"){

            $.get("http://localhost/metricCalc/metricDiv.html", function(data, status) {
              
            $("#MetricDivGoesHere").append(data);
                $( data ).ready( function () { 
                    $("#metric").val(res["type"], res["value"]);
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

var convert= ["convert","conv","meters","m","centimeter","picometer","millimeter","mm","cm","pm","nanometer","nm","yard","mile","inch","foot","ft","m2","cm2","meter-square","square-meter","square-centimeter","centimeter-square","cm-square","m-square","m-sq","cm-sq","sq-m","sq-cm","min","sec","ms","minutes","seconds","milliseconds","farenheit","kelvin","celcius","c","f","k"];

var length= ["meters","m","centimeter","picometer","millimeter","mm","cm","pm","nanometer","nm","yard","mile","inch","foot","ft"];

var area = ["m2","cm2","meter-square","square-meter","square-centimeter","centimeter-square","cm-square","m-square","m-sq","cm-sq","sq-m","sq-cm"];

var time = ["min","sec","ms","minutes","seconds","milliseconds"];

var mass = ["kg","kilogram","ton","gram","ounce","milligram","mg","pound"];

var Temperature = ["farenheit", "kelvin", "celcius", "c", "f", "k", "fahrenheit"];
var tempValue = {"Fahrenheit": ["farenheit", "f", "fahrenheit"], "Celsius": ["celcius", "c"], "Kelvin": ["kelvin", "k"]};

var getType = {4:"length",9:"area",16:"time",25:"mass",36:"Temperature"};
var map = {"Temperature": tempValue}
var modules = [length,area,time,mass,Temperature];


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
            if (foo[key].indexOf(finalReturn["from"]) == 1){
                finalReturn["from"] = key;
            }
            if (foo[key].indexOf(finalReturn["to"]) == 1){
                finalReturn["to"] = key;
            }
        }
        
        return finalReturn;
        }
    else{
        return "NaN";
    }
}