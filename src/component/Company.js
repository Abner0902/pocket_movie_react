import React, { Component } from 'react';
import ItemList from './ItemList';

class Company extends Component {
    render() {
        return (
            <div>
                {this.props.items ? <ItemList items={this.props.items} /> : null}
            </div>
        );
    }
}

export default Company;