create keys folder

ssh-keygen -t rsa -b 4096 -m PEM -f keys/rsa.key
openssl rsa -in keys/rsa.key -pubout -outform PEM -out keys/rsa.key.pub