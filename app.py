from flask import Flask, jsonify, render_template
from db import loadHeaders

app = Flask(__name__, '/static')


@app.route("/")
def launch():
  headers = loadHeaders()
  return render_template('index.html', headers=headers)


@app.route("/api/headers")
def local_headers():
  headers = loadHeaders()
  return jsonify(headers)


if (__name__ == '__main__'):
  app.run(host='0.0.0.0', debug=True)

# Last assembly: 3h20min
