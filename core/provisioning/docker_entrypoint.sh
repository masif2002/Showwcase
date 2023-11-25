#!/bin/bash

#Change permissions of /dev/kvm for Android Emulator
echo "`whoami`" | sudo -S chmod 777 /dev/kvm > /dev/null 2>&1

export PATH=$PATH:/studio-data/platform-tools/


# Create password for VNC authentication
# { echo "password"; echo "password"; echo "n"; } | vncpasswd
mkdir /home/`whoami`/.vnc # Move this to docker file
echo "password" | vncpasswd -f > /home/`whoami`/.vnc/passwd
# Xvnc :20 -PasswordFile /home/`whoami`/.vnc/passwd 
Xvnc :20 -rfbport $XVNC_PORT -PasswordFile /home/`whoami`/.vnc/passwd & # The & symbol here is executing the emulator command on the side

# Default to 'bash' if no arguments are provided
args="$@"
if [ -z "$args" ]; then
  args="~/Android/Sdk/emulator/emulator @test"
fi

exec $args
