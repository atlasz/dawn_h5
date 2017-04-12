import chat_pb2

chat = chat_pb2.ChatInfo()
chat.player_name = "aaa"

print chat.player_name
bin = chat.SerializeToString()
print len(bin)
print ":".join(x.encode("hex") for x in bin)

newchat = chat_pb2.ChatInfo()
newchat.ParseFromString(bin)

print newchat.player_name
