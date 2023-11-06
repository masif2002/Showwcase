#!/bin/bash

if [ "$1" == "" ]
then 
    echo "No project link provided. Aborting .."
    exit 1
fi

cd ../core

rm -rf studio-data

# Start Container
CID=`./run.sh`
echo $CID

# Build app
docker exec -it $CID /bin/bash -c "PROJECT=$1 /usr/local/bin/build_mobile_app.sh"