#!/usr/bin/python
 
import tornado.web
import tornado.websocket
import tornado.ioloop
import struct
import dawn.proto.allinone_pb2
import dawn.network.session
import dawn.network.netbuf
 
class WebSocketHandler(tornado.websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
	def open(self):
		print "New client connected"
		#self.write_message("You are connected")
		'''session = dawn.network.session.Session(1, self)
		print session.uid
		print session.socket
		print dawn.network.session.sessionManager.has_session(session)
		dawn.network.session.sessionManager.add_session(session)
		print dawn.network.session.sessionManager.has_session(session)'''

	def on_message(self, message):
		length = len(message)
		print "recieve length: " + str(length)
		print type(message)
		#parser
		'''msgType = struct.unpack("i", message[0:4])[0]
		protoLen = struct.unpack("i", message[4:8])[0]
		protoContent = message[8: 8 + protoLen]
		newchat = dawn.proto.allinone_pb2.ChatInfo()
		newchat.ParseFromString(protoContent)
		print newchat.player_name'''
		
		reader = dawn.network.netbuf.NetReader(message)
		typeProto = reader.ReadInt()
		print "type: %d"%(typeProto)
		protoLen = reader.ReadInt()
		print "length: %d"%(protoLen)
		newchat = dawn.proto.allinone_pb2.ChatInfo()
		reader.ReadProto(newchat)
		print newchat.player_name
		#response
		resProto = dawn.proto.allinone_pb2.ChatInfo()
		resProto.player_name = "hahaha"
		
		resSer = resProto.SerializeToString()
		response = struct.pack("ii", 1, len(resSer))
		response += resSer
		self.write_message(response)

	def on_close(self):
		print "Client disconnected"


application = tornado.web.Application([
    (r"/", WebSocketHandler),
])
 
#sessionMgr = awn.network.session.SessionManager()

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()

