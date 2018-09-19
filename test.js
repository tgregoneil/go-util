#!/usr/bin/node
// test.js

var ut = require ('go-util');
var uti = require ('util').inspect;

var isOb = ut.isOb;
var pCheck = ut.pCheck;
var key1 = ut.key1;

var dds = ut.dollarDotSubUnicode;
var ddsR = ut.dollarDotSubUnicodeRestore;

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



var doSubstitute = function (ob) {
    
    console.log("==== objects with '$' and '.' in key names ====");
    console.log(uti(ob));
    console.log ('');

    console.log("==== After substitution with equivalent unicode representations ====");
    ob = dds(ob);
    console.log(uti(ob));
    console.log ('');

    console.log("==== Objects restored with '$' and '.' in key names as originally ====");
    ob = ddsR(ob);
    console.log(uti(ob));
    console.log ('\n\n');

};  // end doSubstitute 

    
var ob = { '$$abc': 1, 'a.b.c': 2, ZZ: { '$urhere$': 'this.is.it', 'dot.some.more': 'something' } };
doSubstitute(ob);

ob = { a: [{'$a1$.b':13, '$b1..':14}]};
doSubstitute(ob);


console.log ("==== dumpOb ({x: [3,4,{r: ['a', true], s: {yes:'sir'}}], a: {u: true, v: 'st\"qt'}}");
var s = ut.dumpOb ({x: [3,4,{r: ['a', true], s: {yes:'sir'}}, {}, []], a: {u: true, v: 'st"qt', w: "st'qt", x: 'at\'cc"more stuff'}});
console.log (s);
