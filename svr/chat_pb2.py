# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: chat.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='chat.proto',
  package='chat',
  serialized_pb=_b('\n\nchat.proto\x12\x04\x63hat\"\x1f\n\x08\x43hatInfo\x12\x13\n\x0bplayer_name\x18\x01 \x01(\t')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_CHATINFO = _descriptor.Descriptor(
  name='ChatInfo',
  full_name='chat.ChatInfo',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='player_name', full_name='chat.ChatInfo.player_name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=20,
  serialized_end=51,
)

DESCRIPTOR.message_types_by_name['ChatInfo'] = _CHATINFO

ChatInfo = _reflection.GeneratedProtocolMessageType('ChatInfo', (_message.Message,), dict(
  DESCRIPTOR = _CHATINFO,
  __module__ = 'chat_pb2'
  # @@protoc_insertion_point(class_scope:chat.ChatInfo)
  ))
_sym_db.RegisterMessage(ChatInfo)


# @@protoc_insertion_point(module_scope)