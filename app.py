from flask import Flask, render_template, request
from sqlalchemy import False_, false
from db import loadHeaders

app = Flask(__name__, '/static')


@app.route("/")
def launch():
  headers = loadHeaders()
  return render_template('index.html', headers=headers)


@app.route("/loginidprocess", methods=['POST'])
def processId():
  userId = request.form['userId']
  # DB CONNECTION
  from db import loadUsers
  users = loadUsers()
  indicator = False
  for user in users:
    if user['username'] == userId:
      indicator = True
  if (indicator == True):
    return 'OK'
  else:
    return 'NOK'


if (__name__ == '__main__'):
  app.run(host='0.0.0.0', debug=True)

# Last assembly: 3h20min
