// WebApp URL: https://script.google.com/macros/s/AKfycbwZKg-bWoZs_OgVkRUmvxxfrdQeSTWbk3lANkRDUPik-zAvLWfieRkhCgFrU415LYYg/exec?actionRequest=getQualquerExercicioAleatorio

const feedbackWrapper = document.getElementById("feedbackWrapper");

function displayFeedback(fb) {
  const feedbackText = document.getElementById("feedbackText");
  
  function correct(feedbackText) {
    feedbackText.innerHTML = "Parabéns, você acertou!";
    document.getElementById("btnNext").style = "display: block;"
    feedbackWrapper.style = "background-color: #DFF2BF;"
  }

  if (Array.isArray(fb)) {
    if (fb.length > 0) {
      feedbackText.innerHTML = fb[0];
      feedbackWrapper.style = "background-color: #ffefef;"
    } else {
      correct(feedbackText);
    }
  } else if (fb.hasOwnProperty("feedback")) {
    if (fb.success) {
      correct(feedbackText);
    } else {
      feedbackText.innerHTML = fb.feedback;
      feedbackWrapper.style = "background-color: #ffefef;"
    }
  } else {
    if (fb.success) {
      correct(feedbackText);
    }
  }
}

function getRandEx() {
  return fetch("https://script.google.com/macros/s/AKfycbwZKg-bWoZs_OgVkRUmvxxfrdQeSTWbk3lANkRDUPik-zAvLWfieRkhCgFrU415LYYg/exec?actionRequest=getQualquerExercicioAleatorio",
    {
      method: "GET",
    }
  ).then(response => {
    return response.json();
  });
}

function setNewRandEx(res) {
  randEx = res.randExercise;

  console.log("alo")
  // Set enunciado
  document.getElementById("exerciseTitleText").innerHTML = randEx.enunciado;
  feedbackWrapper.style = "background-color: rgb(248, 249, 250);"
  document.getElementById("feedbackText").innerHTML = 'Esperando verificação do exercício.';
  // Set user level

  // $("#btnSubmit").show();

  // btnDisable("#btnTestYourself");
  // btnDisable("#btnNext");
  // $("#btnTestYourself").hide();
  // $("#btnNext").hide();

  parson = new ParsonsWidget({
    'sortableId': 'sortable',
    'trashId': 'sortableTrash',
    'max_wrong_lines': randEx.max_wrong_lines,
    'lang': 'ptbr',
    'initcode': isNullString(randEx.initcode),
    'toggleTypeHandlers': isNullString(randEx.toggleTypeHandlers),
    'unittests': isNullString(randEx.unittests),
    'vartests': isNullString(randEx.vartests)
  });
  parson.init(randEx.exercicio);
  parson.shuffleLines();

  // btnEnable("#btnChangeExercise", "#ffb86c");
  // btnEnable("#btnSubmit", "#dbfa50");
  // $("#btnReset").prop('disabled', false);

  if (randEx.trinketHTML != "null") {
    hasTrinket = true;
    // TO DO: Find another way to popup trinket content
    // $(".popup-content").append('<div class="added">' + randEx.trinketHTML + '</div>');
  } else {
    hasTrinket = false;
  }
}



document.addEventListener('DOMContentLoaded', async event => {
  const btnNext = document.getElementById("btnNext");
  const btnSubmit = document.getElementById("btnSubmit");
  const btnChangeExercise = document.getElementById("btnChangeExercise");

  var res = await getRandEx();

  setNewRandEx(res);

  // Buttons event handlers
  btnSubmit.onclick = (event) => {
    event.preventDefault();

    var fb = parson.getFeedback();
    console.log(fb)
    displayFeedback(fb);
  }

  btnNext.onclick = async (event) => {
    event.preventDefault();

    // Button rage click prevention
    disableButton(btnChangeExercise);
    //

    disableButton(btnNext);
    btnNext.innerHTML = "Carregando...";

    res = await getRandEx();
    setNewRandEx(res);

    hideButton(btnNext);
    btnNext.innerHTML = "Próximo";
    enableButton(btnNext);

    // Button rage click prevention
    enableButton(btnChangeExercise);
    //
  }
  

  btnChangeExercise.onclick = async (event) => {
    event.preventDefault();

    // Button rage click prevention
    hideButton(btnNext);
    btnNext.innerHTML = "Próximo";
    enableButton(btnNext);
    //

    disableButton(btnChangeExercise);
    btnChangeExercise.innerHTML = "Carregando...";
  
    res = await getRandEx();
    setNewRandEx(res);
    
    btnChangeExercise.innerHTML = "Trocar";
    enableButton(btnChangeExercise);
  }
});

function disableButton(btn) {
  btn.disabled = true;
  btn.style.cursor = "wait"
}

function enableButton(btn) {
  btn.disabled = false;
  btn.style.cursor = "pointer"
}

function showButton(btn) {
  btn.style = "display: block";
}

function hideButton(btn) {
  btn.style = "display: none";
}