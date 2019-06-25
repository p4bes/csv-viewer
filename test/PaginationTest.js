const Pagination = require('../src/Pagination');
const expect = require('chai').expect;

describe('Pagination', function () {

    context('constructor', function () {
        it('should be initialized with the given data', function () {
            let paginationObj = new Pagination(0, 20, 20, 30, 1);
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(20);
            expect(paginationObj.totalElements).to.equal(30);
            expect(paginationObj.pageSize).to.equal(20);
        });
    });

    context('next', function () {
        it('should go to next page', function () {
            let paginationObj = new Pagination(0, 10, 10, 30, 1);
            paginationObj.next();
            expect(paginationObj.offset).to.equal(10);
            expect(paginationObj.size).to.equal(10);
        });
        it('should go to next and last, size should be decreased', function () {
            let paginationObj = new Pagination(0, 20, 20, 30, 1);
            paginationObj.next();
            expect(paginationObj.offset).to.equal(20);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(20);
        });
        it('should not go to next page, because last', function () {
            let paginationObj = new Pagination(0, 10, 10, 10, 1);
            paginationObj.next();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(10);
        });
    });

    context('prev', function () {
        it('should not go to prev page because first', function () {
            let paginationObj = new Pagination(0, 10, 10, 30, 1);
            paginationObj.prev();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
        });
        it('should go to prev page', function () {
            let paginationObj = new Pagination(10, 10, 10, 30, 10, 1);
            paginationObj.prev();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(10);
        });
    });

    context('last', function () {
        it('should go to the last page', function () {
            let paginationObj = new Pagination(0, 10, 10, 30, 1);
            paginationObj.last();
            expect(paginationObj.offset).to.equal(20);
            expect(paginationObj.size).to.equal(10);
        });
        it('should go to last rest with decreased site', function () {
            let paginationObj = new Pagination(0, 10, 10, 31, 1);
            paginationObj.last();
            expect(paginationObj.offset).to.equal(30);
            expect(paginationObj.size).to.equal(1);
            expect(paginationObj.pageSize).to.equal(10);
        });
        it('should not go to last because its last', function () {
            let paginationObj = new Pagination(0, 10, 10, 10, 1);
            paginationObj.last();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(10);
        });
        it('should not go to last because its less items', function () {
            let paginationObj = new Pagination(0, 10, 10, 9, 1);
            paginationObj.last();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(10);
        });
    });

    context('first', function () {
        it('should go to the last page', function () {
            let paginationObj = new Pagination(20, 10, 10, 30, 11);
            paginationObj.first();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
        });
        it('should not go the first, because it is not existing', function () {
            let paginationObj = new Pagination(0, 10, 10, 31, 1);
            paginationObj.first();
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(10);
        });
    });

    context('jump', function () {
        it('should jump to the page number given', function () {
            let paginationObj = new Pagination(0, 10, 10, 30, 1);
            paginationObj.jumpToPage(2);
            expect(paginationObj.offset).to.equal(10);
            expect(paginationObj.size).to.equal(10);
        });
        it('should not jump to the page number given, because it is not existing', function () {
            let paginationObj = new Pagination(0, 10, 10, 30, 1);
            paginationObj.jumpToPage(5);
            expect(paginationObj.offset).to.equal(0);
            expect(paginationObj.size).to.equal(10);
            expect(paginationObj.pageSize).to.equal(10);
        });
    });


});
