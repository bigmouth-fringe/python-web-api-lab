import os
import json
import shutil

from flask import Flask
from flask import request
from flask import Response
from flask import jsonify
from flask import send_file
from flask import abort
from flask_cors import CORS
import markdown

UPLOAD_FOLDER = '.'

# Instance of Flask
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

@app.route('/')
def index():
    with open(os.path.dirname(app.root_path) + '/README.md', 'r') as markdown_file:
        content = markdown_file.read()
        return markdown.markdown(content)

@app.route('/root', methods=['GET'])
def root():
    return json.dumps(_get_directory('.'))

@app.route('/directory/<path:filepath>', methods=['GET'])
def get_directory(filepath):
    if os.path.exists(filepath):
        return json.dumps(_get_directory(filepath))
    else:
        abort(400)

@app.route('/directories/<path:rootpath>', methods=['GET'])
def get_directories(rootpath):
    if os.path.exists(rootpath):
        children = [_get_directory(os.path.join(rootpath, x), False) for x in os.listdir(rootpath)]
        return json.dumps(children)
    else:
        abort(400)


@app.route('/download/<path:filepath>', methods=['GET'])
def download(filepath):
    if os.path.exists(filepath) and os.path.isfile(filepath):
        return send_file(os.path.abspath(filepath), as_attachment=True)
    else:
        abort(400)

@app.route('/directory/<path:filepath>', methods=['POST'])
def post_directory(filepath):
    if _post_directory(filepath) != -1:
        new_dir = _get_directory(filepath, False)
        return jsonify(
            success = True, 
            message = 'You successfully created new directory', 
            data = new_dir
        )
    else: 
        return jsonify(success = False, message = 'Something went wrong :(')

@app.route('/directory/<path:filepath>', methods=['DELETE'])
def delete_directory(filepath):
    if _delete_directory(filepath) != -1:
        return jsonify(
            success = True, 
            message = 'You successfully deleted directory', 
        )
    else: 
        return jsonify(success = False, message = 'Something went wrong :(')
        

def _get_directory(path, show_children = True):
    d = {'name': os.path.basename(path)}
    d['path'] = path.replace('\\','/') 
    if os.path.isdir(path):
        d['type'] = 'directory'
        if show_children: 
            d['children'] = [_get_directory(os.path.join(path,x), False) for x in os.listdir(path)]
    else:
        d['type'] = 'file'
    return d

def _post_directory(filepath):
    if not os.path.exists(filepath):
        os.makedirs(filepath)
    else: 
        return -1

def _delete_directory(filepath):
    if os.path.exists(filepath):
        shutil.rmtree(filepath)
    else: 
        return -1
