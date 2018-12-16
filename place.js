var xhttp, xhttp1, xhttp2, obj, obj1, obj2;
var cafe, park, stadium, lat, lng, xhttp3, obj3;
var sortedArray = [], cafe = [], park = [] ,stadium = [];


var submitdest= document.getElementById('submit');
var destination= document.getElementById('to');
var dest= 'pune';
//destination.value.toString();

submitdest.addEventListener('click', ()=>
{
    console.log(dest);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState==4 && this.status==200){
        obj = JSON.parse(this.responseText) ;
        lat = obj.results[0].geometry.location.lat ;
        lng = obj.results[0].geometry.location.lng ;
        console.log(lat);
        console.log(lng);
        xhttp1 = new XMLHttpRequest();
        xhttp1.onreadystatechange = function(){
          if(this.readyState==4 && this.status==200){
            obj1 = JSON.parse(this.responseText);
            for(var i =0; i < obj1.results.length ; i++){
              cafe.push({
                name : obj1.results[i].name,
                rating : obj1.results[i].rating,
                photo : obj1.results[i].photos,
                location : obj1.results[i].geometry.location
            });
          }
        // console.log(cafe);
        xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function(){
          if(this.readyState==4 && this.status==200){
            obj2 = JSON.parse(this.responseText);
            for(var i =0; i < obj2.results.length ; i++){
              park.push({
                name : obj2.results[i].name,
                rating : obj2.results[i].rating,
                photo : obj2.results[i].photos,
                location : obj1.results[i].geometry.location
            });
          }
            // console.log(park);
            var interests = cafe.concat(park) ;
            // xhttp3 = new XMLHttpRequest();
            // xhttp3.onreadystatechange = function(){
            //   if(this.readyState==4 && this.status==200){
            //     obj3 = JSON.parse(this.responseText);
            //     for(var i =0; i < obj3.results.length ; i++){
            //       stadium.push({
            //         name : obj3.results[i].name,
            //         rating : obj3.results[i].rating
            //       });
            //     }
            //     interests = interests.concat(stadium);
            //
           

            interests.sort(function(a, b){
              var keyA = a.rating ;
              var keyB = b.rating ;
              return (keyB - keyA) ;
          });
            console.log(interests);
            for(var i =0; i< 10 ; i++){
              sortedArray.push(interests[i].name);
          }

          var places= document.getElementById('toptenplaces');
          console.log(interests);
          places.innerHTML="";
          for(var i=0;i<10;i++)
            places.innerHTML+='<li class="list-group-item">'+interests[i].name+'</li>';


//                 function initMap() {
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 3,
//     center: {lat: lat, lng: lng}
//   });
//
//   // Create an array of alphabetical characters used to label the markers.
//   var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//
//   // Add some markers to the map.
//   // Note: The code uses the JavaScript Array.prototype.map() method to
//   // create an array of markers based on a given "locations" array.
//   // The map() method here has nothing to do with the Google Maps API.
//   var markers = locations.map(function(location, i) {
//     return new google.maps.Marker({
//       position: location,
//       label: labels[i % labels.length]
//     });
//   });
//
//   // Add a marker clusterer to manage the markers.
//   var markerCluster = new MarkerClusterer(map, markers,
//       {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
// }
// var locations = sortedArray ;
}
};
            //
            // xhttp2.open("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=20000&type=stadium&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY", true);
            // xhttp2.send();
            // var interests = cafe.concat(park) ;

            // console.log(interests);

        //     interests.sort(function(a, b){
        //       var keyA = a.rating ;
        //       var keyB = b.rating ;
        //       return (keyB - keyA) ;
        //     });
        //     console.log(interests);
        //     for(var i =0; i< 10 ; i++){
        //       console.log(interests[i]);
        //     }
        //   }
        // };

        xhttp2.open("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=20000&type=park&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY", true);
        xhttp2.send();
    }
};

xhttp1.open("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=20000&type=cafe&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY", true);
xhttp1.send();

}
};

console.log(dest);
xhttp.open("GET",`https://maps.googleapis.com/maps/api/geocode/json?address=${dest}&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY`,true);
xhttp.send();



});