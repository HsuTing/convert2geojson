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
    "input": "input",
    "output": "output"
  },  
  "files": [
    {   
      "input": "test",
      "symbols": [ "VillageLon", "VillageLat" ]
    },
    {   
      "input": "test2",
      "symbols": [ "VillageLon", "VillageLat" ]
    }
  ]
}
```

If you wnat to rename file name, you can do this.

```
{
  "config": {
    "input": "input",
    "output": "output"
  },  
  "files": [
    {   
      "input": "test",
      "symbols": [ "VillageLon", "VillageLat" ],
      "output": "testoutput"
    }
  ]
}
```

## Development environment

- Mac OS X 10.11

## Issue

You can add issue [here](https://github.com/HsuTing/json2geojson/issues).

- Now, this program only can transform points in json to points in geojson.
