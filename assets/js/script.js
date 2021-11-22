var city;
var coord;
var key="&appid=699b48e686b0ad4a16a412dc0fed1a03";


var GetTodayForcast = function(event){
    event.preventDefault();
    city =$("#city").val().trim();
    console.log(city);
   var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
   var response = fetch(apiUrl +city +"&units=imperial" +key).then(function(response){
       if (response.ok) {
          response.json().then(function(data){
             
              var todayDate=new Date( Date(data.dt));
              var formatedDate = "("+todayDate.getMonth()+'/' +todayDate.getDate()+'/'+todayDate.getFullYear()+")";
              console.log(formatedDate); 
              $(".searched-city").text(city +" "+formatedDate);
              var todayTemp =data.main.temp;
              $(".today").find(".temp").text(todayTemp);
              var todayWind = data.wind.speed;
              $(".today").find(".wind").text(todayWind);
              var todayHumidity = data.main.humidity;
              $(".today").find(".humidity").text(todayHumidity);
              var todayIcon=data.weather[0];
              
              coord=data.coord;
       
        GetTodayUV();
       }); 
       }
       else{
           alert("");
       }
    });

}
var GetTodayUV = function(){
    
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat="
    var response = fetch(apiUrl+coord.lat+"&lon="+coord.lon+"&units=imperial" +key).then(function(response){
       if (response.ok) {
          response.json().then(function(data){
              var todayUV = data.current.uvi;
              $(".today").find(".uv").text(todayUV);

        return todayUV;
       }); 
       }
       else{
           alert("");
       }
    });

}
document.querySelector("#forcast-form").addEventListener("submit",GetTodayForcast);
//GetTodayForcast();
