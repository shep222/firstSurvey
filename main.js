$(function() {
  $("#slider").slider({
    value: 160000,
    min: 75000,
    max: 1000000,
    step: 5000,
    slide: function(event, ui) {
      $("#homeValue").val("$" + ui.value);
    }
  });
  $("#slider2").slider({
    value: 120000,
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
    value: 160000,
    min: 75000,
    max: 1000000,
    step: 5000,
    slide: function(event, ui) {
      $("#est_purchase_price").val("$" + ui.value);
    }
  });

  $("#homeValue").val("$" + $("#slider").slider("value"));
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
  vetStatus = answer;
  next()
}

function hasMortgage(answer) {
  mortgage = answer;
  next()
}

function homeTypes(answer) {
  homeType = answer;
  next()
}


function next() {
  var element = document.getElementById("myProgress");
  element.style.width = (width += 10) + '%';

  if (currentView === 'one') {
    lastView = 'one'
    currentView = 'two'
  } else if (currentView === 'two') {
    lastView = 'two'
    currentView = 'three'
  }

  document.getElementById("back").style.display = "block";
  document.getElementById(lastView).style.display = "none";
  document.getElementById(currentView).style.display = "block";
}

function back() {
  if (currentView === 'three') {
    currentView = 'two'
    lastView = 'three'
  } else if (currentView === 'two') {
    currentView = 'one'
    lastView = 'two'
  }
  if (currentView === 'one') {
    document.getElementById("back").style.display = "none";
  }
  document.getElementById(lastView).style.display = "none";
  document.getElementById(currentView).style.display = "block";

  if (width > 10) {
    var element = document.getElementById("myProgress");
    element.style.width = (width -= 10) + '%';
  }
}
