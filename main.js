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
  if(currentView === 'one'){
    document.getElementById("back").style.display = "none";
  }
  document.getElementById(lastView).style.display = "none";
  document.getElementById(currentView).style.display = "block";

  if (width > 10) {
    var element = document.getElementById("myProgress");
    element.style.width = (width -= 10) + '%';
  }
}
