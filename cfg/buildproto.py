#protoc -I=./ --python_out=./ *.proto  
import os
os.system('protoc -I=../cli/bin/data/ --python_out=../svr/dawn/proto ../cli/bin/data/*.proto')