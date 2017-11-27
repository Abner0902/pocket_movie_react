import React, { Component } from 'react';

import ItemList from './ItemList';

class Movie extends Component {

    render() { 

        return (
            <div>
                {this.props.items ? <ItemList items={this.props.items} /> : null}
            </div>
        );
    }
}

export default Movie;