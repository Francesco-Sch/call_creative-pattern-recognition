const s = (sketch) => {
	let gridSize = 20;
	let squareSize = 50;
	let stepSize = 20; // Number of steps to change darkness

	sketch.setup = () => {
		let canvasWidth = document.getElementById("p5-wrapper").offsetWidth;
		let canvasHeight = document.getElementById("p5-wrapper").offsetHeight;

		sketch.createCanvas(canvasWidth, canvasHeight);
		sketch.colorMode(sketch.HSB);
		sketch.noStroke();
	};

	sketch.draw = () => {
		sketch.background(281, 70, 85);

		// Calculate the position of the center of the largest square based on mouse position
		let centerX = sketch.mouseX;
		let centerY = sketch.mouseY;

		// Draw the rest of the grid with smaller and darker squares
		for (let x = 0; x < sketch.windowWidth + 1; x += gridSize / 1.15) {
			for (let y = 0; y < sketch.windowHeight + 1; y += gridSize) {
				let distance = sketch.dist(centerX, centerY, x, y);

				// Calculate darkness based on the step size
				let darknessStep = sketch.map(
					gridSize,
					0,
					sketch.windowWidth,
					stepSize,
					1
				);
				let darkness = sketch.map(distance % gridSize, 0, gridSize, 255, 50);
				darkness = sketch.floor(darkness / darknessStep) * darknessStep;

				let squareSize = sketch.map(
					distance,
					0,
					sketch.windowWidth,
					gridSize * 2,
					gridSize
				);
				let hueColor = sketch.map(distance, 0, sketch.windowWidth, 70, 50);

				sketch.fill(hueColor, 20, darkness);
				drawSquare(x, y, squareSize / 2);
			}
		}
	};

	function drawSquare(x, y, size) {
		sketch.rectMode(sketch.CENTER);
		sketch.rect(x, y, size, size, 4);
	}

	sketch.windowResized = () => {
		sketch.setup();
	};
};

let gradient = new p5(s, "p5-wrapper");
