
let ApplicationModule = require('./../js/doctor.js').applicationModule;

let applicationModule = new ApplicationModule();
let displayData = function(response){
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
    for(let practiceIndex in practiceData){
      street = practiceData[practiceIndex].visit_address.street;
      city = practiceData[practiceIndex].visit_address.city;
      state = practiceData[practiceIndex].visit_address.state;
      zip = practiceData[practiceIndex].visit_address.zip;
      website = practiceData[practiceIndex].website;
      if (website === undefined){
        website = "website: unavailable";
      }
      accepts = practiceData[practiceIndex].accepts_new_patients;
      if(accepts === true){
        accepts = "Yes";
      } else {
        accepts = "No";
      }
      phoneData= practiceData[practiceIndex].phones;
      for (let phoneIndex in phoneData){
        let numberType = applicationModule.getDashed(phoneData[phoneIndex].type);
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
}

$(document).ready(function(){
  $("#user-form").submit(function(evt){
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    let userInput = $("#user-input").val();
    $("#user-form").hide();
    $("h1").hide();

    applicationModule.getData(userInput, displayData);
  });
});
