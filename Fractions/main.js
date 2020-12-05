let numeratorSlider, denominatorSlider, numeratorValue, denominatorValue, canvas, context;
const numeratorMax = 40;
const denominatorMax = 20;


function load() {
	numeratorSlider = document.getElementById('numerator-slider');
	denominatorSlider = document.getElementById('denominator-slider');
	numeratorValue = document.getElementById('numerator-value');
	denominatorValue = document.getElementById('denominator-value');
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	numeratorSlider.min = 1;
	numeratorSlider.max = numeratorMax;
	denominatorSlider.min = 1;
	denominatorSlider.max = denominatorMax;
	numeratorSlider.value = numeratorValue.innerHTML = 1;
	denominatorSlider.value = denominatorValue.innerHTML = 4;

	document.getElementById('numerator-max-value').innerHTML = numeratorMax;
	document.getElementById('denominator-max-value').innerHTML = denominatorMax;

	update();
}

function update() {
	const numerator = numeratorSlider.value;
	const denominator = denominatorSlider.value;
	numeratorValue.innerHTML = numerator;
	denominatorValue.innerHTML = denominator;

	canvas.width = canvas.width;
	const radius = 60 / (Math.sqrt(Math.ceil(numerator / denominator)));
	const center = {
		x: 100,
		y: 100
	};
	for (let j = 0; j < numerator / denominator; j++) {
		const isLast = j == Math.floor(numerator / denominator);
		context.fillStyle = isLast ? '#88f' : '#00f';
		context.beginPath();
		context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		context.fill();

		console.log(j, isLast);
		if (isLast) {
			context.fillStyle = '#00f';
			context.beginPath();
			context.moveTo(center.x, center.y);
			context.arc(center.x, center.y, radius, 0, (numerator % denominator) * 2 * Math.PI / denominator);
			context.lineTo(center.x, center.y);
			context.fill();
		}

		if (denominator > 1) {
			context.lineWidth = 2;
			context.strokeStyle = '#0f0';
			for (let i = 0; i < denominator; i++) {
				const angle = i * 2 * Math.PI / denominator;
				const x = center.x + radius * Math.cos(angle);
				const y = center.y + radius * Math.sin(angle);
				context.beginPath();
				context.moveTo(center.x, center.y);
				context.lineTo(x, y);
				context.stroke();
			}
		}
		center.x += radius * 3;
	}
}
