$( function() {
    
    document.getElementById("go").onclick = function() {metricQuery();};
    
});

function metricQuery(){
    
    $.ajax({                
            async   : true,
            url     : 'http://localhost:8000/cgi-bin/checkMetric.py',
            type    : 'post',
            data    : {},
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