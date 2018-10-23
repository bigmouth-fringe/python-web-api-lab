import os

from flask import Flask
from flask import Response
from flask import jsonify
import markdown

# Instance of FLask
app = Flask(__name__)

@app.route("/")
def index():
    with open(os.path.dirname(app.root_path) + '/README.md', 'r') as markdown_file:
        content = markdown_file.read()
        return markdown.markdown(content)

@app.route("/root", methods=['GET'])
def root():
    with open(f'{__file__}', 'r') as file:
        response = {
            "title": os.path.basename(file.name),
            "content": file.read()
        }
        return jsonify(response)
        