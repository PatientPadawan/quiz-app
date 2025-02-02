'use strict';

let questionNumber = 0;
let score = 0;

// generate question form
function generateQuestionForm () {
    if (questionNumber < STORE.length) {
        return `<div>
        <form>
        <legend>${STORE[questionNumber].question}</legend>
        <fieldset>
        <div class="labelContainer">
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required checked>
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
        </div>
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
    $('.js-CorrectHidden').css('display', 'flex');
}

// display incorrect feedback
function userAnswerIncorrect () {
    userIncorrectFeedback ();
    $('.js-IncorrectHidden').css('display', 'flex');
}

// user feedback correct
function userCorrectFeedback () {
    $('.quizForm').html(`<div><p><h3>Correct!</h3></p><button type=button class="nextButton">Next</button></div>`);
}


// user feedback incorrect
function userIncorrectFeedback () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div><h3>Incorrect, the right answer is <span class="correctAnswer"><u>${correctAnswer}</u></span>.</h3><button type=button class="nextButton">Next</button></div>`);
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
        $('.js-CorrectHidden').css('display', 'none');
        $('.js-IncorrectHidden').css('display', 'none');
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

// quiz restart
function quizRestart () {
    $('main').on('click', '.restartButton', function (e) {
        questionNumber = 0;
        $('.questionNumber').text(questionNumber+1);
        score = 0;
        $('.js-score').text(score);
        renderQuestion ();
        userSubmit ();
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