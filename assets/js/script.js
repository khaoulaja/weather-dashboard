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
              $(".today").find(".icon").attr("src","https://openweathermap.org/img/wn/"+data.weather[0].icon+".png")
              var todayTemp =data.main.temp;
              $(".today").find(".temp").text(todayTemp);
              var todayWind = data.wind.speed;
              $(".today").find(".wind").text(todayWind);
              var todayHumidity = data.main.humidity;
              $(".today").find(".humidity").text(todayHumidity);
              coord=data.coord;
              $("#city").val("");
       
        GetTodayUV();
        fiveDayForcast();
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
              if(todayUV<=2){
                $(".today").find(".uv").removeClass("bg-warning bg-danger");
                $(".today").find(".uv").addClass("bg-success px-2 py-1 text-white rounded");
              }
              else if (todayUV>2 && todayUV<=4) {
                $(".today").find(".uv").removeClass("bg-success bg-danger");  
                $(".today").find(".uv").addClass("bg-warning px-2 py-1 text-white rounded");
              }
              else {
                $(".today").find(".uv").removeClass("bg-success bg-warning");
                $(".today").find(".uv").addClass("bg-danger px-2 py-1 rounded");
              }
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
var fiveDayForcast=function(){
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat="
    var response = fetch(apiUrl+coord.lat+"&lon="+coord.lon+"&units=imperial&exclude=minutely,alerts,current,hourly" +key).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
               
                    
                    for (let i = 1; i < 6; i++) {
                      console.log(data.daily[i]);
                     $(".day-"+i).find(".date").text(moment.unix(data.daily[i].dt).utc()._d.getMonth()+"/"+moment.unix(data.daily[i].dt).utc()._d.getDate()+"/"+moment.unix(data.daily[i].dt).utc()._d.getFullYear());
                     $(".day-"+i).find(".icon").attr("src","https://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+".png");
                     $(".day-"+i).find(".temp").text("Temperture: "+data.daily[i].temp.day+"°F");
                     $(".day-"+i).find(".wind").text("Wind: "+ data.daily[i].wind_speed+" MPH");
                     $(".day-"+i).find(".humidity").text("Humidity: "+data.daily[i].humidity +"%");
                        
                    }
         }); 
         }
         else{
             alert("");
         }
      });
};
// var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=35.8235&lon=-78.8256&exclude=minutely,alerts,current,hourly&appid=699b48e686b0ad4a16a412dc0fed1a03&units=imperial").then(function(response){
//     if (response.ok) {
//        response.json().then(function(data){
          
               
//                for (let i = 1; i < 6; i++) {
//                  console.log(data.daily[i]);
//                 $(".day-"+i).find(".date").text(moment.unix(data.daily[i].dt).utc()._d.getMonth()+"/"+moment.unix(data.daily[i].dt).utc()._d.getDate()+"/"+moment.unix(data.daily[i].dt).utc()._d.getFullYear());
//                 $(".day-"+i).find(".icon").attr("src","https://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+".png");
//                 $(".day-"+i).find(".temp").text("Temperture: "+data.daily[i].temp.day+"°F");
//                 $(".day-"+i).find(".wind").text("Wind: "+ data.daily[i].wind_speed+" MPH");
//                 $(".day-"+i).find(".humidity").text("Humidity: "+data.daily[i].humidity +"%");
                   
//                }
//     }); 
//     }
//     else{
//         alert("");
//     }
//  });
             //    var day1Date =moment.unix(data.daily[1].dt).utc()._d.getMonth()+"/"+moment.unix(data.daily[1].dt).utc()._d.getDate()+"/"+moment.unix(data.daily[1].dt).utc()._d.getFullYear();
            //    $(".day-1").find(".date").text(moment.unix(data.daily[1].dt).utc()._d.getMonth()+"/"+moment.unix(data.daily[1].dt).utc()._d.getDate()+"/"+moment.unix(data.daily[1].dt).utc()._d.getFullYear());
            //    var day1Temp ="Temperture: "+data.daily[1].temp.day+"°F";
            //    $(".day-1").find(".temp").text("Temperture: "+data.daily[1].temp.day+"°F");
            //    var day1Wind ="Wind: "+ data.daily[1].wind_speed+" MPH";
            //    $(".day-1").find(".wind").text("Wind: "+ data.daily[1].wind_speed+" MPH");
            //    var day1Humidty ="Humidity: "+data.daily[1].humidity +"%";
            //    $(".day-1").find(".humidity").text("Humidity: "+data.daily[1].humidity +"%");
              // console.log(day1Humidty);
               
          
          

        //console.log(data);