#coding:utf8
import json
import sys
import os

for i in range(1, len(sys.argv)):
  with open(sys.argv[i]) as ftotal:
    files = json.load(ftotal)

    for i in range(0, len(files)):
      symbols = files[i]["symbols"]
      inputFile = files[i]["input"]
      outputFile = files[i]["output"]

### make basic
      basic = {
        "type": "FeatureCollection",
        "features": []
      }

      with open(os.path.join('input', inputFile + '.json')) as fin:
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

          with open(os.path.join('output', outputFile + '.json'), 'w+') as fout:
            data = json.dumps(basic, ensure_ascii=False, encoding='utf-8')
            fout.write(data.encode('utf-8'))
          fout.close()
        fin.close()
  ftotal.close()
