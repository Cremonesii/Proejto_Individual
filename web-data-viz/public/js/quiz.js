// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: 'Quantos títulos do campeonato brasileiro o corinthians tem?',
    answers: [
      {
        answer: '7',
        correct: true,
      },
      {
        answer: '5',
        correct: false,
      },
      {
        answer: '6',
        correct: false,
      },
      {
        answer: '8',
        correct: false,
      },
    ],
  },
  {
    question: 'Quantos jogos o ex-goleiro Cássio tem pelo corinthians?',
    answers: [
      {
        answer: '710',
        correct: false,
      },
      {
        answer: '712',
        correct: true,
      },
      {
        answer: '716',
        correct: false,
      },
      {
        answer: '709',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual desses não jogou pelo corinthians?',
    answers: [
      {
        answer: 'Ronaldinho Gaúcho',
        correct: true,
      },
      {
        answer: 'Ronaldo Fenômeno',
        correct: false,
      },
      {
        answer: 'Marcelinho Carioca',
        correct: false,
      },
      {
        answer: 'Paulinho',
        correct: false,
      },
    ],
  },
  {
    question: 'Nessa Ordem de times, quem é o jogador? <br> CRUZEIRO -> PSV -> BARCELONA -> INTERNAZIONALE -> REAL MADRID -> MILAN -> CORINTHIANS',
    answers: [
      {
        answer: 'Everton Ribeiro',
        correct: false,
      },
      {
        answer: 'Ronaldo Fenômeno',
        correct: true,
      },
      {
        answer: 'Paulinho',
        correct: false,
      },
      {
        answer: 'Felipe Anderson',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual a Data de Criação do Sport Clube Corinthians Paulista?',
    answers: [
      {
        answer: '1910',
        correct: true,
      },
      {
        answer: '1902',
        correct: false,
      },
      {
        answer: '1900',
        correct: false,
      },
      {
        answer: '1912',
        correct: false,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  // Total de Qustões
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        //O que ele acertou
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

//Grafico quizz
function respota_quiz(){

  var certo = points;
  var errado = actualQuestion - points;

  fetch("/usuarios/respota_quiz",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      respostaCorretaServer: certo,
      respostaIncorretaServer: errado,
      idUsuarioServer: sessionStorage.ID_USUARIO,
    }),
  })

}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  //zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// inicialização do quizz
init();
