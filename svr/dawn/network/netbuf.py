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
		if self.pos + 4 >= self.size or self.IsReadDone():
			return 0
		val = struct.unpack("i", self.buf[self.pos:self.pos + 4])
		self.pos += 4
		return val[0]
	def ReadProto(self, protoType):
		message = self.buf[self.pos:self.size]
		protoType.ParseFromString(message)
	def IsReadDone(self):
		return self.pos >= self.size

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
	def WriteProto(self, protoType):
		message = protoType.SerializeToString()
		self.buf += message
		self.pos += len(message)
		