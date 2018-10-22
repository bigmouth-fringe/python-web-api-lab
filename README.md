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

** Definition **

`GET /root`

** Response **

```json
[
    {
        "directory_id": "42",
        "title": "TrueMeaningOfLife",
        "children": [{"directory_id": "1", "title": "FirstChild"}, {"directory_id": "2", "title": "second_child"}],
    }
]
```

### Specific directory by id and list of all it's children files and folders

** Definition **

`GET /{folder_id}`

** Response **

```json
[
    {
        "directory_id": "2077",
        "title": "MyVeryPrivateFolder",
        "children": [{"directory_id": "45", "title": "PhotosFromVacation"}, {"directory_id": "2", "title": "Passwords"}],
    }
]
```