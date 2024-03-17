from flask import Flask, render_template, request
from sqlalchemy import False_, false
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
  userId = request.form['userId']
  users = loadUsers()
  indicator = False
  for user in users:
    if user['username'] == userId:
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
  userJob = request.form['userSelect']
  insertData = addingNewUser(userFirstname, userLastname, userIdentification,
                             userPassw, userJob)
  if (insertData == True):
    return 'OK'
  else:
    return 'NOK'


# RUNNING APPLICATION
if (__name__ == '__main__'):
  app.run(host='0.0.0.0', debug=True)
