var charmander = {
	name : "Charmander",
	health : 100,
	lvl : 12,
	effect : null,
	moves : [ {
		name : "Ember",
		type : "Attack",
		power : 50,
		accuracy : .80
	}, {
		name : "Scratch",
		type : "Attack",
		power : 10,
		accuracy : .90
	}, {
		name : "Leer",
		type : "Defense",
		power : .20,
		accuracy : 1.0
	}, {
		name : "Growl",
		type : "Defense",
		power : .65,
		accuracy : .65
	} ]
};

var pikachu = {
	name : "Pikachu",
	health : 100,
	lvl : 9,
	effect : null,
	moves : [ {
		name : "Thunder Shock",
		type : "Attack",
		power : 70,
		accuracy : .90
	}, {
		name : "Thunder Wave",
		type : "Attack",
		power : 70,
		accuracy : .90
	}, {
		name : "Tail Whip",
		type : "Defense",
		power : .15,
		accuracy : 1.0
	}, {
		name : "Growl",
		type : "Defense",
		power : .55,
		accuracy : .55
	} ]
};

var score = 0;
var gameTime = 0;

var currentState;
var cpuPokemon;
var userPokemon;

var cpuTurn = {
	play : function() {
		var randomMove = Math.floor(Math.random() * 4);
		var currentCPUMove = cpuPokemon.moves[randomMove];

		var setUpCPUField = function() {
			$("#chat-text").text("What will " + cpuPokemon.name + " do?");
			prepareToAttack();
		};

		var prepareToAttack = function() {
			$("#pikachu-img").animate({
				top : "-=25",
			}, 200, function() {
				$("#pikachu-img").animate({
					top : "+=25",
				}, 200)
			});
			getAccuracy();
		};

		var getAccuracy = function() {
			var setAccuracy = Math.random();
			if (setAccuracy <= currentCPUMove.accuracy) {
				$("#chat-text").text(
						cpuPokemon.name + " used " + currentCPUMove.name + "!");
				getMoveType();
			} else {
				$("#chat-text").text(
						cpuPokemon.name + " missed with " + currentCPUMove.name
								+ "!");
				currentState = playerTurn;
				setTimeout(loop, 1500);
			}
		};

		var getMoveType = function() {
			showMoveAnimation();

			if (currentCPUMove.type == "Attack") {
				setTimeout(attackingMove, 1500);
			} else {
				setTimeout(defensiveMove, 1500);
			}
		};

		var showMoveAnimation = function() {
			$("#attack-img").addClass("cpu-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100)
					.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		var attackingMove = function() {
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("cpu-attack-img");
			if (!cpuPokemon.effect) {
				userPokemon.health -= currentCPUMove.power
			} else {
				userPokemon.health -= (currentCPUMove.power)
						- (currentCPUMove.power * cpuPokemon.effect);
				cpuPokemon.effect = null;
			}
			$("#user-health-bar").css("width", userPokemon.health + "%");
			currentState = playerTurn;
			loop();
		};

		var defensiveMove = function() {
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("cpu-attack-img");
			userPokemon.effect = currentCPUMove.power;
			currentState = playerTurn;
			loop();
		};

		setUpCPUField();
	}
};

var playerTurn = {
	play : function() {
		var currentUserMove;

		var setUpUserField = function() {
			var moveButtons = [ "#move1-text", "#move2-text", "#move3-text",
					"#move4-text" ];

			$("#user-buttons").removeClass("hide");
			$("#chat-text").text("What will " + userPokemon.name + " do?");

			for (var i = moveButtons.length - 1; i >= 0; i--) {
				$(moveButtons[i]).text(userPokemon.moves[i].name);
			}
			;

		};

		var prepareToAttack = function() {
			$("#user-buttons").addClass("hide");

			$("#charmander-img").animate({
				top : "-=25",
			}, 200, function() {
				$("#charmander-img").animate({
					top : "+=25",
				}, 200)
			});
			getAccuracy();
		};

		var getAccuracy = function() {
			var setAccuracy = Math.random();

			if (setAccuracy <= currentUserMove.accuracy) {
				$("#chat-text").text(
						userPokemon.name + " used " + currentUserMove.name
								+ "!");
				getMoveType();
			} else {
				$("#chat-text").text(
						userPokemon.name + " missed with "
								+ currentUserMove.name + "!");
				currentState = cpuTurn;
				setTimeout(loop, 1500);
			}
		};

		var getMoveType = function() {
			showMoveAnimation();

			if (currentUserMove.type == "Attack") {
				setTimeout(attackingMove, 1500);
			} else {
				setTimeout(defensiveMove, 1500);
			}
		};

		var showMoveAnimation = function() {
			$("#attack-img").addClass("user-attack-img");
			$("#attack-img").removeClass("hide");
			$("#attack-img").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100)
					.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
		};

		var attackingMove = function() {
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("user-attack-img");
			if (!userPokemon.effect) {
				cpuPokemon.health -= currentUserMove.power
			} else {
				cpuPokemon.health -= (currentUserMove.power)
						- (currentUserMove.power * userPokemon.effect);
				userPokemon.effect = null;
			}
			$("#cpu-health-bar").css("width", cpuPokemon.health + "%");
			currentState = cpuTurn;
			loop();
		};

		var defensiveMove = function() {
			$("#attack-img").addClass("hide");
			$("#attack-img").removeClass("user-attack-img");
			cpuPokemon.effect = currentUserMove.power;
			currentState = cpuTurn;
			loop();
		};

		$("#move1-button, #move2-button, #move3-button, #move4-button")
				.unbind().click(function() {
					var move = $(this).attr("value");
					currentUserMove = userPokemon.moves[move];
					prepareToAttack();
				});

		setUpUserField();
	}
};

var loop = function() {
	// if (cpuPokemon.health <= 0 || userPokemon.health <= 0) {
	if (cpuPokemon.health <= 0) {

		score += 5;

		
		console.log("Your score is " + score);
		init();

	} else if (userPokemon.health <= 0) {
		startPause();
		$("#game-over").removeClass("hide");
		$("#your-score").removeClass("hide").text("Your Score is " + score);
		
		var person = prompt("Please enter your initials");
		createScore({name: person, score: score, time: time});
		$("#topscores").removeClass("hide");
        getScore(printScores);
	    
		console.log("Your score is " + score);
		console.log(time);
		gameTime += time;
	}

	else {
		currentState.play();
	}
};

var init = function() {
	if(!time) {
		startPause();
	}		
	cpuPokemon = pikachu;
	userPokemon = charmander;
	if (cpuPokemon.health <= 0) {
		cpuPokemon.health = 100;
		$("#cpu-health-bar").css("width", cpuPokemon.health + "%");
	}
	console.log(cpuPokemon.health);
	$("#cpu-name").text(cpuPokemon.name);
	$("#cpu-lvl").text("lvl " + cpuPokemon.lvl);
	$("#user-name").text(userPokemon.name);
	$("#user-lvl").text("lvl " + userPokemon.lvl);
	currentState = playerTurn;
	loop();
};

init();

function createScore(score) {
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", "rest/putScore");

	xhr.setRequestHeader("Content-Type", "application/json");
	
	xhr.onreadystatechange = function() {
		console.log(xhr.status);
	}
	xhr.send(score);
}

function getScore(func) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "rest/getScores");
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status < 400) {
			console.log(xhr.responseText);
	        func(JSON.parse(xhr.responseText));
	        
	    }
	}
		xhr.send(null);
}

function printScores(response) {
	var scoreList = []; 
	
	for (var i = 0; i < response.length; i++) {
		scoreList.push(response[i].score);
		
		
	}
	$("#topscores").html("Top scores " + "<br>" + (scoreList[0]) + "<br>" + (scoreList[1]) + "<br>" + (scoreList[2]) + "<br>" + (scoreList[3]) + "<br>" + (scoreList[4]));
	console.log(scoreList);
	
}



