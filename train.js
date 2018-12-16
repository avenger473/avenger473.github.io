var trains={
  "AHMEDABAD":"ADI",
  "MUMBAI":"CST",
  "BHUJ":"BHUJ",
  "VADODARA":"BRC",
  "DAMAN":"DMNJ",
  "INDORE":"INDB",
  "JABALPUR":"JBP",
  "NAGPUR":"NGP",
  "NASHIK":"NK",
  "PUNE":"PUNE",
  "RAJKOT":"RJT",
  "SURAT":"ST",
  "UDAIPUR":"UDZ",
  "PATNA":"PNBE",
  "ALLAHABAD":"ALY",
  "KOLKATA":"KOAA",
  "VARANASI":"BSB",
  "BHUBANESHWAR":"BBS",
  "DHANBAD":"DHN",
  "GORAKHPUR":"GKP",
  "RANCHI":"RNC",
  "ROURKELA":"ROU",
  "RAIPUR":"R",
  "AGRA":"AGC",
  "AMRITSAR":"ASR",
  "BAREILLY":"BE",
  "CHANDIGARH":"CDG",
  "KANPUR":"CNB",
  "NEW DELHI":"NDLS",
  "DEHRADUN":"DDN",
  "GWALIOR":"GWL",
  "JODHPUR":"JU",
  "JAIPUR":"JP",
  "JAMMU":"JAT",
  "LUCKNOW":"LJN",
  "SHIMLA":"SML",
  "SRINAGAR":"SML",
  "BENGALURU":"SBC",
  "BANGALORE":"SBC",
  "KOCHI":"ERS",
  "HYDERABAD":"HYB",
  "CHENNAI":"MAS",
  "VISHAKAPATNAM":"VSKP",
  "WARANGAL":"WL"

};
  
  var from= document.getElementById('from');
  var to= document.getElementById('to');
  var date= document.getElementById('date');
  var search= document.getElementById('submit');

  search.addEventListener('click',  function(){
     console.log(from.value);
     console.log(to.value);
     console.log(date.value);

    var train= new Promise( (res, rej)=>{
    let source= from.value;
    let dest= to.value;
    let doj= date.value;
    var stations= [source, dest, doj];
    if(source&&dest&&doj)
    {
      
      res(stations);

    }

    else
    {
      alert("Input Complete");
      rej("input empty");

    }
  }).then(function(stations){
    
    console.log(stations[0],stations[1]);
    let srcCode= trains[stations[0].toUpperCase()];
    let destCode= trains[stations[1].toUpperCase()];
    
    var train_nav= document.getElementById('nav-train');
    var xhttp_train = new XMLHttpRequest();
      
      xhttp_train.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
          var obj = JSON.parse(this.responseText);
          console.log(obj.trains);
          train_nav.innerHTML='';
          if(obj.total)
           { console.log('train hai');
          for(let i=0;i<obj.total;i++)
          {
            train_nav.innerHTML+='<div class="row" style=" background-color: white; margin: 10px auto;"> <div class="col-lg-3"> <p><b>'+ obj.trains[i].number +'</b></p> <p><b>'+ obj.trains[i].name +'</b></p> </div> <div class="col-lg-6"> <div class="row"> <div class="col-lg-4" align="center"><p>Departure</p><p>'+ obj.trains[i].src_departure_time +'</p></div> <div class="col-lg-4" align="center"><p>Travel Time</p><p style="font-size: 10px">'+ obj.trains[i].travel_time +'</p> <p><img src="public/srp_arrow.svg" style="margin-top: -40px" widht=100%></p></div> <div class="col-lg-4" align="center"><p>Arrival</p><p>'+ obj.trains[i].dest_arrival_time +'</p></div> </div> </div> <div class="col-lg-3" align="center"><button type="button" class="btn btn-info btn-lg" style="margin: 40px auto;">BOOK</button></div> </div>';
          }}
          else
            {train_nav.innerHTML='<h2><i>NO TRAINS FOUND</i></h2>';
          }
        }
       
      };

      console.log(typeof(stations[2]));

      let doj= stations[2].substring(8,10)+'-'+stations[2].substring(5,7)+'-'+stations[2].substring(0,4);
      console.log(doj);
      xhttp_train.open("GET","https://api.railwayapi.com/v2/between/source/"+ srcCode + "/dest/" + destCode + "/date/" + doj + "/apikey/zipuzy6pfg/",true);
      xhttp_train.send();

  }).catch((err)=>{
    console.log(err);
  });


  });
