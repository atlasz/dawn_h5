import dawn.common.common

class Session():
	uid = 0
	socket = []
	def __init__(self, uid, socket):
		self.uid = uid
		self.socket = socket
		
class SessionManager():
	__metaclass__ = dawn.common.common.Singleton
	
	sessions = {}

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

	def has_session(self, session):
		uid = session.uid
		if self.sessions.has_key(uid):
			return True
		return False

sessionManager = SessionManager()