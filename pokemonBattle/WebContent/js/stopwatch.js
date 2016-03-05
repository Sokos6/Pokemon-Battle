var time = 0;
var running = 0;

function startPause() {
	if (running == 0) {
		running = 1;
		increment();
	} else {
		running = 0;

	}
	console.log("start counting");
}

function reset() {
	running = 0;

}

function increment() {
	if (running == 1) {
		setTimeout(function() {
			time++;
			increment();
		}, 1000)
	}
	console.log(time);
}