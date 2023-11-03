from flask import Flask, render_template, request, flash, jsonify
import subprocess
from flask_cors import CORS
import socket


app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/deploy", methods=["GET", "POST"])
def deploy():
  token = request.args.get('token')

  # Extract Project URL
  # project_url = request.json['project']

  # # Launch the container
  # p = subprocess.Popen(["../core/initiateDeployment.sh", project_url]) 
  # code = p.wait() 

  # print("Status Code (from backend):", code)

  ip = subprocess.getoutput("hostname -I | awk '{print $1}'")  

  # if (code):
  #   return jsonify({
  #     "status": "Deployment failed"
  #   })
  
  return jsonify({
    "status": "Deployment successful",
    "url": f"ws://{ip}:6080/?token={token}", 
    "vncpassword": "password"
  })
  