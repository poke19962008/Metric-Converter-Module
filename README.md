# Metric-Converter-Module
Metric Conversion module for SRM Search Engine 

### Instructions
* Put 'Metric-Converter-Module' file on your Apache localhost server.
* Run:
```
$ cd var/www/Metric-Converter-Module
$ python -m CGIHTTPServer
```
* If Cross-Origin-Resource error comes then:
  - OS X users:
  ```
  $ open -a Google\ Chrome --args --disable-web-security
  ```
  - Ubuntu users:
  ```
  $ google-chrome --disable-web-security
  ```
* Go to "http://localhost/Metric-Converter-Module/queryInp.html" on your browser.

### Sample Queries
* **convert 123celsius to fahrenheit**
* **convert 123 celsius to fahrenheit**
* **convert 123.123 celsius to fahrenheit**
* **convert 123.123celsius to fahrenheit**
* **convert 123.123kelvin to fahrenheit**
