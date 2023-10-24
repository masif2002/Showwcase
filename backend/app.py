from flask import Flask, render_template, request, flash, jsonify
import subprocess
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
  return "Hello World!"

@app.route("/deploy", methods=["GET", "POST"])
def deploy():

  # Extract Project URL
  project_url = request.json['project']

  # Launch the container
  p = subprocess.Popen(["../core/initiateDeployment.sh", project_url]) 
  code = p.wait()

  print("Status Code (from backend):", code)

  if (code):
    return jsonify({
      "status": "Deployment failed"
    })
  
  return jsonify({
    "status": "Deployment successful",
    "url": "ws://localhost:6080", 
    "vncpassword": "password"
  })
  