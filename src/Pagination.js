class Pagination {
    constructor(offset, size, totalElements, originalSize) {
        this.offset = offset;
        this.size = size;
        this.totalElements = totalElements;
        this.originalSize = originalSize;
    }

    prev() {
        if (this.hasPrev()) {
            this.size = this.originalSize;
            this.offset -= this.size;
        }
    };

    next() {
        if (this.hasNext()) {
            this.offset += this.size;
            this.size = this.originalSize;
        }
        if (this.hasRest()) {
            this.size -= (this.offset + this.size) - this.totalElements;
        }
    };

    first() {
        this.offset = 0;
        this.size = this.originalSize;
    }

    last() {
        if (this.offset + this.size < this.totalElements) {
            if (this.totalElements % this.size === 0) {
                this.offset = this.totalElements-this.size;
            } else {
                this.offset = Math.floor(this.totalElements / this.size) * this.originalSize;
                this.size -= (this.offset + this.originalSize) - this.totalElements;
            }
        }
    }

    hasPrev() {
        return this.offset - this.originalSize >= 0;
    }

    hasNext() {
        return this.offset + this.size < this.totalElements;
    }

    hasRest() {
        return this.size < this.totalElements && this.offset + this.size >= this.totalElements;
    }
}

module.exports = Pagination;

