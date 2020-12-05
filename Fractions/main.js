let numeratorSlider, denominatorSlider, numeratorValue, denominatorValue;
const numeratorMax = 60;
const denominatorMax = 20;


function load() {
	numeratorSlider = document.getElementById('numerator-slider');
	denominatorSlider = document.getElementById('denominator-slider');
	numeratorValue = document.getElementById('numerator-value');
	denominatorValue = document.getElementById('denominator-value');

	numeratorSlider.min = 1;
	numeratorSlider.max = numeratorMax;
	denominatorSlider.min = 1;
	denominatorSlider.max = denominatorMax;
	numeratorSlider.value = numeratorValue.innerHTML = 1;
	denominatorSlider.value = denominatorValue.innerHTML = 4;

	document.getElementById('numerator-max-value').innerHTML = numeratorMax;
	document.getElementById('denominator-max-value').innerHTML = denominatorMax;
}

function update() {
	numeratorValue.innerHTML = numeratorSlider.value;
	denominatorValue.innerHTML = denominatorSlider.value;
}
