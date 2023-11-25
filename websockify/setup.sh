#!/bin/bash

DIR="server"
IP=`hostname -I | awk '{print $1}'`

rm -rf "$DIR"
git clone https://github.com/novnc/websockify "$DIR" 
cd "$DIR"

touch token.config
./run --token-plugin TokenFile --token-source token.config $(hostname -I | awk '{print $1}'):6080