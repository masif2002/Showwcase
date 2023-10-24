FROM ubuntu:18.04

LABEL project="Badass"

ARG USER=android

RUN dpkg --add-architecture i386
RUN apt-get update && apt-get install -y \
        build-essential git neovim wget unzip sudo \
        libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386 \
        libxrender1 libxtst6 libxi6 libfreetype6 libxft2 xz-utils vim\
        qemu qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils libnotify4 libglu1 libqt5widgets5 openjdk-8-jdk openjdk-11-jdk openjdk-17-jdk xvfb \
        && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN groupadd -g 1000 -r $USER
RUN useradd -u 1000 -g 1000 --create-home -r $USER
RUN adduser $USER libvirt
RUN adduser $USER kvm
#Change password
RUN echo "$USER:$USER" | chpasswd
#Make sudo passwordless
RUN echo "${USER} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/90-$USER
RUN usermod -aG sudo $USER
RUN usermod -aG plugdev $USER

RUN mkdir /androidstudio-data
VOLUME /androidstudio-data
RUN chown $USER:$USER /androidstudio-data

USER $USER

WORKDIR /home/$USER


# Download Command-line tools of Android Studio
ARG ANDROID_STUDIO_CMDLINE=https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip
ARG ANDROID_STUDIO_VERSION=2022.1.1.21

RUN wget "$ANDROID_STUDIO_CMDLINE" -O cmdlinetools.zip
RUN unzip cmdlinetools.zip
RUN rm cmdlinetools.zip
RUN mkdir -p ~/Android/Sdk/cmdline-tools/latest/ && mv cmdline-tools/* ~/Android/Sdk/cmdline-tools/latest/
RUN yes | ~/Android/Sdk/cmdline-tools/latest/bin/sdkmanager --install emulator "build-tools;34.0.0" platform-tools "platforms;android-34-ext8" "system-images;android-33;google_apis;x86_64"

# Create Android Virtual Device (AVD)
ARG EMU=test

RUN echo "no" | ~/Android/Sdk/cmdline-tools/latest/bin/avdmanager create avd -n "$EMU" -k "system-images;android-33;google_apis;x86_64"
RUN echo "export ANDROID_HOME=/home/$USER/Android" >> /home/$USER/.bashrc 
RUN echo "export ANDROID_SDK_ROOT=/home/$USER/Android/Sdk" >> /home/$USER/.bashrc
RUN ls /home/$USER/Android/Sdk

RUN ln -s /studio-data/profile/AndroidStudio$ANDROID_STUDIO_VERSION .AndroidStudio$ANDROID_STUDIO_VERSION
RUN ln -s /studio-data/Android Android
RUN ln -s /studio-data/profile/android .android
RUN ln -s /studio-data/profile/java .java
RUN ln -s /studio-data/profile/gradle .gradle
ENV ANDROID_EMULATOR_USE_SYSTEM_LIBS=1

WORKDIR /home/$USER

RUN sudo apt update && sudo apt install -y tigervnc-standalone-server

COPY provisioning/docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
COPY provisioning/build_mobile_app.sh /usr/local/bin/build_mobile_app.sh
RUN sudo chmod +x /usr/local/bin/*

COPY provisioning/51-android.rules /etc/udev/rules.d/51-android.rules
COPY provisioning/config.ini .
RUN mv config.ini "/home/$USER/.android/avd/$EMU.avd/config.ini"

ENTRYPOINT [ "/usr/local/bin/docker_entrypoint.sh" ]