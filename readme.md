
### go-util 

utilities used by 'go' packages

### Installation
```shell
$ npm install go-util
```

### Example (test.js)

```js
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


f (p);
```

### Results

```js
res: true
res: false
res: false
res: false
res: {"name":"hobbes","password":"susiederkins","url":"http://snowmen.com","db":"test","port":"27017"}

==== objects with '$' and '.' in key names ====
{ '$$abc': 1,
  'a.b.c': 2,
  ZZ: { '$urhere$': 'this.is.it', 'dot.some.more': 'something' } }

==== After substitution with equivalent unicode representations ====
{ '\uFF04\uFF04abc': 1,
  'a\uFF0Eb\uFF0Ec': 2,
  ZZ: 
   { '\uFF04urhere\uFF04': 'this.is.it',
     'dot\uFF0Esome\uFF0Emore': 'something' } }

==== Objects restored with '$' and '.' in key names as originally ====
{ '$$abc': 1,
  'a.b.c': 2,
  ZZ: { '$urhere$': 'this.is.it', 'dot.some.more': 'something' } }



==== objects with '$' and '.' in key names ====
{ a: [ { '$a1$.b': 13, '$b1..': 14 } ] }

==== After substitution with equivalent unicode representations ====
{ a: [ { '\uFF04a1\uFF04\uFF0Eb': 13, '\uFF04b1\uFF0E\uFF0E': 14 } ] }

==== Objects restored with '$' and '.' in key names as originally ====
{ a: [ { '$a1$.b': 13, '$b1..': 14 } ] }
```

