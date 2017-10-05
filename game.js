var basicCard = require('./BasicCard.js');
var clozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require('fs');
var clozeObj = require('./cloze.json');
var basicObj = require('./basic.json');
var color = require('colors');

function createCloze() {
  inquirer.prompt([
    {
      type: 'input',
      message: "\nEnter a trivia question as a factual statement.".bold.red + "\ni.e. George Washington was our first president.".bold.red + "\nThe question will appear as follows: '... was our first president?'".bold.red,
      name: 'question'
    },
    {
      type: 'input',
      message: "\nEnter answer.".bold.red + "\nThe answer must be included in the question you entered.".bold.red + "\ni.e. George Washington".bold.red,
      name: 'answer'
    }
  ]).then(function(response) {
      //write object to cloze.json
      if (response.question.toLowerCase().includes(response.answer.toLowerCase())) {
	      var newCloze = new clozeCard(response.question, response.answer);
	      clozeObj.push(newCloze);

	      fs.writeFile('./cloze.json', JSON.stringify(clozeObj, null, 2), function(err) {
	      	if (err) {
	      	  return console.log(err)
	      	}
	      	console.log('New Cloze Card added!'.bold.blue);
	      })
      } else {
      	console.log('Answer needs to be included in the question'.bold.red);
      	inquirer.prompt([
          {
		      type: 'list',
		      name: 'navigate',
		      message: 'Would you like to try again or go to the main menu?',
		      choices: ['Create Cloze Card', 'Main Menu']
		  }
      	]).then(function(response) {
      		if (response.navigate === 'Create Cloze Card') {
      			createCloze();
      		} else {
      			mainMenu();
      		}
      	})
      }

  });
}

function createBasic() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter a trivia question'.bold.red,
      name: 'question'
    },
    {
      type: 'input',
      message: 'Enter answer'.bold.red,
      name: 'answer'
    }
  ]).then(function(response) {
      //write object to basic.json
      var newBasic = new basicCard(response.question, response.answer);
      basicObj.push(newBasic);

      fs.writeFile('./basic.json', JSON.stringify(basicObj, null, 2), function(err) {
      	if (err) {
      	  return console.log(err)
      	}
      	console.log('New Basic Card added!'.bold.blue);
      })
  });
}

function clozeGame() {
  var randomNumber = Math.floor((Math.random() * clozeObj.length));
  var randomQuestion = clozeObj[randomNumber].partial;
  var answer = clozeObj[randomNumber].cloze;
  
  inquirer.prompt([
    {
      type: 'input',
      message: randomQuestion,
      name: 'answer'
    },
  ]).then(function(response) {
  	if (response.answer.toLowerCase().trim() === answer.toLowerCase().trim()) {
  		console.log('Correct!'.bold.blue)

  		inquirer.prompt([
  		  {
		      type: 'list',
		      name: 'gameOption',
		      message: 'Would you like to play again',
		      choices: ['Play Again', 'Main Menu', 'Exit']
		  }
  		]).then(function(choice) {
  			if (choice.gameOption === 'Play Again') {
  				clozeGame();
  			} else if (choice.gameOption === 'Main Menu') {
  				mainMenu();
  			} else if (choice.gameOption === 'Exit') {
  				return;
  			}
  		});

  	} else {
  		console.log('Sorry that is incorrect'.bold.red);
  		console.log(`The correct answer is ${answer}`.bold.blue);

  		inquirer.prompt([
  		  {
		      type: 'list',
		      name: 'gameOption',
		      message: 'Would you like to play again',
		      choices: ['Play Again', 'Main Menu', 'Exit']
		  }
  		]).then(function(choice) {
  			if (choice.gameOption === 'Play Again') {
  				clozeGame();
  			} else if (choice.gameOption === 'Main Menu') {
  				mainMenu();
  			} else if (choice.gameOption === 'Exit') {
  				return;
  			}
  		});
  	}
  })
}

function basicGame() {
  var randomNumber = Math.floor((Math.random() * basicObj.length));
  var randomQuestion = basicObj[randomNumber].front;
  var answer = basicObj[randomNumber].back;
  
  inquirer.prompt([
    {
      type: 'input',
      message: randomQuestion,
      name: 'answer'
    },
  ]).then(function(response) {
  	if (response.answer.toLowerCase().trim() === answer.toLowerCase().trim()) {
  		console.log('Correct!'.bold.blue);

  		inquirer.prompt([
  		  {
		      type: 'list',
		      name: 'gameOption',
		      message: 'Would you like to play again',
		      choices: ['Play Again', 'Main Menu', 'Exit']
		  }
  		]).then(function(choice) {
  			if (choice.gameOption === 'Play Again') {
  				basicGame();
  			} else if (choice.gameOption === 'Main Menu') {
  				mainMenu();
  			} else if (choice.gameOption === 'Exit') {
  				return;
  			}
  		});

  	} else {
  		console.log('Sorry that is incorrect'.bold.red);
  		console.log(`The correct answer is ${answer}`.bold.blue);

  		inquirer.prompt([
  		  {
		      type: 'list',
		      name: 'gameOption',
		      message: 'Would you like to play again',
		      choices: ['Play Again', 'Main Menu', 'Exit']
		  }
  		]).then(function(choice) {
  			if (choice.gameOption === 'Play Again') {
  				basicGame();
  			} else if (choice.gameOption === 'Main Menu') {
  				mainMenu();
  			} else if (choice.gameOption === 'Exit') {
  				return;
  			}
  		});
  	}
  });
}

function playGame() {

  // choose between basic or cloze questions
  inquirer.prompt([
    {
      type: 'list',
      name: 'cardOptions',
      message: 'What type of questions would you like to answer?',
      choices: ['Basic Questions', 'Cloze Questions']
    }
  ]).then(function(response) {
      if (response.cardOptions === 'Basic Questions') {
      	console.log('inside basic game')
        basicGame();
      } else {
        clozeGame();
      }
  });
  // logic to check for right or wrong answer
  // show correct answer
  // move on to next question or ask to play again?
  
}

function mainMenu() {
// prompt - list - create basic, create cloze, play game
	inquirer.prompt([
	  {
	    type: 'list',
	    name: 'options',
	    message: 'What type of card would you like?',
	    choices: ['Play Game', 'Create Basic Card', 'Create Cloze Card', 'Exit']
	  }
	]).then(function(choice) {
		if (choice.options === 'Create Cloze Card') {
			createCloze();
		} else if (choice.options === 'Create Basic Card') {
			createBasic();
		} else if (choice.options === 'Play Game') {
			playGame();
		} else if (choice.options === 'Exit') {
			return;
		}
	});
}

mainMenu();

