
let ApplicationModule = require('./../js/doctor.js').applicationModule;

let applicationModule = new ApplicationModule();
let displayData = function(response){
  let index = 0;
  let data = response.data;
  console.log(data);
  console.log(response.meta.count);
  if(response.meta.count === 0){
    $('#find-doctor').show();
    $('.user-form').show();
    $('#no-match').modal();
  }else {
    for(let index in data){
      let image = data[index].profile.image_url;
      let firstName = data[index].profile.first_name;
      let lastName = data[index].profile.last_name;
      let title = data[index].profile.title;
      let street;
      let city;
      let state;
      let zip;
      let phoneIndex = 0;
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
          let numberType = phoneData[phoneIndex].type;
          if(numberType === "landline"){
            phoneNumber = applicationModule.getDashed(phoneData[phoneIndex].number);
          } else {
            phoneNumber = "unavailable";
          }
          phoneIndex++;
        }
      }

      $('#results').append(`<div class="well">
                              <div class="row">
                                <div class="col-md-2 col-center">
                                  <img src="${image}" alt="no photo available">
                                </div>
                                <div class="col-md-5 col-center">
                                  <h4>${firstName} ${lastName}, ${title}</h4>
                                  <br><p>${street} <br> ${city}, ${state},  <br> ${zip}</p>
                                </div>
                                <div class="col-md-5 col-center">
                                  <p><br>${phoneNumber}<br><br>Accepts new patients: ${accepts}<br>${website}</p>
                                </div>
                              </div>`);
      index++;
    }
  }
};

$(document).ready(function(){
  $("#results").hide();
  $("#errors").hide();
  $("#no-match").hide();
  $("form").submit(function(evt){
    evt.preventDefault();
    let userInput = $("#user-input").val();
    $("h1").hide();
    $(".user-form").hide();
    $("#results").show();
    applicationModule.getData(userInput, displayData);
    $("#user-input").val("");
  });
});
