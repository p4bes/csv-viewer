class Pagination {
    constructor(offset, size, pageSize, totalElements, pageNumber) {
        this.offset = offset;
        this.size = size;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
        this.pageNumber = pageNumber;
        this.oldPageNumber = pageNumber;
        this.totalPages = this._calculateNumberOfPages();
    }


    prev() {
        if (this.hasPrev()) {
            this.size = this.pageSize;
            this.offset -= this.size;
            this.updatePage(-1);
        }
    };

    next() {
        if (this.hasNext()) {
            this.offset += this.size;
            this.size = this.pageSize;
            this.updatePage(1);
        }
        if (this.hasRest()) {
            this.size -= (this.offset + this.size) - this.totalElements;
            this.updatePage(1);
        }
    };

    first() {
        this.offset = 0;
        this.size = this.pageSize;
        this.oldPageNumber = this.pageNumber;
        this.pageNumber = 1;
    }

    last() {
        if (this.offset + this.size < this.totalElements) {
            if (this.totalElements % this.size === 0) {
                this.offset = this.totalElements - this.size;
            } else {
                this.offset = Math.floor(this.totalElements / this.size) * this.pageSize;
                this.size -= (this.offset + this.pageSize) - this.totalElements;
            }
            this.oldPageNumber = this.pageNumber;
            this.pageNumber = this.totalPages;
        }
    }

    jumpToPage(pageNumber) {
        if (pageNumber > 0 && pageNumber <= this.totalPages) {
            if (pageNumber == 1) {
                this.first();
            } else if (pageNumber == this.totalPages) {
                this.last();
            } else {
                this.offset = (pageNumber * this.size)-this.size;
                this.setPage(pageNumber);
            }
        }
    }

    hasPrev() {
        return this.offset - this.pageSize >= 0;
    }

    hasNext() {
        return this.offset + this.size < this.totalElements;
    }

    hasRest() {
        return this.size < this.totalElements && this.offset + this.size > this.totalElements;
    }

    hasChanged() {
        return this.pageNumber !== this.oldPageNumber;
    }

    updatePage(newPageNumber) {
        this.oldPageNumber = this.pageNumber;
        this.pageNumber += newPageNumber;
    }

    setPage(newPageNumber) {
        this.oldPageNumber = this.pageNumber;
        this.pageNumber = newPageNumber;
    }

    _calculateNumberOfPages() {
        let roundedNumber = Math.floor(this.totalElements / this.pageSize);
        if (roundedNumber < (this.totalElements / this.pageSize)) {
            roundedNumber++;
        }
        return roundedNumber;
    }
}

module.exports = Pagination;

