#!/bin/bash

# Check if pv exists
if ! command -v pv &> /dev/null; then
    echo "pv (Pipe Viewer) is required but not installed. Please install pv (e.g., 'brew install pv') and try again."
    exit 1
fi

# List attached disks
diskutil list

# Prompt user to select a disk
read -p "Enter the disk number to backup (e.g., disk2): " disk_number

# Get current date
current_date=$(date +%Y-%m-%d)

# Prompt user for backup name, defaulting to backup-yyyy-mm-dd
read -p "Enter the backup name (default: backup-$current_date): " backup_name
backup_name=${backup_name:-backup-$current_date}

# Confirm command with user
read -p "About to run: sudo dd if=/dev/$disk_number | pv | dd of=./$backup_name.dmg bs=4m. Continue? (y/n): " confirmation

if [ "$confirmation" == "y" ]; then
    # Create backup
    echo "Creating backup will probably take a hot minute..."
    sudo dd if=/dev/$disk_number | pv | dd of=./$backup_name.dmg bs=4m
    
    echo "Backup created: ./$backup_name.dmg"
else
    echo "Backup operation cancelled."
fi