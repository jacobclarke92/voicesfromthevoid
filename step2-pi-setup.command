#!/bin/bash


if [[ ! -f "./.env.sh" ]]; then
    echo ".env.sh file not found!"
    exit
fi

# load env vars
source ./.env.sh


echo "Eject SD card, put it in the PI, turn it on..."

echo "What drum is this for?"
read DRUM_NUM

check_ssh() {
    ssh -q -o ConnectTimeout=5 void$DRUM_NUM@192.168.1.5$DRUM_NUM exit
    return $?
}

while ! check_ssh; do
    echo "SSH is not available yet. Retrying in 5 seconds..."
    sleep 5
done

echo "PI is available!"

# copy over RSA key if not already done
sshpass -p "$PI_USER_PASSWORD" ssh-copy-id -i ~/.ssh/id_rsa.pub void$DRUM_NUM@192.168.1.5$DRUM_NUM

# ssh in...
ssh void$DRUM_NUM@192.168.1.5$DRUM_NUM << 'ENDSSH'

echo "Connected to remote machine"

sudo apt-get update
# probably don't need to do this
# sudo apt-get dist-upgrade

sudo apt-get install git
sudo apt-get install nano

# watchdog
sudo apt-get install watchdog

# puredata
sudo apt install puredata

# python deps for vl53l5cx sensor
pip install python-osc
pip3 install vl53l5cx-ctypes

git clone https://github.com/pimoroni/vl53l5cx-python
cd vl53l5cx-python/library
python3 setup.py install --user
cd ../../

# nodejs via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm use 18

# pm2
npm install -g pm2

# deps for docker
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common

# get docker signing key
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | sudo apt-key add -

# add docker repo
echo "deb [arch=armhf] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
     $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list

# install Docker
sudo apt update
sudo apt install -y --no-install-recommends \
    docker-ce \
    cgroupfs-mount


# TODO: all the things here

echo "Done exiting now..."
sleep 2

ENDSSH

echo "Welcome back to userspace"