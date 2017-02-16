// index.js

module.exports = (function () {

    // PRIVATE Properties/Methods
var _ = {

    key1: require ('key1')

};  // end PRIVATE properties

_.init = () => {
};

    // PUBLIC Properties/Methods
var P = {};

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
P.isOb = (ob) => {
    // returns true if ob is defined, not null, not an Array and of type object
    
    var res = typeof ob !== undefined &&
              ob !== null &&
              !Array.isArray (ob) &&
              typeof ob === 'object';

    return res;

}; // end P.isOb 

P.key1 = _.key1;

    // end PUBLIC section

_.init ();

return P;

}());



