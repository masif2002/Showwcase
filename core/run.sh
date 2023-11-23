#!/bin/bash

# ANDROID_GNSS_PATH_DEFAULT="/home/embuser/aosp-docker/_gnss_hal/"
# ANDROID_GNSS_PATH=${ANDROID_GNSS_PATH:-$ANDROID_GNSS_PATH_DEFAULT}

AOSP_ARGS="--env DISPLAY=:20" # DISPLAY variable is coupled with ports forwarded below

if [ "$NO_TTY" = "" ]; then
AOSP_ARGS="${AOSP_ARGS} -t"
fi
if [ "$DOCKERHOSTNAME" != "" ]; then
AOSP_ARGS="${AOSP_ARGS} -h $DOCKERHOSTNAME"
fi
if [ "$HOST_USB" != "" ]; then
AOSP_ARGS="${AOSP_ARGS} -v /dev/bus/usb:/dev/bus/usb"
fi
if [ "$HOST_NET" != "" ]; then
AOSP_ARGS="${AOSP_ARGS} --net=host"
fi
if [ "$HOST_DISPLAY" != "" ]; then
AOSP_ARGS="${AOSP_ARGS} -v /tmp/.X11-unix:/tmp/.X11-unix"
fi

#Make sure prerequisite directories exist in studio-data dir
mkdir -p studio-data/profile/AndroidStudio2022.1.1.21
mkdir -p studio-data/profile/android
mkdir -p studio-data/profile/gradle
mkdir -p studio-data/profile/java

docker volume create --name=android_studio > /dev/null

# docker stop `docker ps -q` > /dev/null # Kills all containers

PORT=5920

startContainer() {
    STARTUP=$(docker run -d -p $PORT:$PORT -i $AOSP_ARGS -v `pwd`/studio-data:/studio-data -v android_studio:/androidstudio-data --privileged --group-add   plugdev imasiftoo/android-emulator $@ 2>&1)
}

startContainerOnAvailablePort() {
    startContainer
    portConflict="port is already allocated"
    while [ $PORT -lt 65535 ]
    do 
        if [[ "$STARTUP" == *"$portConflict"* ]]
        then
            echo "ERROR: Port $PORT is occupied"
            PORT=$(($PORT+1))
            startContainer
        else 
            echo "SUCCESS: Port $PORT is available"
            ID=$(echo $STARTUP | cut -c -12)
            echo $ID  
            break
        fi  
    done

   # If ran out of ports
   if [[ "$STARTUP" == *"$portConflict"* ]]
   then
    exit 1
   fi
}

# docker run -d -p 5921:5921 -i $AOSP_ARGS --privileged --group-add plugdev imasiftoo/android-emulator $@ # Ports forwarded coupled with DISPLAY variable above

startContainerOnAvailablePort

# Add token with Container ID and PORT to tokenFile (websockify)
cd ../websockify/server
echo "$ID: $(hostname -I | awk '{print $1}'):$PORT" >> token.config