#!/usr/bin/python
 
import tornado.web
import tornado.websocket
import tornado.ioloop
import struct
import dawn.proto.allinone_pb2
import dawn.network.session
import dawn.network.netbuf
import dawn.network.connection
 
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
		self.handle_message(message)
		#parser
		'''msgType = struct.unpack("i", message[0:4])[0]
		protoLen = struct.unpack("i", message[4:8])[0]
		protoContent = message[8: 8 + protoLen]
		newchat = dawn.proto.allinone_pb2.ChatInfo()
		newchat.ParseFromString(protoContent)
		print newchat.player_name
		
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
		self.write_message(response)'''

	def on_close(self):
		#todo check session by heart beat
		sessions = dawn.network.session.sessionManager.sessions
		session = []
		needClose = False
		for key in sessions:
			if sessions[key].socket == self:
				session = sessions[key]
				needClose = True
				print "delete session %d"%(session.sid)
				break
		if needClose:
			dawn.network.session.sessionManager.remove_session(session)

		print "Client disconnected"

	def handle_message(self, message):
		print len(message)
		print  ' '.join([bin(ord(c)).replace('0b', '') for c in message])
		reader = dawn.network.netbuf.NetReader(message)
		conn_cmd = reader.ReadInt()
		if conn_cmd == dawn.proto.allinone_pb2.Command.CONN_CMD_START_REQ:
			print "handle message start"
			self.process_conn_start(reader)
		elif conn_cmd == dawn.proto.allinone_pb2.Command.CONN_CMD_STOP_REQ:
			print "handle message stop"
			self.process_conn_stop(reader)
		else:
			print "handle message process data"
			self.process_data(reader)

	def process_data(self, reader):
		uid = reader.ReadInt()
		session = dawn.network.session.sessionManager.get_session(uid)
		session.handbytes(reader)

	def process_conn_start(self, reader):
		uid = reader.ReadInt()
		#test
		print reader.ReadInt()
		print "process_conn_start uid %d"%(uid)
		if dawn.network.session.sessionManager.has_session(uid):
			print "kick it"
		else:
			session = dawn.network.session.sessionManager.new_session(uid, self)
			dawn.network.session.sessionManager.add_session(session)
			if dawn.network.connection.connectionManager.has_connection(uid):
				game_con = dawn.network.connection.connectionManager.get_connection(uid)
			else:
				game_con = dawn.network.connection.connectionManager.new_connection(uid)
				dawn.network.connection.connectionManager.add_connection(game_con)
			session.handleStart()

	def process_conn_stop(self, reader):
		uid = reader.ReadInt()
		dawn.network.session.sessionManager.remove_session_by_id(uid)
		game_con = dawn.network.connection.connectionManager.get_connection(uid)
		if game_con:
			dawn.network.connection.connectionManager.remove_connection(game_con)

application = tornado.web.Application([
    (r"/", WebSocketHandler),
])
 
#sessionMgr = awn.network.session.SessionManager()

if __name__ == "__main__":
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()


