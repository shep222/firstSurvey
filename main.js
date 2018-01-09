
var currentView = 'one'

var vetStatus = true;
var mortgage =  true;
var homeType = "Single Family";
var width = 10;


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


function next(){
   console.log(vetStatus + " " + mortgage + " " + homeType);

   var element = document.getElementById("myProgress");
   element.style.width = (width += 10) + '%';
}

function back(){
   var element = document.getElementById("myProgress");
   element.style.width = (width -= 10) + '%';
}
