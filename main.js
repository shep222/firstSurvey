var vetStatus = true;
var width = 10;


function selected(answer) {
  vetStatus = answer;
  next()
}


function next(){
   console.log(vetStatus);
   var element = document.getElementById("myProgress");
   element.style.width = (width += 10) + '%';
}
