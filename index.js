// go-util/index.js

module.exports = (function () {

    // PRIVATE Properties/Methods
var v = {

    key1: require ('key1')

};  // end PRIVATE properties
var f={};

//---------------------
f.ddsDoIt = (ob, toUnicode) => {
    // ob is array => returns same ob
    // ob is object => returns new ob
    
    var res;

    var doReplace = function (key) {
        var newKey;

        if (toUnicode) {

            newKey = key.replace (/\$/g, '\\uFF04');
            newKey = newKey.replace (/\./g, '\\uFF0E');

        } else {

            newKey = key.replace (/\\uFF04/g, '$');
            newKey = newKey.replace (/\\uFF0E/g, '.');

        } // end if (toUnicode)
        
        return newKey;
    };

    if (ob !== null && typeof ob === 'object' && !(ob.hasOwnProperty ('_bsontype') && ob._bsontype === 'ObjectID')) {

        var i;
        if (Array.isArray (ob)) {

            for (i = 0; i < ob.length; i++) {

                ob [i] = f.ddsDoIt (ob [i], toUnicode);

            } // end for (var i = 0; i < ob.length; i++)

            res = ob;

        } else {

            res = {};

            var keys = Object.keys (ob);
            for (i = 0; i < keys.length; i++) {

                var key = keys [i];

                var val = ob[key];
    
                var newKey = doReplace (key);
    
                res [newKey] = f.ddsDoIt (val, toUnicode);
    

            } // end for (var i = 0; i < keys; i++)
            
        } // end if (Array.isArray (ob))
        
    } else {

        res = ob;

    } // end if (ob === null || typeof ob !== 'object')


    return res;

};  // end f.ddsDoIt 


    // PUBLIC Properties/Methods
var P = {};


//---------------------
P.arToOb = (ar) => {
    
    var ob = {};
    
    if (Array.isArray (ar)) {

        for (var i = 0; i < ar.length; i++) {

            var name = ar [i];
            ob [name] = i;

        } // end for (var i = 0; i < ar.length; i++)

    } // end if (Array.isArray (ar))
    return ob;

}; // end P.arToOb 


//---------------------
P.cloneOb = (ob) => {
    // assumes no values that are function types
    
    return JSON.parse (JSON.stringify (ob));

}; // end P.cloneOb 


//---------------------
P.constStr = (ch, length) => {
    
    var res = new Array (length + 1).join (ch);
    return res;

}; // end constStr 


//---------------------
P.dollarDotSubUnicode = (ob) => {
    
    return f.ddsDoIt (ob, true);

};  // end dollarDotSubUnicode 


//---------------------
P.dollarDotSubUnicodeRestore = (ob) => {
    
    return f.ddsDoIt (ob, false);

};  // end dollarDotSubUnicodeRestore


//---------------------
P.dumpOb = (ob, depth) => {
    
    depth = depth ? depth : 0;

    var indentCur;
    var indentDelta;
    var keys = [];

    //---------------------
    var dumpObInit = () => {
        
        indentCur = 0;
        indentDelta = 4;
    
    }; // end dumpObInit
    

    //---------------------
    var decrIndent = () => {
        
        indentCur -= indentDelta;
    
    }; // end decrIndent
    
    //---------------------
    var incrIndent = () => {
        
        indentCur += indentDelta;
    
    }; // end incrIndent
    
    //---------------------
    var doIndent = () => {
        
        return " ".repeat (indentCur);
    
    }; // end doIndent
    
    //---------------------
    var topKey = () => {
    
        var res = "";
        var startI;

        if (keys.length <= depth) {

            startI = 0;

        } else {

            startI = keys.length - depth;

        } // end if (keys.length <= depth)
        
        
        for (var i = startI; i < keys.length; i++) {

            res += keys [i];
            res += i === keys.length - 1 ? "" : ".";

        } // end for (var i = 0; i < keys.length; i++)
        
        return res;

    }; // end topKey


    //---------------------
    var dumpKeyPair = (ob, key) => {
    
        var prefix = topKey ();

        var res = doIndent ();
        var val = ob [key];

        keys.push (key);
        res += prefix !== "" ? prefix + '.' : "";
        res += key + ': ';

        if (key === '_id' && P.isOb (val) && val.hasOwnProperty ('_bsontype') && val._bsontype === 'ObjectID') {

            res += 'ObjectId("' + val + '")';

        } else {

            res += dumpObH (val);

        } // end if (key === '_id' && P.isOb (val) && val.hasOwnProperty ('_bsontype') && val._bsontype === 'ObjectID')
        
        keys.pop ();

        res += "\n";

        return res;

    }; // end dumpKeyPair 

    

    //---------------------
    var dumpObH = (ob) => {
        
        var res;
        if (typeof ob === 'undefined') {
    
            res = 'undefined';
    
        } else if (ob === null) {
    
            res = 'null';
    
        } else if (typeof ob === 'boolean') {
    
            res = ob ? 'true' : 'false';
    
        } else if (typeof ob === 'number') {
    
            res = "" + ob;
    
        } else if (typeof ob === 'string') {
    
            if (!ob.match (/'/)) {
    
                res = "'" + ob + "'";
    
            } else if (!ob.match (/"/)) {
    
                res = '"' + ob + '"';
    
            } else {
    
                res = '"' + ob.replace (/"/, '\\"') + '"';
    
            } // end if (!ob.match (/'/))
            
        } else if (Array.isArray (ob)) {
    
            if (ob.length === 0) {
    
                res = '[]';
    
            } else {
    
                res = "[\n";
                incrIndent ();
    
                for (var i = 0; i < ob.length; i++) {
    
                    res += dumpKeyPair (ob, i);
    
                } // end for (var i = 0; i < ob.length; i++)
    
                decrIndent ();
    
                res += doIndent ();
                res += "]" ;
    
            } // end if (ob.length === 0)
    
        } else if (typeof ob === 'object') {
    
            var keys = Object.keys (ob).sort ();
    
            if (keys.length === 0) {

                res = "{}";

            } else {

                res = "{\n";
                incrIndent ();
    
                keys.forEach (function (key) {

                    res += dumpKeyPair (ob, key);
        
                });

                decrIndent ();
                res += doIndent ();
                res += "}";

            } // end if (keys.length === 0)
    
        } else {
    
            res = 'unknown: ' + typeof ob;
    
        } // end if (typeof ob === 'undefined')
        
        return res;
    
    }; // end dumpObH
    
    dumpObInit ();
    return dumpObH (ob);

}; // end P.dumpOb 



//---------------------
P.isEmpty = (item) => {
    
    var res = false;

    switch (typeof item) {

        case 'string':

            res = item.length === 0;
            break;

        case 'undefined':

            res = true;
            break;

        case 'object':

            if (P.isOb (item)) {

                var keys = Object.keys (item);
                res = keys.length === 0;

            } else if (item === null) {

                res = true;

            } else if (Array.isArray (item)) {

                res = item.length === 0;

            } else {

                res = null;  // case shouldn't happen, so set to null if it does

            } // end if (P.isOb (item))
            
            break;

        case 'boolean':

            res = !item;
            break;

        case 'number':

            res = number === 0;
            break;

    } // end switch (typeof item)
    

    return res;
}; // end P.isEmpty 


//---------------------
P.isOb = (ob) => {
    // returns true if ob is defined, not null, not an Array and of type object
    
    var res = typeof ob !== undefined &&
              ob !== null &&
              !Array.isArray (ob) &&
              typeof ob === 'object';

    return res;

}; // end P.isOb 


P.key1 = v.key1;


//---------------------
P.parsePath = (absPath) => {
    
    var dir;
    var file;

    var matched = absPath.match (/(.*\/)([^\/]*)/);
    if (matched) {

        dir = matched [1];
        file = matched [2];

    } else {

        dir = ""; 
        file = absPath;

    } // end if (matched)
    
    return {dir: dir, file: file};

}; // end P.parsePath 


//---------------------
P.pCheck = (p, pDefault) => {
    // ditches any parameters supplied in p that aren't present in pDefault
    // if a param is necessary to a routine, then it should be defined in pDefault
    
    var res = {};

    p = P.isOb (p) ? p : {};
    
    for (var key in pDefault) {

        res [key] = p.hasOwnProperty (key) ? p [key] : pDefault [key];
    }

    return res;

}; // end P.pCheck 


//---------------------
P.stripQJ = (jsonStr) => {
    
    var res = jsonStr.replace (/"([^"]+)"\s*:/g, "$1:");
    return res;

}; // end P.stripQJ 


//---------------------
P.traverseArray = (arr, fnEl) => {
    
    if (Array.isArray (arr)) {

        arr.forEach (function (el) {

            P.traverseArray (el, fnEl);

        });

    } else {

        if (P.isOb (arr)) {

            var val = P.val1 (arr);

            if (Array.isArray (val)) {

                P.traverseArray (val, fnEl);

            } else {

                fnEl (arr);

            } // end if (Array.isArray (val))
            

        } else {

            fnEl (arr);

        } // end if (P.isOb (arr))

    } // end if (Array.isArray (arr))
    

}; // end P.traverseArray 


//---------------------
P.val1 = (ob) => {
    
    var key1 = P.key1 (ob);
    var res = key1 ? ob [key1] : null;

    return res;

}; // end P.val1 



    // end PUBLIC section

return P;

}());



