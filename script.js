/* QUIZ DATA */

const questions = [
  {
    type: "single",
    category: "Football",
    difficulty: "Easy",

    question: "Which country won the 2022 FIFA World Cup?",

    options: ["Argentina", "France", "Brazil", "Germany"],

    answer: ["Argentina"],
  },

  {
    type: "single",
    category: "Basketball",
    difficulty: "Easy",

    question: "How many points is a three-point field goal worth?",

    options: ["1 point", "2 points", "3 points", "4 points"],

    answer: ["3 points"],
  },

  {
    type: "multi",
    category: "Tennis",
    difficulty: "Medium",

    question: "Which of these are Grand Slam tennis tournaments?",

    options: ["Wimbledon", "US Open", "French Open", "Dubai Open"],

    answer: ["Wimbledon", "US Open", "French Open"],
  },

  {
    type: "single",
    category: "Cricket",
    difficulty: "Easy",

    question: "How many balls are there in a standard cricket over?",

    options: ["4", "5", "6", "8"],

    answer: ["6"],
  },

  {
    type: "fill",
    category: "Olympics",
    difficulty: "Easy",

    question: "How many rings are there in the Olympic symbol?",

    answer: ["5", "five"],
  },

  {
    type: "single",
    category: "Ice Hockey",
    difficulty: "Easy",

    question: "Which sport uses a puck?",

    options: ["Ice Hockey", "Tennis", "Baseball", "Volleyball"],

    answer: ["Ice Hockey"],
  },

  {
    type: "multi",
    category: "Olympics",
    difficulty: "Medium",

    question: "Which of these are Olympic sports?",

    options: ["Swimming", "Athletics", "Gymnastics", "Car Racing"],

    answer: ["Swimming", "Athletics", "Gymnastics"],
  },

  {
    type: "single",
    category: "Football",
    difficulty: "Easy",

    question:
      "How many players are on the field for one football team during normal play?",

    options: ["9", "10", "11", "12"],

    answer: ["11"],
  },

  {
    type: "fill",
    category: "Cricket",
    difficulty: "Medium",

    question:
      "Which country is famous for cricket and has won multiple Cricket World Cups?",

    answer: ["India"],
  },

  {
    type: "single",
    category: "Athletics",
    difficulty: "Medium",

    question:
      "Which athlete is famous for winning eight Olympic gold medals in sprinting?",

    options: ["Usain Bolt", "Carl Lewis", "Mo Farah", "Michael Johnson"],

    answer: ["Usain Bolt"],
  },
];


let currentQuestion = 0;

let score = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let userAnswers = [];

let timeLeft = 300;

let timerInterval;


const startScreen = document.getElementById("startScreen");

const quizScreen = document.getElementById("quizScreen");

const resultScreen = document.getElementById("resultScreen");

const questionText = document.getElementById("questionText");

const answerArea = document.getElementById("answerArea");

const currentQuestionElement = document.getElementById("currentQuestion");

const totalQuestionsElement = document.getElementById("totalQuestions");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const timerElement = document.getElementById("timer");

const liveScore = document.getElementById("liveScore");

const correctCount = document.getElementById("correctCount");

const wrongCount = document.getElementById("wrongCount");

const categoryElement = document.getElementById("category");

const difficultyElement = document.getElementById("difficulty");

const instruction = document.getElementById("instruction");

const previousBtn = document.getElementById("previousBtn");

const nextBtn = document.getElementById("nextBtn");


function startQuiz() {
  currentQuestion = 0;

  score = 0;

  correctAnswers = 0;

  wrongAnswers = 0;

  userAnswers = [];

  timeLeft = 300;

  startScreen.classList.add("d-none");

  resultScreen.classList.add("d-none");

  quizScreen.classList.remove("d-none");

  totalQuestionsElement.textContent = questions.length;

  liveScore.textContent = "0";

  correctCount.textContent = "0";

  wrongCount.textContent = "0";

  startTimer();

  loadQuestion();
}


function loadQuestion() {
  const question = questions[currentQuestion];

  /* Counter */

  currentQuestionElement.textContent = String(currentQuestion + 1).padStart(
    2,
    "0",
  );

  /* Question */

  questionText.textContent = question.question;

  /* Category */

  categoryElement.textContent = question.category;

  /* Difficulty */

  difficultyElement.textContent = question.difficulty;

  /* Instruction */

  if (question.type === "single") {
    instruction.textContent = "Select one answer";
  } else if (question.type === "multi") {
    instruction.textContent = "Select all correct answers";
  } else {
    instruction.textContent = "Type your answer below";
  }

  /* Progress */

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;

  progressText.textContent = `${Math.round(progress)}% completed`;

  /* Clear answers */

  answerArea.innerHTML = "";

  /* Generate UI */

  if (question.type === "single") {
    createSingleOptions(question);
  } else if (question.type === "multi") {
    createMultiOptions(question);
  } else {
    createFillInput(question);
  }

  /* Previous */

  previousBtn.disabled = currentQuestion === 0;

  /* Next */

  if (currentQuestion === questions.length - 1) {
    nextBtn.innerHTML = `Finish Quiz <i class="bi bi-trophy"></i>`;
  } else {
    nextBtn.innerHTML = `Next Question <i class="bi bi-arrow-right"></i>`;
  }

  restoreAnswer();
}

/* =========================================
   SINGLE SELECT
========================================= */

function createSingleOptions(question) {
  question.options.forEach((option, index) => {
    const label = document.createElement("label");

    label.className = "answer-option";

    label.innerHTML = `

                <input
                    type="radio"
                    name="quizAnswer"
                    value="${option}"
                >

                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="answer-text">
                    ${option}
                </span>

            `;

    answerArea.appendChild(label);

    const input = label.querySelector("input");

    input.addEventListener("change", () => {
      document
        .querySelectorAll(".answer-option")
        .forEach((item) => item.classList.remove("selected"));

      label.classList.add("selected");

      saveCurrentAnswer();
    });
  });
}

/* =========================================
   MULTI SELECT
========================================= */

function createMultiOptions(question) {
  question.options.forEach((option, index) => {
    const label = document.createElement("label");

    label.className = "answer-option";

    label.innerHTML = `

                <input
                    type="checkbox"
                    name="quizAnswer"
                    value="${option}"
                >

                <span class="answer-letter">
                    ${String.fromCharCode(65 + index)}
                </span>

                <span class="answer-text">
                    ${option}
                </span>

            `;

    answerArea.appendChild(label);

    const input = label.querySelector("input");

    input.addEventListener("change", () => {
      label.classList.toggle("selected", input.checked);

      saveCurrentAnswer();
    });
  });
}

/* =========================================
   FILL IN BLANK
========================================= */

function createFillInput() {
  const input = document.createElement("input");

  input.type = "text";

  input.id = "fillAnswer";

  input.className = "fill-input";

  input.placeholder = "Type your answer here...";

  answerArea.appendChild(input);

  input.addEventListener("input", saveCurrentAnswer);
}

/* =========================================
   SAVE ANSWER
========================================= */

function saveCurrentAnswer() {
  const question = questions[currentQuestion];

  if (question.type === "single") {
    const selected = document.querySelector('input[name="quizAnswer"]:checked');

    userAnswers[currentQuestion] = selected ? [selected.value] : [];
  } else if (question.type === "multi") {
    const selected = [
      ...document.querySelectorAll('input[name="quizAnswer"]:checked'),
    ].map((input) => input.value);

    userAnswers[currentQuestion] = selected;
  } else {
    const input = document.getElementById("fillAnswer");

    userAnswers[currentQuestion] = input ? [input.value.trim()] : [];
  }
}

/* =========================================
   RESTORE ANSWER
========================================= */

function restoreAnswer() {
  const saved = userAnswers[currentQuestion];

  if (!saved) return;

  if (
    questions[currentQuestion].type === "single" ||
    questions[currentQuestion].type === "multi"
  ) {
    document.querySelectorAll('input[name="quizAnswer"]').forEach((input) => {
      if (saved.includes(input.value)) {
        input.checked = true;

        input.closest(".answer-option").classList.add("selected");
      }
    });
  }

  if (questions[currentQuestion].type === "fill") {
    const input = document.getElementById("fillAnswer");

    if (input) {
      input.value = saved[0] || "";
    }
  }
}

/* =========================================
   CHECK ANSWER
========================================= */

function checkAnswer(question, answer) {
  if (!answer || answer.length === 0) {
    return false;
  }

  /* Multi Select */

  if (question.type === "multi") {
    if (answer.length !== question.answer.length) {
      return false;
    }

    return question.answer.every((correct) => answer.includes(correct));
  }

  /* Fill */

  if (question.type === "fill") {
    const userAnswer = answer[0].toLowerCase().trim();

    return question.answer.some(
      (correct) => userAnswer === correct.toLowerCase(),
    );
  }

  /* Single */

  return answer[0] === question.answer[0];
}

/* =========================================
   UPDATE STATS
========================================= */

function updateStats() {
  let correct = 0;

  questions.forEach((question, index) => {
    if (checkAnswer(question, userAnswers[index])) {
      correct++;
    }
  });

  const answered = userAnswers.filter(
    (answer) => answer && answer.length > 0,
  ).length;

  correctAnswers = correct;

  wrongAnswers = answered - correct;

  if (wrongAnswers < 0) {
    wrongAnswers = 0;
  }

  score = correctAnswers * 10;

  liveScore.textContent = score;

  correctCount.textContent = correctAnswers;

  wrongCount.textContent = wrongAnswers;
}

/* =========================================
   NEXT
========================================= */

function nextQuestion() {
  saveCurrentAnswer();

  updateStats();

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;

    loadQuestion();
  } else {
    finishQuiz();
  }
}

/* =========================================
   PREVIOUS
========================================= */

function previousQuestion() {
  if (currentQuestion <= 0) {
    return;
  }

  saveCurrentAnswer();

  currentQuestion--;

  loadQuestion();

  updateStats();
}

/* =========================================
   TIMER
========================================= */

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;

    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      finishQuiz();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (timeLeft <= 30) {
    timerElement.style.color = "#ff5570";
  }
}

/* =========================================
   FINISH
========================================= */

function finishQuiz() {
  clearInterval(timerInterval);

  saveCurrentAnswer();

  updateStats();

  showResult();
}

/* =========================================
   RESULT
========================================= */

function showResult() {
  quizScreen.classList.add("d-none");

  resultScreen.classList.remove("d-none");

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  document.getElementById("finalScore").textContent = score;

  document.getElementById("finalCorrect").textContent = correctAnswers;

  document.getElementById("finalWrong").textContent =
    questions.length - correctAnswers;

  document.getElementById("percentage").textContent = `${percentage}%`;

  const title = document.getElementById("resultTitle");

  const message = document.getElementById("resultMessage");

  if (percentage === 100) {
    title.textContent = "Perfect Score!";

    message.textContent =
      "Absolutely incredible! You're a true sports champion.";
  } else if (percentage >= 80) {
    title.textContent = "Excellent Work!";

    message.textContent = "Your sports knowledge is seriously impressive.";
  } else if (percentage >= 60) {
    title.textContent = "Good Job!";

    message.textContent =
      "You're on the right track. Keep improving your score.";
  } else {
    title.textContent = "Nice Try!";

    message.textContent =
      "Practice makes perfect. Give the challenge another shot.";
  }
}

/* =========================================
   RESTART
========================================= */

function restartQuiz() {
  clearInterval(timerInterval);

  currentQuestion = 0;

  score = 0;

  correctAnswers = 0;

  wrongAnswers = 0;

  userAnswers = [];

  timeLeft = 300;

  resultScreen.classList.add("d-none");

  startScreen.classList.remove("d-none");

  timerElement.style.color = "var(--primary)";
}
