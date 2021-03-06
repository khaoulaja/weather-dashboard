var city;
var searchedCities =[];
var coord;
var key="&appid=699b48e686b0ad4a16a412dc0fed1a03";
//separate formhandler function from get forcast function to avoid the preventdefault error when we click on search history btns
var formHandler =function(event){
    event.preventDefault();
    city =$("#city").val().trim();
    GetForcast();
}
//get current forcast
 var GetForcast = function(){   
   var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
   var response = fetch(apiUrl +city +"&units=imperial" +key).then(function(response){
       if (response.ok) {
            response.json().then(function(data){
                // format timestamp 
                var todayDate=new Date( Date(data.dt));console.log(data);
                var formatedDate = "("+todayDate.getMonth()+'/' +todayDate.getDate()+'/'+todayDate.getFullYear()+")";
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
                $("#forcast").removeClass("d-none");
                GetTodayUV();
                fiveDayForcast();
                saveCities();
            }); 
       }
        else{
            alert("Please enter a valid city.");
        }
    })
    .catch(function(error){
        //alert if there's a connection problem
        alert("Unable to connect to OpenWeatherMap");
    });
}
var GetTodayUV = function(){
    // got the coord as an array from getforcast function
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat="
    var response = fetch(apiUrl+coord.lat+"&lon="+coord.lon+"&units=imperial" +key).then(function(response){
       if (response.ok) {
          response.json().then(function(data){
              console.log(data);
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
           alert("A problem occurred");
       }
    })
    .catch(function(error){
        //alert if there's a connection problem
        alert("Unable to connect to OpenWeatherMap");
    });

}
var fiveDayForcast=function(){
    var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat="
    var response = fetch(apiUrl+coord.lat+"&lon="+coord.lon+"&units=imperial&exclude=minutely,alerts,current,hourly" +key).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
            //i=0 is for the current day
            //i<6 to get just 5 days        
            for (var i = 1; i < 6; i++) {
                //format the date
                $(".day-"+i).find(".date").text(moment.unix(data.daily[i].dt).utc()._d.getMonth()+"/"+moment.unix(data.daily[i].dt).utc()._d.getDate()+"/"+moment.unix(data.daily[i].dt).utc()._d.getFullYear());
                $(".day-"+i).find(".icon").attr("src","https://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+".png");
                $(".day-"+i).find(".temp").text("Temperture: "+data.daily[i].temp.day+"??F");
                $(".day-"+i).find(".wind").text("Wind: "+ data.daily[i].wind_speed+" MPH");
                $(".day-"+i).find(".humidity").text("Humidity: "+data.daily[i].humidity +"%");
                
            }
         }); 
         }
         else{
             alert("A problem occurred");
         }
    })
      .catch(function(error){
          //alert if there's a connection problem
          alert("Unable to connect to OpenWeatherMap");
      });
};

var saveCities =function (){
   //result =searchedCities.find(element =>city);
   //verify that the city is not searched before to not add dupp
       if (!searchedCities.includes(city)) {
           searchedCities.push(city);
           //display the new searched city
           var btnEl = $("<button>").addClass("btn btn-outline-secondary fs-5 w-100 mt-3 text-capitalize").text(city);
           $("#saved-cities").removeClass("d-none");
           $("#saved-cities").append(btnEl);
           
        }
        //save cities in localstorage
        //use json.stringify to save an array not a string
    localStorage.setItem("cities",JSON.stringify(searchedCities));
    
}
var getCities = function(){
    searchedCities = JSON.parse(localStorage.getItem("cities"));
    //initialize the array if it returns null
    if (!searchedCities) {
        searchedCities = [];
    }
    else{
        //remove display none class and load saved cities from localstorage
        $("#saved-cities").removeClass("d-none");
        for (let i = 0; i < searchedCities.length; i++) {
            var btnEl = $("<button>").addClass("btn btn-outline-secondary fs-5 w-100 mt-3 text-capitalize").text(searchedCities[i]);
            $("#saved-cities").append(btnEl);
            
        }
    }
    
}
getCities();
$("#forcast-form").on("submit",formHandler);
$("#saved-cities").on("click","button",function(){
    city = $(this).text().trim();
    GetForcast();

});
