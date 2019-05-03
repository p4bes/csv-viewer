class Pagination {
    constructor(offset, size, pageSize, totalElements, pageNumber) {
        this.offset = offset;
        this.size = size;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
        this.pageNumber = pageNumber;
        this.oldPageNumber = pageNumber;
        this.totalPages = this._calculateNumbeOfPages();
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

    hasPrev() {
        return this.offset - this.pageSize >= 0;
    }

    hasNext() {
        return this.offset + this.size < this.totalElements;
    }

    hasRest() {
        return this.size < this.totalElements && this.offset + this.size >= this.totalElements;
    }

    hasChanged() {
        return this.pageNumber !== this.oldPageNumber;
    }

    updatePage(newPageNumber) {
        this.oldPageNumber = this.pageNumber;
        this.pageNumber += newPageNumber;
    }

    _calculateNumbeOfPages() {
        let roundedNumber = Math.floor(this.totalElements / this.pageSize);
        if (roundedNumber < (this.totalElements / this.pageSize)) {
            roundedNumber++;
        }
        return roundedNumber;
    }
}

module.exports = Pagination;

