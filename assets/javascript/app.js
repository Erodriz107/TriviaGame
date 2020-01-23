let card = $("#quiz-area");

let questions = [
  {
    question: "You're 3rd place right now in a race. What place are you in when you pass the person in 2nd place?",
    answers: ["1st", "2nd.", "3rd", "None of the above"],
    correctAnswer: "1st"
  },
  {
    question: "How many months have 28 days?",
    answers: ["2", "1", "All of them", "Depends if there's a leap year or not."],
    correctAnswer: "All of them"
  },
  {
    question: "How many 0.5cm slices of bread can you cut from a whole bread that's 25cm long? ",
    answers: ["1", "25", "39", "None of the above"],
    correctAnswer: "1"
  },
  {
    question: "Divide 30 by half and add ten, what's the answer?",
    answers: ["40.5", "50", "70", "I know this is a trick question, so NONE. Ha!"],
    correctAnswer: "70"
  },
  {
    question: "There are two clocks of different colors: The red clock is broken and doesn't run at all, but the blue clock loses one second every 24 hours. Which clock is more accurate?",
    answers: ["The red clock", "The blue clock", "Neither", "Both"],
    correctAnswer: "The red clock"
  },
  {
    question:
      "A farmer has 17 sheep, all of them but 8 die. How many sheep are still standing?",
    answers: ["8", "9", "25", "35"],
    correctAnswer: "8"
  },
  {
    question: "If a leaf falls to the ground in a forest and no one hears it, does it make a sound?",
    answers: ["Yes", "No", "Depends on how heavy the leaf was", "Depends on where it landed"],
    correctAnswer: "Yes"
  },
  {
    question: "There are 45 apples in your basket. You take three apples out of the basket. How many apples are left?",
    answers: ["3", "42", "45", "I do not eat apple!"],
    correctAnswer: "45"
  }
];

let timer;

let game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (let i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (let j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    let inputs = card.children("input:checked");
    for (let i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>Final Score!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};


$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
