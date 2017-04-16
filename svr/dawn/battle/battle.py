import dawn.common.common
import dawn.network.session
import dawn.proto.allinone_pb2

class BattleObject():
	netId = 0
	uid = 0
	position = dawn.proto.allinone_pb2.PBVector2()
	direction = dawn.proto.allinone_pb2.PBVector2()
	def __init__(self, netId):
		self.netId = netId

class Battle():
	__metaclass__ = dawn.common.common.Singleton
	idSeq = 0
	battleObjects = []
	def new_battleObject(self):
		netId = self.idSeq + 1
		battleObject = BattleObject(netId)
		return battleObject

	def add_battleObject(self, obj):
		self.battleObjects.append(obj)
		sessions = dawn.network.session.sessionManager.sessions
		
		for i in self.battleObjects:
			spawnMsg = dawn.proto.allinone_pb2.ObjectSpawn()
			spawnMsg.netid = i.netId
			spawnMsg.asset_id = 3
			spawnMsg.position.x = 10
			spawnMsg.position.y = 11
			spawnMsg.direction.x = -1
			spawnMsg.direction.y = 1
			#spawnMsg.has_client_authority = False
			for key in sessions:
				session = sessions[key]				
				has_client_authority = i.uid == session.uid
				spawnMsg.has_client_authority = has_client_authority
				session.sendCmd(dawn.proto.allinone_pb2.Command.SPAWN_OBJECT, spawnMsg)

	def tick(self):
		pass

battleMgr = Battle()