//Login Page main Scripts

//1. WINDOW

window.onload = () => {
  document.body.style.opacity = "1";
  document.getElementById('idFormBlock').style.transform =  "rotateX(0deg)";
}


//2 CHECK USER INPUT

//2.1 Check user ID
function checkId() {
  let userId = document.getElementById('fName').value;
  let errMessage = document.getElementById('idErrMess');
  let loginBlock = document.getElementById('idFormBlock');
  let passBlock = document.getElementById('pwFormBlock');
  let passError = document.getElementById('passErrMess');
  let passInp = document.getElementById('fPass');
  
  if(checkIdInput(userId, errMessage)) {
     checkIdDB(userId, errMessage, loginBlock, passBlock, passError, passInp);
  }
  userId.value = "";
}

//2.2.1 Check user input ID: exceptions
function checkIdInput(id, error) {
  if(id == "") {
    showErrorMsg(error, ERR_MSG_TXT_ID_EMPTY);
    return false;
  }
  else if(id.length > 30) {
    showErrorMsg(error, ERR_MSG_TXT_LENGTH);
    return false;
  }
  else if(((/^[A-Za-z0-9.]+$/).test(id)) == false) {
    showErrorMsg(error, ERR_MSG_TXT_CHARS);
    return false;
  }
  else {
    synchro(error);
    return true;
  }
}

//2.2.2 Check id on db
function checkIdDB(username, errMsg, logBlock, passBlock, passErr, passInput) {
  $.ajax({
    data : {userId : username },
    type : 'POST',
    url : '/loginidprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        errMsg.style.color = "green";
        errMsg.textContent = SUCCESS_MSG_MAIN;   
        //Display password form
        logBlock.style.transform = "rotateY(90deg)";
        setTimeout(() => {
          passBlock.style.transform = "rotateY(0deg)";
          errMsg.style.visibility = "hidden";
          passErr.style.visibility = "hidden";
          passInput.value = "";
        }, "1500");
      }
      else if(data == 'NOK'){
        errMsg.style.color = "red";
        errMsg.textContent = ERR_MSG_TXT_NO_USER;
      }
      else {
        errMsg.style.color = "red";
        errMsg.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}

//2.2.3 Return to ID block on Pass stage
function returnToIdForm(blockId, blockPass) {
  blockPass.style.transform = "rotateY(90deg)";
  setTimeout(() => {
    blockId.style.transform = "rotateY(0deg)";
  }, "1500");
}

//2.2.4 Function for showing Error message
function showErrorMsg(errMsg, text) {
  errMsg.style.color = "red";
  errMsg.textContent = text;
  errMsg.style.visibility = "visible";
}


//2.2 Check user PASSWORD
function checkPass() {
  let authUser = document.getElementById('fName').value;
  let userPass = document.getElementById('fPass').value;
  let passErr = document.getElementById('passErrMess');
  let passBlock = document.getElementById('pwFormBlock');

  if(checkPassInput(userPass, passErr)) {
    checkPassDB(authUser, userPass, passErr, passBlock);
  }
}

//2.2.1 Check password input
function checkPassInput(pass, error) {
  if(pass == "") {
    showErrorMsg(error, ERR_MSG_TXT_PASS_EMPTY);
    return false;
  }
  else if(pass.length > 20) {
    showErrorMsg(error, ERR_MSG_PASS_LENGTH);
    return false;
  }
  else {
    synchro(error);
    return true;
  }
}

//2.2.2 Check password on db
function checkPassDB(user, pass, error, block) {
  $.ajax({
    data : {userauth: user, userpass: pass},
    type : 'POST',
    url : '/loginpassprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        error.style.color = "green";
        error.textContent = SUCCESS_MSG_GREETING;   
        block.style.transform = "rotateX(90deg)";
        setTimeout(() => {
          
        }, "1500")
        //Display password form
      }
      else if(data == 'NOK'){
        error.style.color = "red";
        error.textContent = ERR_MSG_PASS_INCORRECT;
      }
      else {
        error.style.color = "red";
        error.textContent = ERR_MSG_TXT_SERV_CONN;
    }
  });
}


//2.3 SYNCHRONIZATION functions
function synchro(err) {
  err.style.color = "orange";
  err.textContent = SYNCHRO_MAIN;
  err.style.visibility = "visible";
}

//2.4 Clear error messages 
function clearErrorMsg(errMsg) {
  errMsg.style.visibility = "hidden";
}