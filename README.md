# File system management service

## Usage

### Root directory and list of all it's children files and folders

**Definition**

`GET /root`

**Response**

```json
[
    {
        "name":".",
        "path":".",
        "type":"directory",
        "children": [
            {
                "name":"MyInnerDirectory",
                "type":"directory",
                "path":".\\.MyInnerDirectory",
                "children": [
                    {
                        "name":"MyFile",
                        "path":".\\.MyInnerDirectory\\MyFile",
                        "type":"file"
                    }
                ]
            }
        ]
    }
]
```

### Specific directory by id and list of all it's children files and folders

**Definition**

`GET /download`

**Response**

```python
    import os
    from flask import Flask
    from flask import markdown

    app = Flask(__name__)

    @app.route("/")
    def index():
    with open(os.path.dirname(app.root_path) + '/README.md', 'r') as markdown_file:
        content = markdown_file.read()
        return markdown.markdown(content)
```
