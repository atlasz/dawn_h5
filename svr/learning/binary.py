import struct
buf1 = 256
bin_buf1 = struct.pack('i', buf1)
ret1 = struct.unpack('i', bin_buf1)
print buf1
print bin_buf1
print ret1[0]

a = "12345678"
print a[0:4]
print len(a[4:8])