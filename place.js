var xhttp, xhttp1, xhttp2, obj, obj1, obj2, cafe, park, stadium, lat, lng, xhttp3, obj3, sortedArray, coordinates, interests;

var submitdest= document.getElementById('submit');
var destination= document.getElementById('to');
var dest;
destination.addEventListener('change', function(event){
    dest= event.target.value;
    console.log(dest);
});


submitdest.addEventListener('click', function(){


interests = [] ;

sortedArray = [] ;

cafe = [] ;

park = [] ;

stadium = [];

    console.log(dest);
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${dest}&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY`)
    .then(function(res){
       console.log(res.data) ;
       obj = res.data;
       lat = obj.results[0].geometry.location.lat ;
       lng = obj.results[0].geometry.location.lng ;
       console.log(lat);
       console.log(lng);
       return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=20000&type=cafe&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY') ;
   })
    .then(function(res){
       obj1 = res.data;
       for(var i =0; i < obj1.results.length ; i++){
           cafe.push({
             name : obj1.results[i].name,
             rating : obj1.results[i].rating,
             photo : obj1.results[i].photos,
             location : obj1.results[i].geometry.location
         });
       }
       console.log(cafe);
       return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=20000&type=park&key=AIzaSyAOERb90K5NLqz98ZqeacjdRIfNQBrBnVY')
   })
    .then(function(res){
       obj2 = res.data;
       for(var i =0; i < obj2.results.length ; i++){
           park.push({
             name : obj2.results[i].name,
             rating : obj2.results[i].rating,
             photo : obj2.results[i].photos,
             location : obj1.results[i].geometry.location
         });
       }
       console.log(park);
       interests = cafe.concat(park) ;

       interests.sort(function(a, b){
           var keyA = a.rating ;
           var keyB = b.rating ;
           return (keyB - keyA) ;
       });
       console.log(interests);
       for(var i =0; i< 10 ; i++){
           sortedArray.push(interests[i].name);
       }
       console.log(sortedArray);
       var places= document.getElementById('toptenplaces');
          places.innerHTML="";
          for(var i=0;i<10;i++)
            places.innerHTML+='<li class="list-group-item">'+sortedArray[i]+'</li>';


   })
    .catch(function(err){
       console.log(err);
   });

});
