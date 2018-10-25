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

```json
[
    *file content*
]
```
