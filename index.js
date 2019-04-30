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
        console.log('results in else ran');  
        quizRestart ();
        $('.questionNumber').text(10)
    }

    console.log('generateQuestionForm ran');    
}

// increment question number
function incrementQuestionNumber () {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
    
    console.log('incrementQuestionNumber ran');  
}

// increment score
function incrementScore () {
    score ++;

    console.log('incrementScore ran');  
}

// start quiz
function startQuiz () {
    $('.quizStart').on('click', '.startButton', function (e) {
        $('.quizStart').remove();
        $('.quizForm').css('display', 'block');
        $('.questionNumber').text(1);

        console.log('startQuiz ran');  
});
}

// render question
function renderQuestion () {
    $('.quizForm').html(generateQuestionForm());

    console.log('renderQuestion ran');  
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

    console.log('userSubmit ran');
}

// display correct feedback update and score
function userAnswerCorrect () {
    userCorrectFeedback();
    updateScore();

    console.log('userCorrectAnswer ran');
}

// display incorrect feedback
function userAnswerIncorrect () {
    userIncorrectFeedback ();

    console.log('userIncorrectAnswer ran');
}

// user feedback correct
function userCorrectFeedback () {
    $('.quizForm').html(`<div><p><b>Correct!</b></p><button type=button class="nextButton">Next</button></div>`);

    console.log('userCorrectFeedback ran');
}


// user feedback incorrect
function userIncorrectFeedback () {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div><p>Incorrect, the right answer is <span>${correctAnswer}</span></p><button type=button class="nextButton">Next</button></div>`);

    console.log('userIncorrectFeedback ran');
}

// update score / score text
function updateScore () {
    incrementScore ();
    $('.score').text(score);

    console.log('updateScore ran');
}

// next button
function renderNext () {
    $('main').on('click', '.nextButton', function (e) {
        incrementQuestionNumber ();
        renderQuestion ();
        userSubmit ();
    });

    console.log('renderNext ran');
}

// quiz over page
function renderResults () {
    if (score > 6) {
        $('.quizForm').html(`<div><h3>C's get degrees!</h3><p><You scored ${score} / 10</p><p>Anything above a 6 passes. Congratulations!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else {
        $('.quizForm').html(`<div><h3>Oh no!</h3><p><You scored ${score} / 10</p><p>Anything below a 7 fails. Keep trying!</p><button class="restartButton">Restart Quiz</button></div>`);
    }
    console.log('renderResults ran');
}

// quiz restart by reload
function quizRestart () {
    $('main').on('click', '.restartButton', function (e) {
        location.reload();
    });
    console.log('quiz restart ran');
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