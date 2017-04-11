#!/usr/bin/python
 
import tornado.web
import tornado.websocket
import tornado.ioloop
import struct
import chat_pb2
 
class WebSocketHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
	def open(self):
		print "New client connected"
		#self.write_message("You are connected")

	def on_message(self, message):
		length = len(message)
		print "recieve length: " + str(length)
		
		msgType = struct.unpack("i", message[0:4])[0]
		protoLen = struct.unpack("i", message[4:8])[0]
		protoContent = message[8: 8 + protoLen]
		newchat = chat_pb2.ChatInfo()
		newchat.ParseFromString(protoContent)
		print newchat.player_name

		'''if length < 4:
			print "wrong message"
		else:
			msgType = struct.unpack("i", message[0:4])[0]
			if msgType == 1:
				usrId = struct.unpack("i", message[4:8])
				print str(usrId) + " is Enter"
			elif msgType == 2:
				print "chat"
			elif msgType == 3:
				print "move"'''
		self.write_message(message)

	def on_close(self):
		print "Client disconnected"


application = tornado.web.Application([
    (r"/", WebSocketHandler),
])
 
if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()

