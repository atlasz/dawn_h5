import dawn.common.common

class GameConnection():
	uid = 0
	sid = 0
	def __init__(self, uid):
		self.uid = uid
	def handle_msg(self, reader):
		#network identity, cmdType, cmdContent
		print "handle msg"

class GameConnectionManager():
	__metaclass__ = dawn.common.common.Singleton
	
	connections = {}

	def add_connection(self, connection):
		uid = connection.uid
		if self.has_connection(uid):
			print "connection %d has been exist"%(uid)
		else:
			self.connections[uid] = connection	

	def remove_connection(self, connection):
		uid = connection.uid
		if self.has_connection(uid):
			del self.connections[uid]

	def has_connection(self, uid):
		if self.connections.has_key(uid):
			return True
		return False

	def get_connection(self, uid):
		if self.has_connection(uid):
			return self.connections[uid]
		else:
			return None

	def new_connection(self, uid):
		return GameConnection(uid)

# todo:
#connection pool

connectionManager = GameConnectionManager()