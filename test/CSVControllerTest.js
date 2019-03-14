const csv = require('../src/CSVViewer');
const expect = require('chai').expect;
const Errors = require('../src/Errors');

require('mocha-sinon');

describe('start', function () {

    beforeEach(function () {
        this.sinon.stub(console, 'log');
    });


    context('startConsole()', function () {
        it('should say there is no filePath provided', function () {
            csv.startConsole([],true);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith(Errors.errorMap['NO_FILEPATH'])).to.be.true;
        });

        it('should say there is no valid file', function () {
            csv.startConsole(['node','index.js', 'hello.csv'],true);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith(Errors.errorMap['FILE_ERROR'])).to.be.true;
        });
        it('should say there is the file is empty', function () {
            csv.startConsole(['node','index.js', 'leer.csv'],true);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith(Errors.errorMap['INVALID_CONTENT'])).to.be.true;
        });
        it('should say there there is a valid file, but with no data', function () {
            csv.startConsole(['node','index.js', './test/data/nodata.csv'],true);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith(Errors.errorMap['NO_DATA'])).to.be.true;
        });
    });

});
