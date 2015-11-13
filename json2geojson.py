#coding:utf8
import json
import sys
import os

with open("config.json") as fconfig:
  config = json.load(fconfig)
  inputPath = config["config"]["input"]
  outputPath = config["config"]["output"]

  for i in range(0, len(config["files"])):
    symbols = config["files"][i]["symbols"]
    inputFile = config["files"][i]["input"]
    if "output" in config["files"][i].keys():
      outputFile = config["files"][i]["output"]
    else:
      outputFile = config["files"][i]["input"]

### make basic
    basic = {
      "type": "FeatureCollection",
      "features": []
    }

    with open(os.path.join(inputPath, inputFile + '.json')) as fin:
      content = json.load(fin)
      for line in content:
### make template
        template = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": []
          }
        }
### add value
        for symbol in symbols:
          template["geometry"]["coordinates"].append(line[symbol])
        template["properties"] = line
        basic["features"].append(template)

        with open(os.path.join(outputPath, outputFile + '.json'), 'w+') as fout:
          data = json.dumps(basic, ensure_ascii=False, encoding='utf-8')
          fout.write(data.encode('utf-8'))
        fout.close()
      fin.close()
fconfig.close()
