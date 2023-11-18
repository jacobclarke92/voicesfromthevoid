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

# ssh in...
sshpass -p "$PI_USER_PASSWORD" ssh void$DRUM_NUM@192.168.1.5$DRUM_NUM << 'ENDSSH'

echo "Connected to remote machine"
ls -l
# Additional commands as needed

ENDSSH