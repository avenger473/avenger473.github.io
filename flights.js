
  var airports={
  "AHMEDABAD":"VAAH",
  "MUMBAI":"VABB",
  "BHUJ":"VAJB",
  "VADODARA":"VABO",
  "DAMAN":"VADN",
  "INDORE":"VAID",
  "JABALPUR":"VAJB",
  "NAGPUR":"VANP",
  "NASHIK":"VANR",
  "PUNE":"VAPO",
  "RAJKOT":"VARK",
  "SURAT":"VASU",
  "UDAIPUR":"VAUD",
  "PATNA":"VEBT",
  "ALLAHABAD":"VEAB",
  "ALONG":"VEAN",
  "KOLKATA":"VECC",
  "CALCUTTA":"VECC",
  "VARANASI":"VEBN",
  "BHUBANESHWAR":"VEBS",
  "DHANBAD":"VEDB",
  "GORAKHPUR":"VEGK",
  "RANCHI":"VERC",
  "ROURKELA":"VERK",
  "RAIPUR":"VERP",
  "AGRA":"VIAG",
  "AMRITSAR":"VIAR",
  "BAREILLY":"VIBY",
  "CHANDIGARH":"VICG",
  "KANPUR":"VICX",
  "NEW DELHI":"VIDP",
  "DELHI":"VIDP",
  "DEHRADUN":"VIDN",
  "GWALIOR":"VIGR",
  "JODHPUR":"VIJO",
  "JAIPUR":"VIJP",
  "JAMMU":"VIJU",
  "LUCKNOW":"VILK",
  "SHIMLA":"VISM",
  "SRINAGAR":"VISR",
  "BENGALURU":"VOBL",
  "BANGALORE":"VOBL",
  "KOCHI":"VOCC",
  "HYDERABAD":"VOHS",
  "CHENNAI":"VOMM",
  "VISHAKAPATNAM":"VOVZ",
  "WARANGAL":"VOWA"
}
  
  
  
var submit=document.getElementById("submit");
var fromdata;
var todata;
submit.addEventListener("click",function(){

  var from=document.getElementById("from");
  var to=document.getElementById("to");
  
  fromdata=from.value.toUpperCase();
  todata=to.value.toUpperCase();
  console.log(fromdata);
  console.log(todata);
  console.log(airports[fromdata].toString());
  console.log(airports[todata].toString());
  
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      function XMLtoJSON() {
  var me = this;      // stores the object instantce

  // gets the content of an xml file and returns it in 
  me.fromFile = function(xml, rstr) {
    // Cretes a instantce of XMLHttpRequest object
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // sets and sends the request for calling "xml"
    xhttp.open("GET", xml ,false);
    xhttp.send(null);

    // gets the JSON string
    var json_str = jsontoStr(setJsonObj(xhttp.responseXML));

    // sets and returns the JSON object, if "rstr" undefined (not passed), else, returns JSON string
    return (typeof(rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
  }

  // returns XML DOM from string with xml content
  me.fromStr = function(xml, rstr) {
    // for non IE browsers
    if(window.DOMParser) {
      var getxml = new DOMParser();
      var xmlDoc = getxml.parseFromString(xml,"text/xml");
    }
    else {
      // for Internet Explorer
      var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
    }

    // gets the JSON string
    var json_str = jsontoStr(setJsonObj(xmlDoc));

    // sets and returns the JSON object, if "rstr" undefined (not passed), else, returns JSON string
    return (typeof(rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
  }

  // receives XML DOM object, returns converted JSON object
  var setJsonObj = function(xml) {
    var js_obj = {};
    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {
        js_obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          js_obj["@attributes"][attribute.nodeName] = attribute.value;
        }
      }
    } else if (xml.nodeType == 3) {
      js_obj = xml.nodeValue;
    }            
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(js_obj[nodeName]) == "undefined") {
          js_obj[nodeName] = setJsonObj(item);
        } else {
          if (typeof(js_obj[nodeName].push) == "undefined") {
            var old = js_obj[nodeName];
            js_obj[nodeName] = [];
            js_obj[nodeName].push(old);
          }
          js_obj[nodeName].push(setJsonObj(item));
        }
      }
    }
    return js_obj;
  }

  // converts JSON object to string (human readablle).
  // Removes '\t\r\n', rows with multiples '""', multiple empty rows, '  "",', and "  ",; replace empty [] with ""
  var jsontoStr = function(js_obj) {
    var rejsn = JSON.stringify(js_obj, undefined, 2).replace(/(\\t|\\r|\\n)/g, '').replace(/"",[\n\t\r\s]+""[,]*/g, '').replace(/(\n[\t\s\r]*\n)/g, '').replace(/[\s\t]{2,}""[,]{0,1}/g, '').replace(/"[\s\t]{1,}"[,]{0,1}/g, '').replace(/\[[\t\s]*\]/g, '""');
    return (rejsn.indexOf('"parsererror": {') == -1) ? rejsn : 'Invalid XML format';
  }
};

// creates object instantce of XMLtoJSON
var xml2json = new XMLtoJSON();
var from=document.getElementById("from");
var to=document.getElementById("to");


var strjson = xml2json.fromStr(xhttp.responseText, 'string');
var obj=JSON.parse(strjson);

console.log(obj);

var numbername=document.getElementById("nav-flight");

for(var i=0;i<5;i++)
{

 var obj1=obj["message:flightMessage"]["fx:Flight"][i];
 var flightNumber=obj1["fx:flightIdentification"]["@attributes"]["iataFlightNumber"];
 var arrivalAerodrome=obj1["fx:arrival"]["fx:arrivalAerodrome"]["@attributes"]["code"];
 var arrivalTime=obj1["fx:arrival"]["fx:arrivalFixTime"]["fb:initial"]["@attributes"]["timestamp"];
 var departureAerodrome=obj1["fx:departure"]["fx:departureAerodrome"]["@attributes"]["code"];
 var departureTime=obj1["fx:departure"]["fx:departureFixTime"]["fb:initial"]["@attributes"]["timestamp"];
 console.log(flightNumber);
 console.log(arrivalAerodrome);
 console.log(arrivalTime);
 console.log(departureAerodrome);
 console.log(departureTime);
       // numbername.innerHTML+='<p><b>'+flightNumber.toString()+'</b></p>';
       // time.innnerHTML+='<div class="row"><div class="col-lg-4" align="center"><p>'+arrivalTime.toString().substring(11,16)+'</p><p>06:30</p></div><div class="col-lg-4" align="center"><p>'+arrivalTime.toString().substring(11,16)+'</p><p style="font-size: 10px">07:30</p><p><img src="public/srp_arrow.svg" style="margin-top: -40px"></p></div><div class="col-lg-4" align="center"><p>'+departureTime.toString().substring(11,16)+'</p><p>14:00</p></div></div>';
       // photo.innerHTML+='<div class="row"><button type="button" class="btn btn-primary btn-md">BOOK</button></div>';

       numbername.innerHTML+='<div class="row" style=" background-color: white; margin: 10px auto;"> <div class="col-lg-3"> <p><b>'+ flightNumber.toString() +'</b></p> <p id="airline '+i+'"><b></b></p> </div> <div class="col-lg-6"> <div class="row"> <div class="col-lg-4" align="center"><p>Departure</p><p>'+ departureTime.toString().substring(11,16) +'</p></div> <div class="col-lg-4" align="center"><p><img src="public/srp_arrow.svg" style="margin-top: 40px" widht=100%></p></div> <div class="col-lg-4" align="center"><p>Arrival</p><p>'+ arrivalTime.toString().substring(11,16) +'</p></div> </div> </div> <div class="col-lg-3" align="center"><button type="button" class="btn btn-info btn-lg" style="margin: 40px auto;">BOOK</button></div> </div>'



       //var obj2=obj1["fx:FlightIdentification"]["@attributes"]["iatatFlightNumber"];
        //console.log(obj1["fx:flightIdentification"]["@attributes"]["iataFlightNumber"]);
      }

      if(i==0)
        numbername.innerHTML='<h2><i>NO FLIGHT FOUND</i></h2>';

    }
  };
  xhttp.open("GET", "https://api.laminardata.aero/v1/aerodromes/"+airports[fromdata].toString()+"/destinations/"+airports[todata].toString()+"/flights?user_key=37de32bdd3e68e73f9dca04720843e6f", true);
  xhttp.send();
});
