//Login Page main Scripts

//1. Window

window.onload = () => {
  document.body.style.opacity = "1";
  document.getElementById('idFormBlock').style.transform =  "rotateX(0deg)";
}

//2. User check functions

// 2.1 Clear input form:
function clearErrorMsg() {
  document.getElementById('idErrMess').style.visibility = "hidden";
}

//2.2 Check user input 
function checkId() {
  let userId = document.getElementById('fName').value;
  let errMessage = document.getElementById('idErrMess');
  let loginBlock = document.getElementById('idFormBlock');
  if(checkIdInput(userId, errMessage)) {
     checkIdDB(userId, errMessage, loginBlock);
  }
  userId.value = "";
}


//2.2 Check user input ID: exceptions
function checkIdInput(id, error) {
  
  //2.2.1 Empty field
  if(id == "") {
    error.textContent = ERR_MSG_TXT_EMPTY;
    error.style.visibility = "visible";
    return false;
  }
  else if(id.length > 30) {
    error.textContent = ERR_MSG_TXT_LENGTH;
    error.style.visibility = "visible";
    return false;
  }
  else if(((/^[A-Za-z0-9.]+$/).test(id)) == false) {
    error.textContent = ERR_MSG_TXT_CHARS;
    error.style.visibility = "visible";
    return false;
  }
  else {
    error.style.color = "orange";
    error.textContent = SYNCHRO_MAIN;
    error.style.visibility = "visible";
    return true;
  }
}

function checkIdDB(username, errMsg, logBlock) {
  $.ajax({
    data : {userId : username },
    type : 'POST',
    url : '/loginidprocess'
    })
    .done(function(data) {
      if(data == 'OK') {
        errMsg.style.color = "green";
        errMsg.textContent = 'SUCCESS';
        logBlock.style.transform = "rotateX(90deg)";
      }
      else if(data == 'NOK'){
        errMsg.style.color = "red";
        errMsg.textContent = 'USERNAME IS ABSENT';
      }
      else {
        errMsg.style.color = "red";
        errMsg.textContent = 'SERVER ERROR';
      }
    });
}