from flask import Flask, render_template, request
from db import loadHeaders

app = Flask(__name__, '/static')


# MAIN APPLICATION PAGE
@app.route("/")
def launch():
  headers = loadHeaders()
  return render_template('index.html', headers=headers)


# 1.1 LOGIN: CHECK USER ID
@app.route("/loginidprocess", methods=['POST'])
def processId():
  # DB CONNECTION
  from db import loadUsers
  global userId
  userId = request.form['userId']
  users = loadUsers()
  indicator = False
  for user in users:
    if ((user['username'] == userId) and (user['verified'] == 1)):
      indicator = True
  if (indicator == True):
    return 'OK'
  else:
    return 'NOK'


# 1.2 LOGIN: CHECK USER PASSWORD
@app.route("/loginpassprocess", methods=['POST'])
def processPass():
  from db import loadUsersPass
  userAuth = request.form['userauth']
  userPass = request.form['userpass']
  users = loadUsersPass()
  indicator = False
  for user in users:
    if (user['username'] == userAuth and user['passw'] == userPass):
      indicator = True
  if (indicator == True):
    return 'OK'
  else:
    return 'NOK'


# 2. SIGN UP: ADD USER PAGE
@app.route("/signup")
def signup():
  from db import displayJobItems
  headers = loadHeaders()
  jobs = displayJobItems()
  return render_template('registration.html', headers=headers, jobtitles=jobs)


# 2.1. SIGN UP: ADDING USER PROCESS
@app.route("/userregistration", methods=['POST'])
def newUser():
  from db import addingNewUser
  userFirstname = request.form['userFname']
  userLastname = request.form['userLname']
  userIdentification = request.form['userIdent']
  userPassw = request.form['userPass']
  userEmail = request.form['userMail']
  userJob = request.form['userSelect']
  insertData = addingNewUser(userFirstname, userLastname, userIdentification,
                             userPassw, userEmail, userJob)
  if (insertData == True):
    return 'OK'
  else:
    return 'NOK'


# 3 USER FORGOT PASSWORD PAGE
@app.route("/forgotpass")
def forgotPass():
  try:
    userId
  except NameError:
    return 'PAGE NOT FOUND: ERROR 404'
  headers = loadHeaders()
  return render_template('forgotpassw.html', headers=headers)


# 3.1 USER FORGOT PASSWORD: EMAIL VERIFICATION
@app.route("/verifymailprocess", methods=['POST'])
def verifyEmail():
  from db import askEmail
  from sending import sendCode
  from generating import generateCode
  global gcode
  gcode = generateCode()
  mail = request.form['userMail']
  emails = askEmail()
  indicator = 0
  sending = False
  for email in emails:
    if ((email['email'] == mail) and (email['verified'] == 1)
        and (email['username'] == userId)):
      indicator += 1
      sending = sendCode(mail, gcode)
  if (sending == True):
    indicator += 1
  if (indicator == 2):
    return 'OK'
  else:
    return 'NOK'


# 3.2 USER CODE VERIFICATION
@app.route("/verifycodeprocess", methods=['POST'])
def verifyCode():
  usercode = request.form['vcode']
  if (usercode == str(gcode)):
    return 'OK'
  else:
    return 'NOK'


# 3.3 CHANGIN PASSWORD PROCESS
@app.route("/changingpasswprocess", methods=['POST'])
def changingPassw():
  from db import changPass
  chuser = request.form['username']
  chpassw = request.form['changingpass']
  if (chuser != userId):
    return 'IDERROR'
  else:
    process = changPass(chuser, chpassw)
    if (process == True):
      return 'OK'
    else:
      return 'NOK'


# RUNNING APPLICATION
if (__name__ == '__main__'):
  app.run(host='0.0.0.0', debug=True)
