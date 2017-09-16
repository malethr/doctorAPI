var apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  $("#user-form").submit(function(evt){
    evt.preventDefault();
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    let userInput = $("#user-input").val();
    $("#user-form").hide();
    $("h1").hide();

    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?query=${userInput}&location=or-portland&skip=0&limit=10&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        let index = 0;
        let data = response.data;
        for(let index in data){
          let firstName = data[index].profile.first_name;
          let lastName = data[index].profile.last_name;
          let title = data[index].profile.title;
          let street;
          let city;
          let state;
          let zip;
          let phoneIndex = 0; //phone index
          let phoneData;
          let phoneNumber;
          let website;
          let practiceIndex=0;
          let practiceData = data[index].practices;
          let accepts;
          console.log(data)
          for(let practiceIndex in practiceData){
            street = practiceData[practiceIndex].visit_address.street;
            city = practiceData[practiceIndex].visit_address.city;
            state = practiceData[practiceIndex].visit_address.state;
            zip = practiceData[practiceIndex].visit_address.zip;
            website = practiceData[practiceIndex].website;
            if (website === undefined){
              website = "unavailable";
            }
            accepts = practiceData[practiceIndex].accepts_new_patients;
            if(accepts === true){
              accepts = "Yes";
            } else {
              accepts = "No";
            }
            phoneData= practiceData[practiceIndex].phones;
            for (let phoneIndex in phoneData){
              let numberType = phoneData[phoneIndex].type;
              if(numberType === "landline"){
                phoneNumber = phoneData[phoneIndex].number;
              } else {
                phoneNumber = "unavailable";
              }
              phoneIndex++;
            }
          }

          $('#results').append(`<li>Dr. ${firstName} ${lastName} <br> ${street}<br> ${city}, ${state}, ${zip}<br> ${website}<br> ${phoneNumber} <br> ${accepts}`);
          index++;
        }
      },
      error: function() {
        console.log("failure");
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
  });
});

// console.log(Array.isArray(response.data));
// console.log(response);
//
// console.log(response.data[0].profile.image_URL);
// console.log(response.data[0].profile.first_name);
// console.log(response.data[0].profile.last_name);
// console.log(response.data[0].profile.title);
//
// console.log(response.data[0].practices[0].visit_address.street);
// console.log(response.data[0].practices[0].visit_address.city);
// console.log(response.data[0].practices[0].visit_address.state);
// console.log(response.data[0].practices[0].visit_address.zip);
//
// console.log(response.data[0].practices[0].phones[0].number);
// console.log(response.data[0].practices[0].phones[0].type);
//
// console.log(response.data[0].practices[0].website);
//
// console.log(response.data[0].practices[0].accepts_new_patients);


// if ("geolocation" in navigator) {
// return console.log("geolocation is available");
// } else {
// return console.log("unavailable");
// };

// let latitude  = position.coords.latitude;
// let longitude = position.coords.longitude;
// console.log(latitude);

//
// function geoFindMe() {
//
//   if (!navigator.geolocation){
//     console.log( "Geolocation is not supported by your browser");
//   }
//
//   function success(position) {
//     let lat  = parseInt(position.coords.latitude);
//     let long = position.coords.longitude;
//
//     console.log("Latitude is" + lat + '° <br>Longitude is ' + long);
//   }
//
//   function error() {
//     console.log("Unable to retrieve your location");
//   }
//
//   navigator.geolocation.getCurrentPosition(success, error);
// }
// geoFindMe();
