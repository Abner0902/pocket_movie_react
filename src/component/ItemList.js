import React, { Component } from 'react';
import Item from './Item'
class ItemList extends Component {

    render() {
        return (
            <ul className="list-group">
                {this.props.items.map(item =>
                    <Item key={item.id} item={item} />
                )}
            </ul>
        );
    }
}

export default ItemList;