# File system management service

## Usage

All responses will have the form

```json
{
    "data": "Mixes type holding the content of the response",
    "message": "Description of what happened"
}
```

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
                "path":"./MyInnerDirectory",
                "children": [
                    {
                        "name":"MyFile",
                        "path":"./MyInnerDirectory/MyFile",
                        "type":"file"
                    }
                ]
            }
        ]
    }
]
```

### Download a specific file by it's path

**Definition**

`GET /download`

**URL Params**
`filepath=[string]`

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
