#!/bin/bash

DIR="server"
IP=`hostname -I | awk '{print $1}'`

rm -rf "$DIR"
git clone https://github.com/novnc/websockify "$DIR" 
cd "$DIR"
./run "$IP:6080" "$IP:5920"