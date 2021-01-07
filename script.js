let questionblock = document.getElementById("question");
let answerblock = document.getElementById("answer");
let random = 0;
let questionsjson;

fetch("questions.json")
  .then((response) => response.json())
  .then((json) => {
    questionsjson = json;
    const length = Object.keys(questionsjson).length;
    //console.log(questionsjson);
    console.log("TOTAL NUMBER OF QUESTIONS: ", length);

    //call first question
    random = getRandomQuestion(random, length);
    showQuestion(length, random);
  });

function showQuestionOnTimeout(length, random, previousqtime) {
  // get q number
  random = getRandomQuestion(random, length);
  console.log("DELAY BEFORE NEXT QUESTION: ", previousqtime);

  // show q on timeout specified in json file
  if (questionsjson.hasOwnProperty(random)) {
    let quizq = window.setTimeout(showQuestion, previousqtime, length, random);
  }
}

function showQuestion(length, random) {
  answerblock.innerHTML = "";

  if (questionsjson.hasOwnProperty(random)) {
    let question = questionsjson[random];
    let qdelay = parseInt(question.t) + 5000;
    let adelay = question.t;
    console.log("RANDOM NEXT QUESTION: ", random);
    console.log(question);
    console.log("DELAY BEFORE ANSWER: ", adelay);

    questionblock.innerHTML = "Q: " + question.q;

    var answer = setTimeout(() => {
      answerblock.innerHTML = "A: " + question.a;
    }, adelay);

    showQuestionOnTimeout(length, random, qdelay);
  }
}

function getRandomQuestion(lastrandom, length) {
  let random;
  do {
    random = Math.floor(Math.random() * length);
  } while (lastrandom == random);
  return random;
}
