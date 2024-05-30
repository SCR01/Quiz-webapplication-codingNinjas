const questionJSON = [
  {
    category: 'Food & Drink',
    correctAnswer: 'Three',
    answers: ['Two', 'Three', 'Four', 'Five'],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?"
  },
  {
    category: 'Science',
    correctAnswer: 'Water',
    answers: ['Water', 'Fire', 'Air', 'Earth'],
    question: "What is H2O commonly known as?"
  },
  {
    category: 'Geography',
    correctAnswer: 'Nile',
    answers: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    question: "Which is the longest river in the world?"
  },
  {
    category: 'History',
    correctAnswer: '1066',
    answers: ['1066', '1215', '1492', '1776'],
    question: "In which year was the Battle of Hastings fought?"
  },
  {
    category: 'Literature',
    correctAnswer: 'Shakespeare',
    answers: ['Shakespeare', 'Hemingway', 'Dickens', 'Tolkien'],
    question: "Who wrote 'Romeo and Juliet'?"
  }
];

let score = 0;
let currentQuestion = 0;
const totalScore = questionJSON.length;

const queElm = document.getElementById('question'); 
const optionElm = document.getElementById('options');
const scoreElm = document.getElementById('score');
const nextElm = document.getElementById('next');
const prevElm = document.getElementById('previous');

document.addEventListener("DOMContentLoaded", function() {
  showQuestion();
});

nextElm.addEventListener("click", () => {
  scoreElm.textContent = `SCORE: ${score}/${totalScore}`;
  nextQuestion();
});

prevElm.addEventListener("click", () => {
  previousQuestion();
});

function showQuestion() {
  const { correctAnswer, answers, question } = questionJSON[currentQuestion];
  queElm.textContent = question;

  // Clear previous options
  optionElm.innerHTML = '';

  const shuffledOptions = shuffleOptions(answers);

  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    optionElm.appendChild(btn);

    btn.addEventListener("click", () => {
      if (opt === correctAnswer) {
        score += 1;
      } else {
        score -= 1;
      }
      scoreElm.textContent = `SCORE: ${score}/${totalScore}`;
    });
  });

  // Hide the "Previous" button if on the first question, otherwise show it
  if (currentQuestion === 0) {
    prevElm.style.display = 'none';
  } else {
    prevElm.style.display = 'inline-block';
  }
}

function nextQuestion() {
  currentQuestion += 1;
  if (currentQuestion >= questionJSON.length) {
    optionElm.innerHTML = "";
    queElm.textContent = "Quiz Completed";
    nextElm.remove();
    prevElm.remove();
  } else {
    showQuestion();
  }
}

function previousQuestion() {
  currentQuestion -= 1;
  if (currentQuestion < 0) {
    currentQuestion = 0;
  } else {
    showQuestion();
  }
}

function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

