import dawn.common.common
import netbuf
import connection
import dawn.proto.allinone_pb2

class Session():
	uid = 0
	sid = 0
	socket = []
	def __init__(self, uid, socket):
		self.uid = uid
		self.socket = socket

	def handbytes(self, reader):
		con = connection.connectionManager.get_connection(self.uid)
		con.sid = self.sid
		if con :
			while not reader.IsReadDone() :
				try:
					msgLen = reader.ReadInt()
					bytes = reader.ReadBytes(msgLen)
					newReader = netbuf.NetReader(bytes)
					con.handle_msg(newReader)
				except Exception,e: 
					print Exception,":",e
	def handleStart(self):
		write = netbuf.NetWriter()
		write.WriteInt(dawn.proto.allinone_pb2.Command.CONN_CMD_START_RSP)
		print write.buf;
		write.WriteInt(self.uid)
		print write.buf
		print write.GetBytes()
		self.socket.write_message(write.GetBytes())
	def handleStop(self):
		write = netbuf.NetWriter()
		write.WriteInt(dawn.proto.allinone_pb2.Command.CONN_CMD_STOP_RSP)
		print write.buf;
		write.WriteInt(self.uid)
		print write.buf
		print write.GetBytes()
		self.socket.write_message(write.GetBytes())
		
class SessionManager():
	__metaclass__ = dawn.common.common.Singleton
	
	sessions = {}
	sessionSeq = 0

	def add_session(self, session):
		uid = session.uid
		if self.sessions.has_key(uid):
			print "session %d has been exist"%(uid)
		else:
			self.sessions[uid] = session

	def remove_session(self, session):
		uid = session.uid
		if self.sessions.has_key(uid):
			del self.sessions[uid]

	def remove_session_by_id(self, uid):
		if self.sessions.has_key(uid):
			del self.sessions[uid]

	def has_session(self, uid):
		if self.sessions.has_key(uid):
			return True
		return False
	def new_session(self, uid, socket):
		print "new_session uid:%d"%(uid)
		session = Session(uid, socket)
		self.sessionSeq += 1
		session.sid = self.sessionSeq
		return session

	def get_session(self, uid):
		if self.has_session(uid):
			return sessions[uid]
		else:
			return None;
# todo:
#session pool

sessionManager = SessionManager()