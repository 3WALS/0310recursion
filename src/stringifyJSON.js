// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var obj2 = {
  "hello": "hello",
  "bye": {
    "lulu": "lili",
    "ld": [1,2,3],
    "ojb": {
      "dkd": 2,
      "Asdf": [1,3],
      "df": null
    }
  }
};

var arr = { "hello" : [ 1,2,3,4]};

var stringifyJSON = function(obj) {
  console.log(obj);
  var unstringifiableValues = [{
    'functions': function(){},
    'undefined': undefined
  }];
  if ( whatType(obj) === 'string' ) { return '"' + obj + '"'; }
  if ( whatType(obj) !== 'object' && whatType(obj) !== 'array' && whatType(obj) !== 'string' ) { return String(obj); }
  if ( whatType(obj) === 'function' || whatType(obj) === 'undefined' ) { return ;}

  var result = '{';

  function whatType(data) {
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
  }

  function parseArray(arr) {
    var output = '[';
    arr.forEach(function(item) {
      if ( whatType(item) === 'array' ) output += parseArray(item) + ',';
      else if ( whatType(item) === 'object' ) output += stringifyJSON(item) + ',';
      else if ( typeof obj[key] === 'string') output += '"' + obj[key] + '",';
      else output += item + ',';
    });
    output = output.substring(0, output.length - 1);
    console.log(output + ']');
    return output + ']';
  }

  for ( var key in obj ) {
    result += '"' + key + '":';
    var value = obj[key];
    if ( whatType(value) === 'array' ) result += parseArray(value) + ',';
    else if ( typeof value === 'string') result += '"' + value + '",';
    else if ( whatType(value) === 'object' ) result += stringifyJSON(value) + ',';
    else result += value + ',';
  }
  result = result.substring(0, result.length - 1);

  return result + '}';
};
