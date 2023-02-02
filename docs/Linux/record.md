ssh-add <(echo "$PRIVATE_KEY")

gitlab-runner选择的容器为docker时，用ssh-add比较方便，不然获取密钥文件很麻烦（foxwebsite.pem)