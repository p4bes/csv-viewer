var csvTranformator = require('../src/CSVTransformator');
const fileReader = require('../src/FileReader');
var assert = require('chai').assert
var dummyString = '{"count":2,"headerItems":["Name","Alter","Letzter Besuch","Ort"],"rows":[{"index":1,"columns":["Peter","69","01.08.2010 00:00:00","Köln"]}]}'

describe('csvToJS', function() {
    it('should read csv input, transform data, and create Json', function(){
        assert.equal(JSON.stringify(csvTranformator.csvToJS(fileReader.readFile('./test/data/test.csv'))),dummyString)
    });
});
