// X91: Sign Up page main scripts 

window.onload = () => {
  document.body.style.opacity = "1";
  document.getElementById('registrationFormBlock').style.transform =  "rotateX(0deg)";
}

//1. Check user input
function checkRegistration(errMsg) {
  const userInput = [document.getElementById('signUpFirstName'),    
                     document.getElementById('signUpLastName'), 
                     document.getElementById('signUpUserName'), 
                     document.getElementById('signUpPass'),
                     document.getElementById('signUpPassConfirm'),
                     document.getElementById('signUpEmail')];
  let userSelect = document.getElementById('selectJobTitle');
  let regBlock = document.getElementById('registrationFormBlock');
  if(checkEmptyInput(userInput, errMsg, userSelect)) {
    transferData(userInput, userSelect, errMsg, regBlock);
  }
  
}

//1.1Check empty fields 
function checkEmptyInput(allFields, error, selectField) {
  //Checking input fields by keyboard
  for(let i = 0; i < allFields.length; i++) {
    if(allFields[i].value == "") {
      if(allFields[i].id == "signUpFirstName") {
        showErrorMsg(error, ERR_MSG_TXT_EMPTY_FNAME);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
      else if(allFields[i].id == "signUpLastName") {
        showErrorMsg(error, ERR_MSG_TXT_EMPTY_LNAME);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
      else if(allFields[i].id == "signUpUserName") {
        showErrorMsg(error, ERR_MSG_TXT_ID_EMPTY);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
      else if((allFields[i].id == "signUpPass") || (allFields[i].id == "signUpPassConfirm")) {
        showErrorMsg(error, ERR_MSG_TXT_PASS_EMPTY);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
      else if(allFields[i].id == "signUpEmail") {
        showErrorMsg(error, ERR_MSG_TXT_EMAIL_EMPTY);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
    }
  }
  //Checking Select 
  if(selectField.value == "jobTitle") {
    showErrorMsg(error, ERR_MSG_TXT_EMPTY_JOBTITLE);
    selectField.style.background = "#fbcbcb";
    return false;
  }

  //Checking for length
  for(let i = 0; i < allFields.length; i++) {   
    if(allFields[i].value.length > 20) {
      //for password 
      if((i == 3) || (i == 4)) {
        showErrorMsg(error, ERR_MSG_PASS_LENGTH);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
      if(allFields[i].value.length > 30) {
        showErrorMsg(error, ERR_MSG_TEXT_LENGTH_ALL);
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
    }
  }
  
  //Checking for special characters
  for(let i = 0; i < allFields.length; i++) {   
    if(((/^[A-Za-z0-9.]+$/).test(allFields[i].value)) == false) {
      // skip password check
      if((i == 3) || (i == 4) || (i ==5)) {
        continue;
      }
      //for id
      showErrorMsg(error, ERR_MSG_TXT_CHARS);
      allFields[i].style.background = "#fbcbcb";
      return false;
    }
    //for first name and last name
    if((allFields[i].id == "signUpFirstName") || (allFields[i].id == "signUpLastName")) {
      if(((/^[A-Za-z]+$/).test(allFields[i].value)) == false) {
        if(allFields[i].id == "signUpFirstName") {
          showErrorMsg(error, ERR_MSG_TXT_FIRSTNAME);
        }
        else if(allFields[i].id == "signUpLastName") {
          showErrorMsg(error, ERR_MSG_TXT_LASTNAME);
        }
        allFields[i].style.background = "#fbcbcb";
        return false;
      }
    }
  }

  //check password matches
  if(allFields[3].value != allFields[4].value) {
    showErrorMsg(error, ERR_MSG_TXT_MATCH_PASS);
    allFields[4].style.background = "#fbcbcb";
    return false; 
  }

  //check email (HTK company)
  if(!(allFields[5].value.includes("@hyundai.kz"))) {
    showErrorMsg(error, ERR_MSG_TXT_WORK_EMAIL);
    allFields[5].style.background = "#fbcbcb";
    return false;
  }
  return true;
}

//2. Transfer data to server & db
function transferData(dataInput, dataSelect, error, currentBlock) {
  // Synchronization:
  synchro(error);
  $.ajax({
    data : {userFname: dataInput[0].value, 
            userLname: dataInput[1].value,
            userIdent: dataInput[2].value,
            userPass: dataInput[3].value,
            userMail: dataInput[5].value,
            userSelect: dataSelect.value},
    type : 'POST',
    url : '/userregistration'
    })
    .done(function(data) {
      if(data == 'OK') {
        error.style.color = "green";
        error.textContent = SUCCESS_MSG_MAIN;   
        currentBlock.style.transform = "rotateY(90deg)";
        setTimeout(() => {
document.getElementById("returnFormBlock").style.transform = "rotateY(0deg)";
        }, "1500")
      }
      else if(data == 'NOK'){
        error.style.color = "red";
        error.textContent = ERR_SMG_DB_CONN_ERR;
      }
      else {
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}


//3. Clear error message field
function clearErrorMsg(errMsg, input) {
  errMsg.style.visibility = "hidden";
  input.style.background = "white";
}


//4. Display text to error messages
function showErrorMsg(errMsg, text) {
  errMsg.style.color = "red";
  errMsg.textContent = text;
  errMsg.style.visibility = "visible";
}

//4. Display text to synchroniation
function synchro(err) {
  err.style.color = "orange";
  err.textContent = SYNCHRO_MAIN;
  err.style.visibility = "visible";
}

//5. Return for login page after registration
function returnToLogin() {
   document.getElementById("returnFormBlock").style.transform = "rotateX(90deg)";
  setTimeout(() => {
    window.location.href = '/';
    }, "1500")
}