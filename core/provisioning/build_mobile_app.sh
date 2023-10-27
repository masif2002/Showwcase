#!/bin/bash

set -e # Exits script if error

if [ "$PROJECT" == "" ]; then
    echo "Aborting... No project link provided"
    exit 1
fi

echo "Building mobile application ..."

# Download Project
cd ~
PROJECT_NAME=$(echo "$PROJECT" | awk -F/ '{print $NF}')
rm -rf $PROJECT_NAME && git clone $PROJECT # Remove this folder later

echo
echo "Successfully cloned project => $PROJECT_NAME"

# Build Project
cd $PROJECT_NAME
unset ANDROID_SDK_ROOT # Gradle wants only ANDROID_HOME
unset ANDROID_HOME # Gradle wants only ANDROID_HOME
export ANDROID_HOME=/home/android/Android/Sdk
yes | ~/Android/Sdk/cmdline-tools/latest/bin/sdkmanager --licenses # Accept licenses in Dockerfile itself
chmod +x gradlew
./gradlew assembleDebug

# Install APK
export PATH=$PATH:/home/android/Android/Sdk/platform-tools
adb install app/build/outputs/apk/debug/app-debug.apk

# Get package name
APP_DETAILS="app/build/intermediates/packaged_manifests/debug/AndroidManifest.xml"
PACKAGE_NAME=`cat "$APP_DETAILS" | grep 'package="com' | awk -F'"' '{print $2}'`
# ACTIVITY_NAME=`cat "$APP_DETAILS" | grep 'android:name="com' | awk -F'"' '{print $2}'`
ACTIVITY_NAME="$PACKAGE_NAME.MainActivity"

# Launch app
# adb kill-server
# adb start-server
# sleep 10
# adb shell am start -n "$PACKAGE_NAME/$ACTIVITY_NAME" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER
adb shell am start -n "$PACKAGE_NAME/$ACTIVITY_NAME"

# Execute this script from host machine: docker exec -it  8ecb251458e6 /bin/bash -c "PROJECT='https://github.com/dudeitsasif/HelloWorldAndroid' /usr/local/bin/build_mobile_app.sh"