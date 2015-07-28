$( function() {
    
    document.getElementById("go").onclick = function() {metricQuery();};
    
});


/*
    Runs checkMetric.py to get:
    {"isMetricQuery": "true", "lhsUnit": "<some Unit>", "rhsUnit": "<some Unit>", "metric": "<some metric>", "lhsValue": "<some Value>"}
    if the query needs metric converter
    
    else:
    {"isMetricQuery": "false", "lhsUnit": "-", "rhsUnit": "-", "metric": "-", "lhsValue": "-"}
    
    Then calls metricDiv.html
    sets the value of elements retrieved from checkMetric.py
    
    Sample Queries:
    convert 123celsius to fahrenheit <type: 1>
    convert 123 celsius to fahrenheit <type: 2>
*/
function metricQuery(){
    
    $.ajax({                
            async   : true,
            url     : 'http://localhost:8000/cgi-bin/checkMetric.py',
            type    : 'post',
            data    : {q: $("#search").val().trim()},
            dataType: 'text',
            error   : function() {console.log("error...");},

        }).done (function(text) {
        var res = JSON.parse(text);

        if(res['isMetricQuery']){

             $.get("http://localhost/metricCalc/metricDiv.html", function(data, status) {
             $("#MetricDivGoesHere").append(data);  

             $("#metric").val(res["metric"]);
             $("#lhs_input").val(res["lhsValue"]);
             $("#lhs_unit").val(res["lhsUnit"]);
             $("#rhs_unit").val(res["rhsUnit"]);

            });

        }else{
            alert("Not a metric query...");
        }
    });
    

}