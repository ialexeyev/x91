// X91: Forgot password page main scripts

window.onload = () => {
  document.body.style.opacity = "1";
  document.getElementById('forgotPassBlock').style.transform =  "rotateX(0deg)";
}


//1. CHECKING EMAIL
function checkMail() {
  let userMail = document.getElementById('fMail').value;
  let errMessage = document.getElementById('mailErrMess');
  let loginBlock = document.getElementById('forgotPassBlock');
  let verifyBlock = document.getElementById('verifyEmailBlock');
  if(checkMailInput(userMail, errMessage)) {
    checkMailDb(userMail, errMessage, loginBlock, verifyBlock);
  }
  userMail.value = "";
}

//1.1 checking user input
function checkMailInput(email, error) {
  if(email == "") {
    showErrorMsg(error, ERR_MSG_TXT_EMAIL_EMPTY);
    return false;
  }
  else if(email.length > 30) {
    showErrorMsg(error, ERR_MSG_TEXT_LENGTH_ALL);
    return false;
  }
    /*
  else if(htkEmailValidation(email) == false) {
    showErrorMsg(error, ERR_MSG_TXT_WORK_EMAIL);
    return false;
  }
  */
  else {
    synchro(error);
    return true;
  }
}

//1.1.1 HTK validation email function
function htkEmailValidation(htkemail) {
  if(htkemail.includes("@hyundai.kz")) {
    return true;
  }
  else {return false;}
}

//2. CHECK EMAIL IN DB 
function checkMailDb(email, error, block, newblock) {
  $.ajax({
    data : {userMail : email},
    type : 'POST',
    url : '/verifymailprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        error.style.color = "green";
        error.textContent = SUCCESS_MSG_MAIN;
        //Display verification code form
        block.style.transform = "rotateX(90deg)";
        setTimeout(() => {
          newblock.style.transform = "rotateX(0deg)";
        }, "1500");
      }
      else if(data == 'NOK'){
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_WRONG_MAIL;
      }
      else {
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}


//3. CHECK VERIFICATION CODE
function checkCode() {
  let userCode = document.getElementById('fCode').value;
  let errMessage = document.getElementById('codeErrMess');
  let loginBlock = document.getElementById('verifyEmailBlock');
  if(checkCodeInput(userCode, errMessage)) {
    verifyCodeInput(userCode, errMessage, loginBlock);
  }
}

//3.1 Check code input 
function checkCodeInput(code, error) {
  if(code == "") {
    showErrorMsg(error, ERR_MSG_TXT_CODE_EMPTY);
    return false;
  }
  else if(code.length > 5) {
    showErrorMsg(error, ERR_MSG_TXT_CODE_INCORRECT);
    return false;
  }
  else if(((/^[0-9]+$/).test(code)) == false) {
    showErrorMsg(error, ERR_MSG_TXT_CODE_INCORRECT);
    return false;
  }
  else {
    synchro(error);
    return true;
  }
}

//3.2 Verify code with DB
function verifyCodeInput(code, error, block) {
  $.ajax({
    data : {vcode : code},
    type : 'POST',
    url : '/verifycodeprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        error.style.color = "green";
        error.textContent = SUCCESS_MSG_MAIN;
        //Display verification code form
        block.style.transform = "rotateX(90deg)";
        setTimeout(() => {
          document.getElementById("newPassBlock").style.transform = "rotateX(0deg)";
        }, "1500");
      }
      else if(data == 'NOK'){
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_CODE_INCORRECT;
      }
      else {
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}

//4. Checking new user password
function checkNewPass() {
  let userInput = [
    document.getElementById('npUserId'),
    document.getElementById('npNewPass'),
    document.getElementById('confirmPass')
  ];
  let errMessage = document.getElementById('newPassErrMess');
  let loginBlock = document.getElementById('newPassBlock');
  let returnHomeBlock = document.getElementById('returnHomeBlock');
  if(checkNewPassInput(userInput, errMessage)) {
    changepass(userInput, errMessage, loginBlock, returnHomeBlock);
  }
}

//4.1 Checking new password input
function checkNewPassInput(input, error) {
  for(let i = 0; i < input.length; i++) {
    //For empty fields:
    if(input[i].value == "") {
      if(input[i].id == "npUserId") {
        showErrorMsg(error, ERR_MSG_TXT_ID_EMPTY);
        input[i].style.background = "#fbcbcb";
        return false;
      }
      else if((input[i].id = "npNewPass") || (input[i].id == "confirmPass")) {
        showErrorMsg(error, ERR_MSG_TXT_PASS_EMPTY);
        input[i].style.background = "#fbcbcb";
        return false;
      }
    }
    //For checking length:
    if(input[i].value.length > 20) {
      //for password 
      if((i == 1) || (i == 2)) {
        showErrorMsg(error, ERR_MSG_PASS_LENGTH);
        input[i].style.background = "#fbcbcb";
        return false;
      }
      if(input[i].value.length > 30) {
        showErrorMsg(error, ERR_MSG_TEXT_LENGTH_ALL);
        input[i].style.background = "#fbcbcb";
        return false;
      }
    }
    //For checking characters:
    if(((/^[A-Za-z0-9.]+$/).test(input[i].value)) == false) {
      // skip password check
      if((i == 1) || (i == 2)) {
        continue;
      }
      //for id
      showErrorMsg(error, ERR_MSG_TXT_CHARS);
      input[i].style.background = "#fbcbcb";
      return false;
    }
    //For password matches:
    if(input[1].value != input[2].value) {
      showErrorMsg(error, ERR_MSG_TXT_MATCH_PASS);
      input[2].style.background = "#fbcbcb";
      return false; 
    }
  }
  synchro(error);
  return true;
}

//4.2 Changing password: synchronization with db
function changepass(input, error, block, returnBlock) {
  $.ajax({
    data : {username : input[0].value, changingpass: input[1].value},
    type : 'POST',
    url : '/changingpasswprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        error.style.color = "green";
        error.textContent = SUCCESS_MSG_MAIN;
        //Display verification code form
        block.style.transform = "rotateY(90deg)";
        setTimeout(() => {
          document.getElementById('returnHomeHeader').textContent = 'Your password has been changed!';
          returnBlock.style.transform = "rotateY(0deg)";
        }, "1500");
      }
      else if(data == 'NOK'){
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_CHANGING_PASS;
      }
      else if(data = 'IDERROR') {
        error.style.color = "red";
        error.textContent = ERR_MGS_TXT_IDERROR;
      }
      else {
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}

//5. Clear error message field
function clearErrorMsg(errMsg) {
  errMsg.style.visibility = "hidden";
}
function clearErrorMsgNP(errMsg, input) {
  errMsg.style.visibility = "hidden";
  input.style.background = "white"; 
} 

//6. Show error message field
function showErrorMsg(errMsg, text) {
  errMsg.style.color = "red";
  errMsg.textContent = text;
  errMsg.style.visibility = "visible";
}

//7. Synchronization function
function synchro(err) {
  err.style.color = "orange";
  err.textContent = SYNCHRO_MAIN;
  err.style.visibility = "visible";
}

//8 Return home function
function returnHome() {
  window.location.href = '/';
}

//9 If user doesnt have email
function dontHasMail(currentBlock, retBlock) {
  currentBlock.style.transform = "rotateY(90deg)";
   document.getElementById('returnHomeHeader').textContent = 'Ask to administrator for changing password!';
  setTimeout(() => {
    retBlock.style.transform = "rotateY(0deg)";
  }, "1500");
}

