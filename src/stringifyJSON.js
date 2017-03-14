// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
    if (obj === null) {return 'null';}
    if (obj === undefined || obj.constructor === Function) {return null;}
    else if (obj.constructor === String) {return '"' + obj + '"';}
    else if (obj.constructor === Number || obj.constructor === Boolean) {
        return String(obj);
    }
    else if (obj.constructor === Object) {
        if (Object.keys(obj).length === 0) {return '{}';}
        var result = '{';
        var keys = Object.keys(obj);
        var lastKey = keys[keys.length-1];
        for (var key of keys) {
            var value = stringifyJSON(obj[key]);
            if (value !== null) {
                result += stringifyJSON(key) + ":" + value;
                key === lastKey ? null : result += ',';
            }
            key === lastKey ? result += '}': null;
        }
        return result;
    }
    else if (obj.constructor === Array) {
        if (obj.length === 0) {return '[]';}
        var result = '[';
        for (var i=0; i<obj.length; i++) {
            result += stringifyJSON(obj[i]);
            i === obj.length-1 ? result += ']' : result += ',';
        }
        return result;
    }
};
