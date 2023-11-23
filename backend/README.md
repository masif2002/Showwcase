## Installation 
* Install `venv` from python
* Create a virtual environment
* Install dependencies from `requirements.txt`
* Set up MySQL

## MySQL Instructions
* Login as a root user and create a new user in MySQL and Grant Permissions (`CREATE USER 'showwcase'@'localhost' IDENTIFIED BY 'password';` && `GRANT ALL PRIVILEGES ON *.* TO 'showwcase'@'localhost' WITH GRANT OPTION;`)
* Create DB (`create database uidmapper`)
* Update the DB config in app.py 
* Use flask shell to create tables (`db.create_all()`)

## Start Server
* Activate virtual environment
* Run `startServer.sh`