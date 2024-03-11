from sqlalchemy import create_engine, text
import os

db_connection_str = os.environ['DB_CONNECT_STR']

engine = create_engine(db_connection_str,
                       connect_args={"ssl": {
                           "ssl_ca": "/etc/ssl/cert.pem"
                       }})


# import header names of page from DB
def loadHeaders():
  with engine.connect() as conn:
    resultHeaders = conn.execute(text("select * from names"))
    resultHeadersDict = []
    for row in resultHeaders.all():
      resultHeadersDict.append(row._asdict())
    return resultHeadersDict
