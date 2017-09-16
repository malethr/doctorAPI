
let apiKey = require('./../.env').apiKey;
let ApplicationModule = function() {

};

ApplicationModule.prototype.getData = function(userInput,displayData){
  $.ajax({
    url: `https://api.betterdoctor.com/2016-03-01/doctors?query=${userInput}&location=or-portland&skip=0&limit=50&user_key=${apiKey}`,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      displayData(response);

    },
    error: function() {
      console.log("failure");
      $('#find-doctor').show();
      $('.user-form').show();
      $("#navbar").hide();
      $('#errors').modal();
    }
  });
};

ApplicationModule.prototype.getDashed = function(phone){
  phone = phone.slice(0,3)+"-"+phone.slice(3,6)+"-"+phone.slice(6);
  return phone;
};

exports.applicationModule = ApplicationModule;
