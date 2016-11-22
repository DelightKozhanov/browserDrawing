var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var save = context.getImageData(0,0,canvas.width,canvas.height);

var radius = 10;

var drawstyle = false;

var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = 2*radius;

	var putPoint = function(e){
	if(dragging){
	context.lineTo(e.clientX,e.clientY);
	context.stroke();
	context.beginPath();

	context.arc(e.clientX, e.clientY,radius, 0, Math.PI*2);
	//context.arc(window.innerWidth - e.clientX , e.clientY,radius, 0, Math.PI*2);

	context.fill();
	context.beginPath();
	context.moveTo(e.clientX,e.clientY);
	}

}
	if(drawstyle == false){
	canvas.addEventListener('mousemove', putPoint);
	}
	else if (drawstyle == true) {
	canvas.addEventListener('mousedown', putPoint);
	}


	canvas.addEventListener('mousedown', function(e){
		dragging = true;
		putPoint(e);
	});

	canvas.addEventListener('mouseup', function(){
		dragging = false;
		if(drawstyle == false){
		context.beginPath();
	}
		
	});




var interval = 1;
var minRad = 1;
var maxRad = 100;
var defaultRad = 10;

var radSpan = document.getElementById('radval');
var decRad = document.getElementById('dec');
var incRad = document.getElementById('inc');

var decRad1 = document.getElementById('dec1');
var incRad1 = document.getElementById('inc1');

decRad.addEventListener('click', function() {
	setRadius(radius-interval);
});


incRad.addEventListener('click', function() {
	setRadius(radius+interval);
});

decRad1.addEventListener('click', function() {
	setRadius(radius-5);
});


incRad1.addEventListener('click', function() {
	setRadius(radius+5);
});

var setRadius = function(newRadius){

	if(newRadius < minRad){
	 newRadius = minRad;
	}
	else if(newRadius > maxRad){
	newRadius = maxRad;
	}

	radius = newRadius; 
	context.lineWidth = radius*2;
	radSpan.innerHTML = radius;
}


var swatches = document.getElementsByClassName('swatch');

for (var i = 0, n = swatches.length; i < n; i++) {
	swatches[i].addEventListener('click', setSwatch);
}



function setColor(color){

	context.fillStyle = color;
	context.strokeStyle = color;

	var active = document.getElementsByClassName('active')[0];

	if(active){
		active.className = 'swatch';
	}
}

function setSwatch(e){
	var swatch = e.target;

	setColor(swatch.style.backgroundColor);

	swatch.className += ' active';
}



var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function(){
		var data = canvas.toDataURL();

	window.open(data,'_blank');
	//(url/name/options)
});

document.onkeydown = function checkKeycode(event)
{
var keycode;
if(!event) var event = window.event;
if (event.keyCode) keycode = event.keyCode; // IE
else if(event.which) keycode = event.which; // all browsers


if(keycode == 8){
	context.putImageData(save,0,0);
}
else if (keycode == 13){
 save = context.getImageData(0,0,canvas.width,canvas.height);
}

}


document.getElementById('resetButton').addEventListener('click',function(){
	location = "";
});

document.getElementById('linedraw').addEventListener('click',function(){
	$('#linedraw').addClass('drawstyleactive');
	$('#normaldraw').removeClass('drawstyleactive');
	drawstyle = true;

});
document.getElementById('normaldraw').addEventListener('click',function(){
	$('#linedraw').removeClass('drawstyleactive');
	$('#normaldraw').addClass('drawstyleactive');
	drawstyle = false;
	context.beginPath();
});