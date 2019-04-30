'use strict';

let questionNumber = 0;
let score = 0;

// generate question form
function generateQuestionForm () {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;       
    } else {
        renderResults (); 
        quizRestart ();
        $('.questionNumber').text(10)
    }
}

// increment question number
function incrementQuestionNumber () {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
    }

// increment score
function incrementScore () {
    score ++;
}

// start quiz
function startQuiz () {
    $('.quizStart').on('click', '.startButton', function (e) {
        $('.quizStart').remove();
        $('.quizForm').css('display', 'block');
        $('.questionNumber').text(1);
});
}

// render question
function renderQuestion () {
    $('.quizForm').html(generateQuestionForm());
}

// user submit / feedback
function userSubmit () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        let userChoice = $('input:checked');
        let userAnswer = userChoice.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (userAnswer === correctAnswer) {
            userAnswerCorrect();
        } else {
            userAnswerIncorrect();
        }
    });
}

// display correct feedback update and score
function userAnswerCorrect () {
    userCorrectFeedback();
    updateScore();
}

// display incorrect feedback
function userAnswerIncorrect () {
    userIncorrectFeedback ();
}

// user feedback correct
function userCorrectFeedback () {
    $('.quizForm').html(`<div><p><b>Correct!</b></p><button type=button class="nextButton">Next</button></div>`);
}


// user feedback incorrect
function userIncorrectFeedback () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div><p>Incorrect, the right answer is <span>${correctAnswer}</span></p><button type=button class="nextButton">Next</button></div>`);
}

// update score / score text
function updateScore () {
    incrementScore ();
    $('.js-score').text(score);
}

// next button
function renderNext () {
    $('main').on('click', '.nextButton', function (e) {
        incrementQuestionNumber ();
        renderQuestion ();
        userSubmit ();
    });
}

// quiz over page
function renderResults () {
    if (score > 6) {
        $('.quizForm').html(`<div><h3>C's get degrees!</h3><p><You scored ${score} / 10</p><p>Anything above a 6 passes. Congratulations!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else {
        $('.quizForm').html(`<div><h3>Oh no!</h3><p><You scored ${score} / 10</p><p>Anything below a 7 fails. Keep trying!</p><button class="restartButton">Restart Quiz</button></div>`);
    }
}

// quiz restart by reload
function quizRestart () {
    $('main').on('click', '.restartButton', function (e) {
        location.reload();
    });
}

// quiz function handler
function quizOrigin () {
    startQuiz ();
    renderQuestion ();
    userSubmit ();
    renderNext ();
}

// event listener for page load
$(quizOrigin);