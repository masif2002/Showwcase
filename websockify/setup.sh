#!/bin/bash

DIR="server"

rm -rf "$DIR"
git clone https://github.com/novnc/websockify "$DIR" 
cd "$DIR"
./run localhost:6080 localhost:5920

