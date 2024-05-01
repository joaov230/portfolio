// WebApp URL: https://script.google.com/macros/s/AKfycbwZKg-bWoZs_OgVkRUmvxxfrdQeSTWbk3lANkRDUPik-zAvLWfieRkhCgFrU415LYYg/exec?actionRequest=getQualquerExercicioAleatorio

function displayFeedback(fb) {
  function correct() {
    $("#feedbackText").html("Parabéns, você acertou!");
    getRandEx();
  }

  if (Array.isArray(fb)) {
    if (fb.length > 0) {
      $("#feedbackText").html(fb[0]);
    } else {
      correct();
    }
  } else if (fb.hasOwnProperty("feedback")) {
    if (fb.success) {
      correct();
    } else {
      $("#feedbackText").html(fb.feedback);
    }
  } else {
    if (fb.success) {
      correct();
    }
  }
}

function getRandEx(userData) {
  return fetch("https://script.google.com/macros/s/AKfycbwZKg-bWoZs_OgVkRUmvxxfrdQeSTWbk3lANkRDUPik-zAvLWfieRkhCgFrU415LYYg/exec?actionRequest=getQualquerExercicioAleatorio",
    {
      method: "GET",
    }
  ).then(response => {
    return response.json();
  });
}

function setNovoExercicio(res) {
  randEx = res.randExercise;

  // Set enunciado
  $(".added").remove();
  $("#feedbackText").html(" ");
  $("#exerciseTitleText").append('<div class="added">' + randEx.enunciado + '</div>');
  // Set user level

  $("#btnSubmit").show();

  btnDisable("#btnTestYourself");
  btnDisable("#btnNext");
  $("#btnTestYourself").hide();
  $("#btnNext").hide();

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

  btnEnable("#btnChangeExercise", "#ffb86c");
  btnEnable("#btnSubmit", "#dbfa50");
  $("#btnReset").prop('disabled', false);

  if (randEx.trinketHTML != "null") {
    hasTrinket = true;
    $(".popup-content").append('<div class="added">' + randEx.trinketHTML + '</div>');
  } else {
    hasTrinket = false;
  }
}


document.addEventListener('DOMContentLoaded', event => {

  
});