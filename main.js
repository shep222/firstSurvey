var yes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eighteen"]
var no = ["one", "two", "three", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "eight", "sixteen", "nine", "seventeen", "ten", "eighteen"]
var slider_values = [85000, 90000, 95000, 100000, 105000, 110000, 115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000, 155000, 160000, 165000, 170000, 175000, 180000, 185000, 190000, 195000, 200000, 210000, 220000, 230000, 240000, 250000, 260000, 270000, 280000, 290000, 300000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 380000, 390000, 400000, 420000, 440000, 460000, 480000, 500000, 520000, 540000, 560000, 580000, 600000, 620000, 640000, 660000, 680000, 700000, 720000, 740000, 760000, 780000, 800000, 820000, 840000, 860000, 880000, 900000, 920000, 940000, 960000, 980000, 1000000, 1500000, 2000000]
$(document).ready(function(){
  var myData = data;
  console.log(myData.Purchase.loan_purpose);
})

// don't even need the load function
// load();

//This could have worked fine...
//See data.js

$(function() {
  $("#slider").slider({
    value: 250000,
    min: 75000,
    max: 1000000,
    step: 5000,
    slide: function(event, ui) {
      $("#est_property_value").val("$" + ui.value);
    }
  });
  $("#slider2").slider({
    value: 155000,
    min: 75000,
    max: 1000000,
    step: 5000,
    slide: function(event, ui) {
      $("#mortgage_amount").val("$" + ui.value);
    }
  });
  $("#slider3").slider({
    value: 4.5,
    min: 2.75,
    max: 8,
    step: .25,
    slide: function(event, ui) {
      $("#mortgage_rate").val(ui.value + "%");
    }
  });
  $("#slider4").slider({
    value: 140000,
    min: 75000,
    max: 1000000,
    step: 5000,
    slide: function(event, ui) {
      $("#est_purchase_price").val("$" + ui.value);
    }
  });

  $("#est_property_value").val("$" + $("#slider").slider("value"));
  $("#mortgage_amount").val("$" + $("#slider2").slider("value"));
  $("#mortgage_rate").val("$" + $("#slider3").slider("value"));
  $("#est_purchase_price").val("$" + $("#slider4").slider("value"));
});


var lastView
var currentView = 'one'
var width = 10;


var vetStatus = true;
var mortgage = true;
var homeType = "Single Family";


function isVet(answer) {
  console.log(answer);
  vetStatus = answer;
  next()
}

function hasMortgage(answer) {
  mortgage = answer;
  if (answer === true) {
    myData.Purchase.loan_purpose = "Refi"
  } else {
    myData.Purchase.loan_purpose = "Purchase"
  }
  next()
}


function next() {

  var viewPath = yes
  var myView = currentView
  var element = document.getElementById("myProgress");
  element.style.width = (width += 10) + '%';
  if (mortgage === true) {
    viewpath = yes
  } else {
    viewPath = no
  }
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
}

function back() {
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
    element.style.width = (width -= 10) + '%';
  }
}
