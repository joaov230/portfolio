function checkIfSolutionIsCorrect(fb) {
  if (Array.isArray(fb)) {
      if (fb.length > 0) {
          return false;
      } else {
          return true;
      }
  } else if (fb.hasOwnProperty("feedback")) {
      if (fb.success) {
          return true;
      } else {
          return false;
      }
  } else {
      if (fb.success) {
          return true;
      }
  }
}

function isNullString(value) {
  if (value == "null") {
    return;
  } else {
    return value;
  }
}

// TO DO: Change color later
function btnEnable(btnName, color="#ffb86c") {
  $(btnName).prop('disabled', false);
  // $(btnName).css('background-color', color);
  // $(btnName).css('cursor', 'pointer');
}

function btnDisable(btnName) {
  $(btnName).prop('disabled', true);
  // $(btnName).css('background-color', '#a5a5a5');
  // $(btnName).css('cursor', 'wait');
}