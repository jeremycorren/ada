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
$('#begin').click(() => { 
	$('#container').hide();
	$("#audio")[0].play();
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

init();
animate();