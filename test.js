import Chai from "chai"
import * as Objdict from "./main.js"

describe("Objdict", function() {
    describe("Objdict.convert", function() {
        it("Objdict.convert can convert an array into a set.", function() {
            const alphalist = [
                {"key": "one", "number": 1},
                {"key": "two", "number": 2},
                {"key": "three", "number": 3},
            ]
            const omegaset = {
                "one": {"key": "one", "number": 1},
                "two": {"key": "two", "number": 2},
                "three": {"key": "three", "number": 3},
            }

            Chai.expect(Objdict.convert(alphalist)).to.deep.equal(omegaset)
        })

        it("Objdict.convert won't convert if it is already a set.", function() {
            const set = {
                "one": {"key": "one", "number": 1},
                "two": {"key": "two", "number": 2},
                "three": {"key": "three", "number": 3},
            }

            Chai.expect(Objdict.convert(set)).to.deep.equal(set)
        })
    })

    describe("Objdict.merge", function() {
        it("can combine two sets.", function() {
            const set1 = {
                "red": {"key": "red", "fruit": "apple"}, // apple will be replaced by strawberry
                "blue": {"key": "blue", "fruit": "blueberry"}, // blueberry will be deleted by undefined
                "green": {"key": "green", "fruit": "lime"},
            }
            const set2 = {
                "red": {"key": "red", "fruit": "strawberry"},
                "blue": undefined,
                "yellow": {"key": "yellow", "fruit": "banana"},
            }

            Chai.expect(Objdict.merge(set1, set2)).to.deep.equal({
                "red": {"key": "red", "fruit": "strawberry"},
                "green": {"key": "green", "fruit": "lime"},
                "yellow": {"key": "yellow", "fruit": "banana"},
            })
        })
        it("can combine two sets while keeping null values.", function() {
            const set1 = {
                "red": {"key": "red", "fruit": "apple"}, // apple will be replaced by strawberry
                "blue": {"key": "blue", "fruit": "blueberry"}, // blueberry will be replaced by null
                "green": {"key": "green", "fruit": "lime"},
            }
            const set2 = {
                "red": {"key": "red", "fruit": "strawberry"},
                "blue": null,
                "yellow": {"key": "yellow", "fruit": "banana"},
            }

            Chai.expect(Objdict.merge(set1, set2)).to.deep.equal({
                "red": {"key": "red", "fruit": "strawberry"},
                "green": {"key": "green", "fruit": "lime"},
                "yellow": {"key": "yellow", "fruit": "banana"},
                "blue": null,
            })
        })
    })

    describe("Objdict.find", function() {
        it("can search a set with a conditional expression.", function() {
            const set = {
                "twenty-five": {"key": "twenty-five", "number": 25}, // 25 will be found before 1 because it is earlier
                "one-hundred": {"key": "one-hundred", "number": 100},
                "one": {"key": "one", "number": 1},
            }
            const greaterThanFifty = (value) => value.number > 50
            const lessThanFifty = (value) => value.number <= 50

            Chai.expect(Objdict.find(set, greaterThanFifty)).to.deep.equal({"key": "one-hundred", "number": 100})
            Chai.expect(Objdict.find(set, lessThanFifty)).to.deep.equal({"key": "twenty-five", "number": 25})
        })
    })

    describe("Objdict.map", function() {
        it("can iterate over a set.", function() {
            const set = {
                "a": {"key": "a", "number": 10},
                "b": {"key": "b", "number": 100},
                "c": {"key": "b", "number": 1000},
            }
            const iterator = (value) => {
                return {
                    "key": value.key,
                    "number": value.number * 2
                }
            }

            Chai.expect(Objdict.map(set, iterator)).to.deep.equal({
                "a": {"key": "a", "number": 20},
                "b": {"key": "b", "number": 200},
                "c": {"key": "b", "number": 2000},
            })
        })
    })
})


// Missing tests:
// "Objdict.convert can handle unkey'd values by assigning a unique key."
// "Objdict.xyz will handle an undefined set/list by handling it like an empty set/list."
// "Objdict.find/map will throw an error for an undefined iterator function."
// "Objdict.merge/map will return new sets, and will not mutate the old set."
// "Objdict.map will still save a value by its old key, even if the iterator function changed the value.key"
