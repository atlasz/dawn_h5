import struct

class NetReader(object):
	"""docstring for NetReader"""
	buf = ""
	pos = 0
	size = 0
	def __init__(self, message):
		super(NetReader, self).__init__()
		self.buf = message
		self.size = len(self.buf)
	def ReadInt(self):
		if self.CheckCapacity(4) and not self.IsReadDone():
			val = struct.unpack("i", self.buf[self.pos:self.pos + 4])
			self.pos += 4
			return val[0]
		else:
			print "check false"
			return 0
	def ReadProto(self, protoType):
		message = self.buf[self.pos:self.size]
		protoType.ParseFromString(message)

	def ReadBytes(self, bytelen):
		print "ReadBytes pos: %d  len: %d size: %d"%(self.pos, bytelen, self.size)
		if self.pos + bytelen > self.size:
			print "ReadBytes failed"
			return ""
		bytes = self.buf[self.pos:self.pos + bytelen]
		self.pos += bytelen
		print "ReadBytes succ"
		return bytes

	def IsReadDone(self):
		#print "IsReadDone pos: %d size: %d " %(self.pos, self.size)
		return self.pos >= self.size

	def CheckCapacity(self, bytelen):
		if self.pos + bytelen > self.size:
			print "pos %d bytelen %d size %d"%(self.pos, bytelen, self.size)
			return False
		return True
	def GetBytes(self):
		return self.buf[0:self.pos]

class NetWriter(object):
	"""docstring for NetWriter"""
	buf = ""
	pos = 0
	size = 0
	def __init__(self):
		super(NetWriter, self).__init__()
	def WriteInt(self, val):
		self.buf += struct.pack("i", val)
		self.pos += 4
	def WriteProto(self, cmd, protoType):
		message = protoType.SerializeToString()
		self.WriteInt(4 + len(message))
		self.WriteInt(cmd)
		self.buf += message
		self.pos += len(message)
	def GetBytes(self):
		return self.buf[0:self.pos]
		