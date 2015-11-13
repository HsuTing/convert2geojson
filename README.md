#json2geojson

## Requirement

- python

## Use

For Max or ubuntu:

```
  python json2geojson.py
```
- You can use many file if you want.

For window:

- Click `json2geojson.py`.

## Config example

You can add many files in files, and input is input folder, output is output folder.

```
{
  "config": {
    "input": "input_folder_name",
    "output": "output_folder_name"
  },  
  "files": [
    {   
      "input": "test",
      "symbols": [ "Lon", "Lat" ]
    },
    {   
      "input": "test2",
      "symbols": [ "Lon", "Lat" ]
    }
  ]
}
```

If you wnat to rename file`s name, you can do this.

```
{
  "config": {
    "input": "input_folder_name",
    "output": "output_folder_name"
  },  
  "files": [
    {   
      "input": "test",
      "symbols": [ "Lon", "Lat" ],
      "output": "testoutput"
    }
  ]
}
```

If you need to change output`s file extension, you can do this.

```
{
  "config": {
    "input": "input_folder_name",
    "output": "output_folder_name",
    "fileExtension": "geojson"
  },  
  "files": [
    {   
      "input": "test",
      "symbols": [ "Lon", "Lat" ],
      "output": "testoutput"
    }
  ]
}
```

## Config field Explanation

- `input` in `config` -> input folder`s name
- `output` in `config` -> output folder`s name
- `fileExtension` in `config` -> output file`s file extension
- `input` in `files` -> input file`s name
- `symbols` in `files` -> let program know which field in input files is `Lon` or `Lat`
- `output` in `files` -> output file`s name

## Development environment

- Mac OS X 10.11

## Issue

You can add issue [here](https://github.com/HsuTing/json2geojson/issues).

- Now, this program only can transform points in json to points in geojson.
