#! /bin/bash

source venv/bin/activate

export FLASK_APP=app.py
export FLASK_DEBUG=1

# Check for virtual environment and activate it 
flask run --host=0.0.0.0
