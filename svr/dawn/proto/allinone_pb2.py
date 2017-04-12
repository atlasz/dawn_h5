# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: allinone.proto

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
  name='allinone.proto',
  package='dawnpb',
  serialized_pb=_b('\n\x0e\x61llinone.proto\x12\x06\x64\x61wnpb\"\x1f\n\x08\x43hatInfo\x12\x13\n\x0bplayer_name\x18\x01 \x01(\t\"c\n\x07MoveMsg\x12#\n\x08position\x18\x01 \x02(\x0b\x32\x11.dawnpb.PBVector2\x12\r\n\x05speed\x18\x02 \x01(\x02\x12$\n\tdirection\x18\x03 \x01(\x0b\x32\x11.dawnpb.PBVector2\"!\n\tPBVector2\x12\t\n\x01x\x18\x01 \x02(\x02\x12\t\n\x01y\x18\x02 \x02(\x02')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_CHATINFO = _descriptor.Descriptor(
  name='ChatInfo',
  full_name='dawnpb.ChatInfo',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='player_name', full_name='dawnpb.ChatInfo.player_name', index=0,
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
  serialized_start=26,
  serialized_end=57,
)


_MOVEMSG = _descriptor.Descriptor(
  name='MoveMsg',
  full_name='dawnpb.MoveMsg',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='position', full_name='dawnpb.MoveMsg.position', index=0,
      number=1, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='speed', full_name='dawnpb.MoveMsg.speed', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='direction', full_name='dawnpb.MoveMsg.direction', index=2,
      number=3, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
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
  serialized_start=59,
  serialized_end=158,
)


_PBVECTOR2 = _descriptor.Descriptor(
  name='PBVector2',
  full_name='dawnpb.PBVector2',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='x', full_name='dawnpb.PBVector2.x', index=0,
      number=1, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='y', full_name='dawnpb.PBVector2.y', index=1,
      number=2, type=2, cpp_type=6, label=2,
      has_default_value=False, default_value=0,
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
  serialized_start=160,
  serialized_end=193,
)

_MOVEMSG.fields_by_name['position'].message_type = _PBVECTOR2
_MOVEMSG.fields_by_name['direction'].message_type = _PBVECTOR2
DESCRIPTOR.message_types_by_name['ChatInfo'] = _CHATINFO
DESCRIPTOR.message_types_by_name['MoveMsg'] = _MOVEMSG
DESCRIPTOR.message_types_by_name['PBVector2'] = _PBVECTOR2

ChatInfo = _reflection.GeneratedProtocolMessageType('ChatInfo', (_message.Message,), dict(
  DESCRIPTOR = _CHATINFO,
  __module__ = 'allinone_pb2'
  # @@protoc_insertion_point(class_scope:dawnpb.ChatInfo)
  ))
_sym_db.RegisterMessage(ChatInfo)

MoveMsg = _reflection.GeneratedProtocolMessageType('MoveMsg', (_message.Message,), dict(
  DESCRIPTOR = _MOVEMSG,
  __module__ = 'allinone_pb2'
  # @@protoc_insertion_point(class_scope:dawnpb.MoveMsg)
  ))
_sym_db.RegisterMessage(MoveMsg)

PBVector2 = _reflection.GeneratedProtocolMessageType('PBVector2', (_message.Message,), dict(
  DESCRIPTOR = _PBVECTOR2,
  __module__ = 'allinone_pb2'
  # @@protoc_insertion_point(class_scope:dawnpb.PBVector2)
  ))
_sym_db.RegisterMessage(PBVector2)


# @@protoc_insertion_point(module_scope)
