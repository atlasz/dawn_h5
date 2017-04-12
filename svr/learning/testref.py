message = "origin"
value = 1

class Handler():
	def handleMessage(self, mes):
		mes = "Handle it"
	def handleInt(self,val):
		val = 2

han = Handler()
han.handleMessage(message)
print message
han.handleInt(value)
print value
