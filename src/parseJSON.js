// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var parseJSON = function(json) {
    var parseRecur = function(json) {
        if (json === 'null') return null;
        else if (json[0] === '"' || json[0] === "'") {
            if (json[json.length-1] === '"' || json[json.length-1] === "'") {
                return json.slice(1, json.length - 1);
            } else {
                console.log('error1');
            }
        } else if (json[0] === '[') {
            if (json[json.length-1] !== ']') console.log('error2');
            if (json.length === 2) return [];
            var arr = [];
            var toPush;
            var startAt = 1;
            var bracketOpen = false;
            if (json[1] === '"' || json[1] === "'" || json[1] === '[' || json[1] === '{') {
                bracketOpen = true;
            }
            for (var i = 0; i < json.length; i++) {
                if (bracketOpen === true && (json[i] === '"' || json[i] === "'" || json[i] === ']' || json[i] === '}')) {
                    bracketOpen = false;
                }
                if (bracketOpen === false && (json[i] === ',' || i === json.length - 1)) {
                    if (json[i] === ',') {
                        arr.push(parseRecur(json.slice(startAt, i)));
                        json[i+1] === ' ' ? startAt = i + 2 : startAt = i + 1;
                        if (json[startAt] === '"' || json[startAt] === "'" || json[startAt] === '[' || json[startAt] === '{') {
                            bracketOpen = true;
                        }
                    } else {
                        json[json.length-2] === ' ' ? toPush = parseRecur(json.slice(startAt, i-1)) : toPush = parseRecur(json.slice(startAt, i));
                        arr.push(toPush);
                    }
                }
            }
            return arr;
        } else if (json[0] === '{') {
            if (json[json.length-1] !== '}') console.log('error3');
            var obj = {};
            var startAt = 1;
            var key, value;
            var findingValue = false;
            var bracketOpen = false;
            for (var i = 0; i < json.length; i++) {
                if (findingValue === false && json[i] === ':') {
                    key = json.slice(startAt + 1, i - 1);
                    json[i+1] === ' ' ? startAt = i + 2 : startAt = i + 1;
                    findingValue = true;
                    if (json[startAt] === '"' || json[startAt] === "'" || json[startAt] === '[' || json[startAt] === '{') {
                        bracketOpen = true;
                    }
                }
                if (bracketOpen === true && (json[i] === json[i] === '"' || json[i] === "'" || json[i] === ']' || json[i] === '}')) {
                    bracketOpen = false;
                }
                if (findingValue === true && bracketOpen === false && (json[i] === ',' || i === json.length - 1)) {
                    if (json[i] === ',') {
                        //console.log(key, startAt, json[i], json);
                        value = parseRecur(json.slice(startAt, i));
                        obj[key] = value;
                        json[i+1] === ' ' ? startAt = i + 2 : startAt = i + 1;
                        findingValue = false;
                    } else {
                        json[json.length-2] === ' ' ? value = parseRecur(json.slice(startAt, i-1)) : value = parseRecur(json.slice(startAt, i));
                        obj[key] = value;
                        findingValue = false;
                    }
                }
                //console.log(i, key, value, startAt, findingValue, bracketOpen, json);
            }
            return obj;
        }
        else if (json === 'true') return true;
        else if (json === 'false') return false;
        else return Number(json);
    }
    return parseRecur(json);
};

var result = '{"a":[],"c": {}, "b": true}';
console.log(result);
console.log(parseJSON(result));
