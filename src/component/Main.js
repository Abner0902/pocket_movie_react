import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Movie from './Movie';
import Person from './Person';
import Company from './Company';
import Contact from './Contact';
import Pagination from './Pagination'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    paging(page) {
        this.props.handlePaging(page);
    }

    render() {
        var items = [];
        items = this.props.items;

        return (
            <div>
                <div>
                    <Route exact path="/movie" render={(props) => <Movie {...props} items={items} />} />
                    <Route path="/person" render={(props) => <Person {...props} items={items}/>} />
                    <Route path="/company" render={(props) => <Company {...props} items={items}/>} />
                    <Route path="/Contact" render={(props) => <Contact {...props} />}/>
                </div>
                {this.props.total_pages !==0 ? <Pagination total_pages={this.props.total_pages}  paging={this.paging.bind(this)}/> : null}
            </div>
        );
    }
}

export default Main;