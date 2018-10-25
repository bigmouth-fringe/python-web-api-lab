import os
import json


from flask import Flask
from flask import request
from flask import Response
from flask import jsonify
from flask import send_from_directory
from flask import send_file
import markdown

UPLOAD_FOLDER = '.'

# Instance of Flask
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def index():
    with open(os.path.dirname(app.root_path) + '/README.md', 'r') as markdown_file:
        content = markdown_file.read()
        return markdown.markdown(content)


@app.route("/root", methods=['GET'])
def root():
    return json.dumps(path_to_dict('.'))

@app.route("/download", methods=['GET'])
def download():
    filepath = request.args.get('filepath')
    return send_file(os.path.abspath(filepath))


def path_to_dict(path):
    d = {'name': os.path.basename(path)}
    d['path'] = path
    if os.path.isdir(path):
        d['type'] = "directory"
        d['children'] = [path_to_dict(os.path.join(path,x)) for x in os.listdir(path)]
    else:
        d['type'] = "file"
    return d