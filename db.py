from sqlalchemy import create_engine, text, insert, table, column
import os

db_connection_str = os.environ['DB_CONNECT_STR']

engine = create_engine(db_connection_str,
                       connect_args={"ssl": {
                           "ssl_ca": "/etc/ssl/cert.pem"
                       }})


# MAIN: IMPORT HEADERS FOR APPLICATION ON header
def loadHeaders():
  with engine.connect() as conn:
    resultHeaders = conn.execute(text("select * from names"))
    resultHeadersDict = []
    for row in resultHeaders.all():
      resultHeadersDict.append(row._asdict())
    return resultHeadersDict


# LOGIN PAGE: FOR CHECKING USER ID
def loadUsers():
  with engine.connect() as conn:
    pre_users = conn.execute(text("select username from users"))
    users = []
    for row in pre_users.all():
      users.append(row._asdict())
    return users


# LOGIN PAGE: FOR CHECKING PASSWORD
def loadUsersPass():
  with engine.connect() as conn:
    pre_users = conn.execute(text("select username, passw from users"))
    userdata = []
    for row in pre_users.all():
      userdata.append(row._asdict())
    return userdata


# SIGN UP PAGE: DISPLAYING JOB TITLES
def displayJobItems():
  with engine.connect() as conn:
    preJobTitles = conn.execute(text("select * from jobtitle"))
    jobTitles = []
    for row in preJobTitles.all():
      jobTitles.append(row._asdict())
    return jobTitles


# SIGN UP PAGE: ADDING USER PROCESS
def addingNewUser(fname, lname, id, passw, job):
  allusers = table('users', column('username'), column('passw'), column('firstname'), column('lastname'), column('title'), column('access'), column('verified'))
  insertUser = insert(allusers).values(username=id, passw=passw, firstname=fname, lastname=lname, title=job, access='user', verified='0')
  with engine.connect() as conn:
    addUser = conn.execute(insertUser)
    conn.commit()
    if(addUser):
     return True
    