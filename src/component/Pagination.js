import React, { Component } from 'react';

const defaultProps = {
    initialPage: 1
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pager: {}
        };
    }

    componentWillMount() {
        // set page if items is not empty
        if (this.props.total_pages !== 0) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        let pageSize = 10;
        if (this.props.total_pages < 10) {
            pageSize = this.props.total_pages;
        }
        pager = this.getPager(this.props.total_pages, page, pageSize);

        //set the state page number to page
        //this.props.updatePage(page);
        this.props.paging(page);

        // update state
        this.setState({ pager: pager });
    }

    getPager(totalPages, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // create an array of pages to ng-repeat in the pager control
        var pages = [];
        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // return object with all pager properties required by the view
        return {
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pages: pages
        }
    }

    render() {
        var pager = this.state.pager;

        if (!pager.totalPages || pager.total_pages <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <nav>
                <ul className='pagination justify-content-center'>
                    <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <a className='page-link' onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a className='page-link' onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map(page =>
                        <li key={page} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                            <a className='page-link' onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                        <a className='page-link' onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'page-item disabled' : 'page-item'}>
                        <a className='page-link' onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pagination.defaultProps = defaultProps;
export default Pagination;