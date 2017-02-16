#!/usr/bin/node
// test.js

var ut = require ('go-util');

var isOb = ut.isOb;
var pCheck = ut.pCheck;
var key1 = ut.key1;

var res = isOb ({a: true, b: false});
console.log ('res: ' + res); // true

var res = isOb ('string not an ob');
console.log ('res: ' + res); // false

var res = isOb (42);
console.log ('res: ' + res); // false

var res = isOb ([4, 5]);
console.log ('res: ' + res); // false

var p = {name: 'hobbes', password: 'susiederkins', url: 'http://snowmen.com'};

var f = function (params) {

    pDefault = {name: "", password: "", url: 'localhost', db: 'test', port: '27017'};
    var res = pCheck (params, pDefault);

    console.log ('res: ' + JSON.stringify (res) + '\n');
        // db and port parameters added, since they weren't originally
        // passed in, so default values applied.
        // The other parameters defined by pDefault were supplied, so those values are used

};

f (p);



