import dawn.common.common
import dawn.battle.battle
import random

class GameConnection():
	uid = 0
	sid = 0
	isInBattle = False
	def __init__(self, uid):
		self.uid = uid
	def handle_msg(self, reader):
		cmd = reader.ReadInt()
		print "message cmd %d"%(cmd)
		if cmd == dawn.proto.allinone_pb2.Command.BATTLE_START:
			self.handle_battle_start()
		else:
			pass
		#print "message len %d"%()
	def handle_battle_start(self):
		print "handle_battle_start"
		if not self.isInBattle:
			player = dawn.battle.battle.battleMgr.new_battleObject()
			player.uid = self.uid
			player.position.x = random.uniform(0, 1000)
			player.position.y = random.uniform(0, 600)
			dawn.battle.battle.battleMgr.add_battleObject(player)
			self.isInBattle = True


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