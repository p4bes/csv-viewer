var csv = require('../src/CSVViewer');
var expect = require('chai').expect;
require('mocha-sinon');

describe('start', function () {

    beforeEach(function () {
        this.sinon.stub(console, 'log');
    });


    context('startConsole()', function () {
        it('should say there is no filePath provided', function () {
            csv.startConsole([],true);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith('No filepath passed as first parameter! Exiting...')).to.be.true;
        });
    });

});
