let numeratorSlider, denominatorSlider, numeratorValue, denominatorValue, simplifiedNumeratorValue, simplifiedDenominatorValue, simplifiedWholeValue, simplifiedFraction, canvas, context;
const numeratorMax = 40;
const denominatorMax = 40;


function load() {
	numeratorSlider = document.getElementById('numerator-slider');
	denominatorSlider = document.getElementById('denominator-slider');
	numeratorValue = document.getElementById('numerator-value');
	denominatorValue = document.getElementById('denominator-value');
	simplifiedNumeratorValue = document.getElementById('simplified-numerator-value');
	simplifiedDenominatorValue = document.getElementById('simplified-denominator-value');
	simplifiedWholeValue = document.getElementById('simplified-whole-value');
	simplifiedFraction = document.getElementById('simplified-fraction');
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	canvas.width = innerWidth;
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
	canvas.width = canvas.width; // to clear canvas

	const numerator = numeratorSlider.value;
	const denominator = denominatorSlider.value;
	numeratorValue.innerHTML = numerator;
	denominatorValue.innerHTML = denominator;

	const wholeValue = Math.floor(numerator / denominator);
	simplifiedWholeValue.innerHTML = wholeValue > 0 ? wholeValue : '&nbsp;';
	if (numerator % denominator > 0) {
		let maxFactor = 1;
		for (let i = 2; i <= denominator / 2; i++) {
			if (denominator % i == 0 && numerator % i == 0) {
				maxFactor = i;
			}
		}
		simplifiedNumeratorValue.innerHTML = (numerator % denominator) / maxFactor;
		simplifiedDenominatorValue.innerHTML = denominator / maxFactor;
		simplifiedFraction.style.visibility = '';
	} else {
		simplifiedFraction.style.visibility = 'hidden';
	}

	const radius = 120 / (Math.sqrt(Math.ceil(numerator / denominator)));
	const center = {
		x: radius + innerWidth / 2 - (wholeValue * radius * 1.25),
		y: radius + 20
	};
	// console.log(center.x);
	for (let j = 0; j < numerator / denominator; j++) {
		const isLast = j == wholeValue;
		context.fillStyle = '#00f';
		context.beginPath();
		context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		context.fill();

		if (isLast) {
			context.fillStyle = '#aaf';
			context.beginPath();
			context.moveTo(center.x, center.y);
			context.arc(center.x, center.y, radius * 0.9, 0, 2 * Math.PI * (1 - numerator % denominator / denominator));
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
		center.x += radius * 2.5;
	}
}
