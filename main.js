var yes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eighteen"]
var no = ["one", "two", "three", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "eight", "sixteen", "nine", "seventeen", "ten", "eighteen"]
$(document).ready(function() {


  $('.answerBox').on('click', function(e) {
    $(this).find('input').prop("checked", true);
  });


  $("#submit").on("click", function(e) {
    validateForm()

        var str = $("form").serialize();
        console.log(str);


  })




})
var estPropValues = ["75,000", "80,000", "85,000", "90,000", "95,000", "100,000", "105,000", "110,000", "115,000", "120,000", "125,000", "130,000", "135,000", "140,000", "145,000", "150,000", "155,000", "160,000", "165,000", "170,000", "175,000", "180,000", "185,000", "190,000", "195,000", "200,000", "210,000", "220,000", "230,000", "240,000", "250,000", "260,000", "270,000", "280,000", "290,000", "300,000", "310,000", "320,000", "330,000", "340,000", "350,000", "360,000", "370,000", "380,000", "390,000", "400,000", "420,000", "440,000", "460,000", "480,000", "500,000", "520,000", "540,000", "560,000", "580,000", "600,000", "620,000", "640,000", "660,000", "680,000", "700,000", "720,000", "740,000", "760,000", "780,000", "800,000", "820,000", "840,000", "860,000", "880,000", "900,000", "920,000", "940,000", "960,000", "980,000", "1,000,000", "1,000,001"]
var rateArray = ["2.75", "3.00", " 3.25", " 3.50", " 3.75", "4.00", "4.25", "4.50", "4.75", "5.00", "5.25", " 5.50", "5.75", "6.00", "6.25", "6.50", "6.75", "7.00", "7.25", "7.50", "7.75", "8.00"]

function stripedValue(allValues, value, type) {
  var postedValue = allValues[value].replace(/,/g, "");
  $("#" + type).val(postedValue);
}

$(function() {
  $("#slider").slider({
    value: 30,
    max: estPropValues.length - 1,
    range: 'min',
    slide: function(event, ui) {
      stripedValue(estPropValues, ui.value, 'est_property_value')
      if (ui.value === estPropValues.length - 1) {
        $("#est_property_display").val("$" + estPropValues[ui.value - 1] + " +");
      } else {
        $("#est_property_display").val("$" + estPropValues[ui.value] + " -  $" + estPropValues[ui.value + 1]);
      }
    }
  });
  $("#slider2").slider({
    value: 15,
    max: estPropValues.length - 1,
    range: 'min',
    slide: function(event, ui) {
      stripedValue(estPropValues, ui.value, 'mortgage_amount')
      if (ui.value === estPropValues.length - 1) {
        $("#mortgage_amount_display").val("$" + estPropValues[ui.value - 1] + " +");
      } else {
        $("#mortgage_amount_display").val("$" + estPropValues[ui.value] + " -  $" + estPropValues[ui.value + 1]);
      }
    }
  });
  $("#slider3").slider({
    value: 8,
    max: rateArray.length - 1,
    range: 'min',
    slide: function(event, ui) {
      stripedValue(rateArray, ui.value, 'mortgage_rate')
      $("#mortgage_rate_display").val(rateArray[ui.value] + "%");
    }
  });
  $("#slider4").slider({
    value: 13,
    max: estPropValues.length - 1,
    range: 'min',
    slide: function(event, ui) {
      stripedValue(estPropValues, ui.value, 'est_purchase_price')
      if (ui.value === estPropValues.length - 1) {
        $("#est_purchase_price_display").val("$" + estPropValues[ui.value] + " +");
      } else {
        $("#est_purchase_price_display").val("$" + estPropValues[ui.value] + " -  $" + estPropValues[ui.value + 1]);
      }
    }
  });
  $("#est_property_display").val("$" + estPropValues[30] + " - $" + estPropValues[31]);
  stripedValue(estPropValues, 30, 'est_property_value')
  $("#mortgage_amount_display").val("$" + estPropValues[16] + " - $" + estPropValues[17]);
  stripedValue(estPropValues, 16, 'mortgage_amount')
  $("#mortgage_rate_display").val(rateArray[8] + "%");
  stripedValue(rateArray, 8, 'mortgage_rate')
  $("#est_purchase_price_display").val("$" + estPropValues[13] + " - $" + estPropValues[14]);
  stripedValue(estPropValues, 13, 'est_purchase_price')
});
var valid = true;
var lastView
var currentView = 'one'
var width = 10;
var mortgage = true;

function hasMortgage(answer) {
  mortgage = answer;
  next()
}

function runZip(zip) {
  var client = new XMLHttpRequest();
  client.open("GET", 'http://api.zippopotam.us/us/'+zip, true);
  client.onreadystatechange = function() {
    if (client.readyState == 4) {
      let myData = JSON.parse(client.responseText);
      if (Object.keys(myData).length === 0) {
        console.log("Nothing here!");
      } else {
        $('#currentCity').val(myData.places[0]["place name"]).css('display', 'none');
        $('#cityLabel').css('display', 'none');
        $('.cityEntry').css('display', 'none');
        $('#currentState').val(myData.places[0]["state abbreviation"]).css('display', 'none');
        $('#stateLabel').css('display', 'none');
        $('.stateEntry').css('display', 'none');
      }
    };
  };
  client.send();
}

function validateForm() {
  var frame = $('section:visible');

  frame.find('input[type=number]').each(function() {
    var isZip = $(this).val()
    if (isZip !== "" && isZip.length === 5) {
      isVal = ""
      $(this).removeClass("warning")
      valid = true
      if (currentView === 'nine') {
        runZip(isZip)
      }
    } else {
      $(this).addClass("warning")
      $(this).focus()
      valid = false
    }
  })

  frame.find('input[type=text]').each(function() {
    var isFilled = $(this).val()
    if (isFilled.length > 0) {
      isFilled = ""
      valid = true
    } else {
      valid = false
      $(this).addClass("warning");
      $(this).focus()
    }
  })

  frame.find('input[type=email]').each(function() {
    var emailVal = $('input[type=email]').val()
    var atSymbol = emailVal.indexOf("@");
    var dotSymbol = emailVal.lastIndexOf('.');
    if (emailVal < 1 || dotSymbol < atSymbol + 2 || dotSymbol + 2 > emailVal.length) {
      $(this).addClass("warning")
      $(this).focus()
      valid = false;
    } else {
      $(this).removeClass("warning")
      valid = true;
    }
  })
}

function next() {

  var viewPath;
  var myView = currentView
  validateForm();

  if (mortgage === true) {
    viewPath = yes
  } else {
    viewPath = no
  }

  if (valid === true) {
    for (i = 0; i < viewPath.length - 1; i++) {
      if (viewPath[i] === myView) {
        currentView = viewPath[i + 1]
        lastView = myView
      }
    }
    if (currentView !== 'one') {
      document.getElementById("back").style.display = "block";
    }
    if (currentView === 'eighteen') {
      document.getElementById("submit").style.display = "block";
      document.getElementById("next").style.display = "none";
    } else {
      document.getElementById("submit").style.display = "none";
      document.getElementById("next").style.display = "block";
    }
    document.getElementById(lastView).style.display = "none";
    document.getElementById(currentView).style.display = "block";
    var element = document.getElementById("myProgress");
    element.style.width = (width += (100 / viewPath.length)) + '%';
  } else {
    return
  }

}

function back() {
  valid = true
  var viewPath = yes
  var myView = currentView
  if (mortgage === true) {
    viewpath = yes
  } else {
    viewPath = no
  }

  for (i = 0; i < viewPath.length; i++) {
    if (viewPath[i] === myView) {
      currentView = viewPath[i - 1]
      lastView = viewPath[i]
    }
  }

  if (currentView === 'one') {
    document.getElementById("back").style.display = "none";
  }
  if (currentView === 'eighteen') {
    document.getElementById("submit").style.display = "block";
    document.getElementById("next").style.display = "none";
  } else {
    document.getElementById("submit").style.display = "none";
    document.getElementById("next").style.display = "block";
  }
  document.getElementById(lastView).style.display = "none";
  document.getElementById(currentView).style.display = "block";
  if (width > 10) {
    var element = document.getElementById("myProgress");
    element.style.width = (width -= (viewPath.length - 2)) + '%';
  }
}
