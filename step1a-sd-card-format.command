#!/bin/bash

if [[ ! -f "./.env.sh" ]]; then
    echo ".env.sh file not found!"
    exit
fi

if [[ ! -f "./$RASBIAN_IMG" ]]; then
    echo "Raspbian image not found!"
    exit
fi

# load env vars
source ./.env.sh


echo "What drum is this for?"
read DRUM_NUM

# output list of disks
diskutil list

# prompt for SD card
echo "-----------------------------"
echo "Enter SD card name e.g. /dev/disk2"
read SD_CARD

echo "Going to erase image, okay?"
read -p "Press any key to continue..."

# format
diskutil eraseDisk ExFAT temp $SD_CARD

# unmount
diskutil unmountDisk $SD_CARD


# download image
# wget -O rapbian.zip https://downloads.raspberrypi.org/raspbian_lite_latest
# unzip raspbian.zip

# burn image to SD card
# set bs(byte size) to 4 mega bytes
sudo dd if=$RASBIAN_IMG of=$SD_CARD bs=4m

echo "-----------------------------"
echo "Done"