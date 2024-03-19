import random


# 1. GENERATING RANDOM CODE FOR PASS FORGOTED USER VERIFICATION
def generateCode():
  gcode = random.randint(0, 99999)
  return gcode


print(generateCode())
