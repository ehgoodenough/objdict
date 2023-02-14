// What is an object-based dictionary? It's any object with key-value pairs!
// This is just a more primitive version of the ES2015 Maps.

import shortid from "shortid"

const Objdict = {}
export default Objdict

// Objdict.merge
// When merging, deletes any values of undefined.
// When merging, the later arguments will overwrite previous arguments.
// When merging, will assign a unique identifier to any units missing a key.
// This is a shallow merge.
// Returns a new untouched dict.
// Does not touch the passed in dicts.
Objdict.merge = function() {
    const omegadict = {}
    Array.from(arguments).forEach((alphadict) => {
        if(alphadict == undefined) {
            return
        }
        if(alphadict instanceof Array) {
            alphadict = Objdict.from(alphadict)
        }
        Object.keys(alphadict).forEach((key) => {
            omegadict[key] = alphadict[key]
            if(omegadict[key] === undefined) {
                delete omegadict[key]
            }
        })
    })
    return omegadict
}

// Objdict.map
// Assumes the "order" from Object.keys, which honestly isn't supposed to have order.
// For the iterator function, we pass the (value, key) => {}
// Returns a new untouched dict.
// In the current design, if you change the key in the iterator, it will still be saved in the dict by the old key.
Objdict.map = function(alphadict, iterator) {
    if(alphadict == undefined) {
        return {}
    }
    const omegadict = {}
    Object.keys(alphadict).forEach((key) => {
        omegadict[key] = iterator(alphadict[key], key)
    })
    return omegadict
}

// Objdict.find
// Assumes the "order" from Object.keys, which honestly isn't supposed to have order.
// For the iterator function, we pass the (value, key) => {}
Objdict.find = function(dict, iterator) {
    if(dict == undefined) {
        return undefined
    }
    const keys = Object.keys(dict)
    for(let index in keys) {
        const key = keys[index]
        const value = dict[key]
        if(iterator(value, key)) {
            return value
        }
    }
}

// Objdict.convert
Objdict.convert = function(alphalist, key = "key") {
    if(alphalist == undefined) {
        return {}
    }
    if(alphalist instanceof Array) {
        const omegadict = {}
        alphalist.forEach((value) => {
            value[key] = value[key] || shortid.generate()
            omegadict[value[key]] = value
        })
        return omegadict
    }
    return alphalist
}
Objdict.from = Objdict.convert

// Objdict.forEach
// Assumes the "order" from Object.keys, which honestly isn't supposed to have order.
// For the iterator function, we pass the (value, key) => {}
Objdict.forEach = function(dict, iterator) {
    dict = dict || []
    Object.keys(dict).forEach((key) => {
        const value = dict[key]
        iterator(value, key)
    })
}

// TODO: Support objdicts that use a different property as the key, like name or id.
