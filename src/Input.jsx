'use strict';

import $ from 'jquery';

import jsonProcessor from './Processor/json.jsx';

export default function(data, type, symbol) {
  let output = "";

  switch(type) {
    case 'json':
      output = jsonProcessor(data, symbol);
      break;
    case 'csv':
      break;
    default:
      break;
  }

  return output;
}
