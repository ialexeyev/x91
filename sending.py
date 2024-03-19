import smtplib
#from smtplib import SMTP


def sendCode(email, code):
  sender = 'htkcmap@gmail.com'
  receiver = email
  message = "Good day, dear CMAP user! Your code for verification - " + str(
      code) + "\n\nBest regards, \nCMAP technical support team"

  server = smtplib.SMTP('smtp.gmail.com', 587)
  server.starttls()
  print(message)

  server.login(sender, 'gcyp vzvl uhlc dpvk')

  try:
    server.sendmail(sender, receiver, message)
  except:
    server.quit()
    return False

  server.quit()
  return True
