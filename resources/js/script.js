const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

$('#canvas').hide();
if(window.innerHeight > window.innerWidth) {
	$('#setup').hide();
} else {
	$('#warning').hide();
}

$('#begin').click(() => { 
	$('#container').hide();
	$("#audio")[0].play();

	const fadeToStart = () => { 
		$.when($('#canvas').fadeOut(1000))
		 .done(() => $('#container').show());
	};
	setTimeout(fadeToStart, 135000);

	$('#canvas').show();
});


let circles;
const init = () => {
	circles = makeCircles(new Builder(180)
		.minRadius(5)
		.maxRadius(8)
		.velocity(0.8));
}

const triangles = [{ 
	x1: canvas.width/2, y1: canvas.height/6, 
	x2: canvas.width/1.3, y2: canvas.width/2.5, 
	x3: canvas.width/4, y3: canvas.width/2.5, color: 'rgba(75, 84, 92, 1)' 
}, { 
	x1: canvas.width/4, y1: canvas.height/4, 
	x2: canvas.width/2, y2: canvas.width/2.5, 
	x3: canvas.width/20, y3: canvas.width/2.5, color: 'rgba(111, 119, 130, 1)' 
}, { 
	x1: canvas.width/1.2, y1: canvas.height/3, 
	x2: canvas.width, y2: canvas.width/2.5, 
	x3: canvas.width/1.6, y3: canvas.width/2.5, color: 'rgba(109, 126, 140, 1)' 
}];

const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	triangles.forEach(t => drawTriangle(t));

	drawGround();
	drawSnow();	
}

const drawTriangle = (triangle) => {
	ctx.beginPath();
	ctx.moveTo(triangle.x1, triangle.y1);
	ctx.lineTo(triangle.x2, triangle.y2);
	ctx.lineTo(triangle.x3, triangle.y3);
	ctx.closePath();
	ctx.strokeStyle = triangle.color;
	ctx.stroke();
	ctx.fillStyle = triangle.color;
	ctx.fill();
}

const drawGround = () => {
	ctx.beginPath();
	ctx.fillStyle = 'rgba(193, 205, 217, 1)';
	ctx.fillRect(-10, canvas.height - 200, canvas.width + 20, 200);
	ctx.stroke();
}

const drawSnow = () => circles.forEach(circle => circle.update());

let idx = 0;
const changeBackground = () => {
	const backgroundColors = [
		'#9fabbd',
		'#6d84a6',
		'#344359',
		'#363a40',
		'#2e3369',
		'#5a609c',
		'#6f8cbf',
		'#90acde',
		'#424f4f',
		'#215369',
		'#4488a6',
		'#4572ad',
		'#5c95e0',
		'#3d77ff',
		'#46b7e3',
		'#b9b2db',
		'#e5e1f5',
		'#2f0942',
		'#6a2b8a',
		'#ba65c2',
		'#5d9ad4'
	];

	let color = backgroundColors[idx++];
	if (idx > backgroundColors.length-1) {
		idx = 0;
	}

	canvas.style.backgroundColor = color;
};

init();
animate();
setInterval(changeBackground, 3000);