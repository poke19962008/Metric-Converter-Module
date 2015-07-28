#!/usr/bin/python
__author__ = 'poke19962008'

''' output:
    Type: JSON
    data: {"isMetricQuery": "true/false", "lhsUnit": "Celsius", "rhsUnit": "Fahrenheit", "metric": "Temperature", "lhsValue": "123"} '''

''' Sample Queries:
    convert 123celsius to fahrenheit <type: 1>
    convert 123 celsius to fahrenheit <type: 2>
'''

import keywordExtractor, re, json
import cgi, os, cgitb
cgitb.enable()

os.chdir("cgi-bin")

form = cgi.FieldStorage()

query = keywordExtractor.extract("convert 123celsius to fahrenheit")
numRegExp = "([0-9.]+)"

Found = False

lhsUnit = ""
rhsUnit = ""
lhsValue = ""
metric = ""

print("Content-Type: text/html\n")
# print(form['q'].value)

with open("corpus.json") as f:
    for line in f.readlines():
        MetricData = json.loads(line)
        metric = MetricData["metric"]

        lhsUnit = ""
        rhsUnit = ""
        lhsValue = ""

        for word in query:
            matchLHSvalue = re.search(numRegExp, word)
            matchUnit = re.search(MetricData["RegExp"], word)

            if matchLHSvalue and lhsValue == "":
                lhsValue = matchLHSvalue.group(0)
            if lhsUnit == "" and matchUnit:
                lhsUnit = matchUnit.group(0)
            elif rhsUnit == "" and matchUnit:
                rhsUnit = matchUnit.group(0)

        if lhsUnit != "" and rhsUnit != "" and lhsValue != "":
            Found = True
            break

if Found:
    response = {"isMetricQuery": "true", "lhsUnit": lhsUnit[0].upper()+lhsUnit[1:], "rhsUnit": rhsUnit[0].upper()+rhsUnit[1:], "metric": metric , "lhsValue": lhsValue}
    print(json.dumps(response))
else:
    response = {"isMetricQuery": "false", "lhsUnit": "-", "rhsUnit": "-", "metric": "-", "lhsValue": "-"}
    print(json.dumps(response))