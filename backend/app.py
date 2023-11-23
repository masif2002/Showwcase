from flask import Flask, request, jsonify
from flask_cors import CORS
from .models import db, Uidmapper

import subprocess
from uuid import uuid4

app = Flask(__name__)
CORS(app)

# setting up DB connection
# mysql://username:password@host:port/database_name
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://showwcase:password@localhost:3306/uidmapper'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Routes
@app.route("/")
def hello():
  return "Welcome to Showwcase!"

@app.route("/deploy", methods=["GET", "POST"])
def deploy():
  token = request.args.get('token')

  # Extract Project URL
  # project_url = request.json['project']

  # # Launch the container
  # p = subprocess.Popen(["../core/initiateDeployment.sh", project_url]) 
  # code = p.wait() 

  # print("Status Code (from backend):", code)

  if (code):
    return jsonify({
      "status": "Deployment failed"
    })

  # Create a Deployment URL
  ip = subprocess.getoutput("hostname -I | awk '{print $1}'")  
  
  uid = str(uuid4())
  url = f"ws://{ip}:6080"
  deployment = Uidmapper(repository=project_url, uid=uid, connection_url=url)

  db.session.add(deployment)
  db.session.commit()

  return jsonify({
    "status": "Deployment successful",
    "uid": uid, 
  })
  
@app.route("/view/<uid>", methods=["GET"])
def view(uid):

  deployment = Uidmapper.query.get(uid)

  return jsonify({
    "repository": deployment.repository,
    "url": deployment.connection_url, 
    "vncpassword": "password",
  })