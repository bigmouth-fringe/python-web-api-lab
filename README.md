# File system management service

## Usage

### Get root directory and list of all it's children files and folders

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
                "path":"./MyInnerDirectory"
            }
        ]
    }
]
```

### Get specific directory and it's children by path

**Definition**

`GET /directory/<path:filepath>`

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
                "path":"./MyInnerDirectory"
            }
        ]
    }
]
```

### Get children files for directory by it's path

**Definition**

`GET /directories/<path:rootpath>`

**Response**

```json
[
    {
        "name":".xyzzy",
        "path":"./xyzzy",
        "type":"directory",
        "children": [
            {
                "name":"MyInnerDirectory",
                "type":"directory",
                "path":"./MyInnerDirectory"
            }
        ]
    },
    {
        "name":"sample_picture.png",
        "path":"./sample_picture.png",
        "type":"file"
    }
]
```

### Download a specific file by it's path

**Definition**

`GET /download/<path:filepath>`

### Post specific directory by new path

**Definition**

`POST /directory/<path:filepath>`

**Response**

```json
{
    "data": {
        "name": "NewFolder",
        "path": "FileManagement/NewFolder",
        "type": "directory"
    },
    "message": "You successfully created new directory",
    "success": true
}
```

### Delete specific directory by it's path

**Definition**

`DELETE /directory/<path:filepath>`

**Response**

```json
{
    "message": "You successfully deleted directory",
    "success": true
}
```
