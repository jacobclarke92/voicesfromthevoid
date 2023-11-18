#!/bin/bash

if [[ ! -f "./.env.sh" ]]; then
    echo ".env.sh file not found!"
    exit
fi

# load env vars
source ./.env.sh

echo "What drum is this for?"
read DRUM_NUM

if [[ ! -d "/Volumes/boot" ]]; then
    echo "SD card with name 'boot' isn't mounted!"
    exit
fi

# create empty ssh file on disk image
touch /Volumes/boot/ssh

# create user config file
echo "void$DRUM_NUM:$PI_USER_PASSWORD" > /Volumes/boot/userconf.txt

# create wifi config file
echo "
country=AU
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="$WIFI_SSID"
  scan_ssid=1
  psk="$WIFI_PASSWORD"
}
" > /Volumes/boot/wpa_supplicant.conf

# create config file
echo "

# Core settings for Pi Zero 2 W
arm_freq=1000
core_freq=400
h264_freq=300
isp_freq=300
v3d_freq=300
sdram_freq=450
arm_freq_min=600
core_freq_min=250
gpu_freq_min=250
h264_freq_min=250
isp_freq_min=250
v3d_freq_min=250
sdram_freq_min=400

# Enable audio (loads snd_bcm2835)
dtparam=audio=on

# Automatically load overlays for detected cameras
camera_auto_detect=1

# Automatically load overlays for detected DSI displays
display_auto_detect=0

# Enable I2C interface
dtparam=i2c_arm=on

# Enable watchdog
dtparam=watchdog=on

# AudioInjector
dtoverlay=audioinjector-wm8731-audio

# Power button GPIO pin config
dtoverlay=gpio-shutdown,gpio_pin=17,active_low=1,gpio_pull=up

[all]
dtparam=act_led_trigger=actpwr
enable_uart=1

" > /Volumes/boot/config.txt


echo "--------------"
echo "All done!"