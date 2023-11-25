#!/bin/bash

# ANDROID_GNSS_PATH_DEFAULT="/home/embuser/aosp-docker/_gnss_hal/"
# ANDROID_GNSS_PATH=${ANDROID_GNSS_PATH:-$ANDROID_GNSS_PATH_DEFAULT}

if [ "$1" == "" ]
then 
    echo "No project link provided. Aborting .."
    exit 1
fi

AOSP_ARGS="--env DISPLAY=:20" # DISPLAY variable is coupled with ports forwarded below

TOKEN=$2

cd $HOME/Showwcase/core/


#Make sure prerequisite directories exist in studio-data dir
mkdir -p studio-data/profile/AndroidStudio2022.1.1.21
mkdir -p studio-data/profile/android
mkdir -p studio-data/profile/gradle
mkdir -p studio-data/profile/java

docker volume create --name=android_studio > /dev/null

# docker stop `docker ps -q` > /dev/null # Kills all containers

PORT=5920

startContainer() {
    STARTUP=$(docker run -d -p $PORT:$PORT -e XVNC_PORT=$PORT -i $AOSP_ARGS -v `pwd`/studio-data:/studio-data -v android_studio:/androidstudio-data --privileged --group-add   plugdev imasiftoo/android-emulator $@ 2>&1)
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
            CID=$(echo $STARTUP | cut -c -12)
            echo $CID  
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
echo "$TOKEN: $(hostname -I | awk '{print $1}'):$PORT" >> token.config

# Build app
docker exec -it $CID /bin/bash -c "PROJECT=$1 /usr/local/bin/build_mobile_app.sh"