import React, { Component } from 'react';
import Img from 'react-image';
import no_img from './no_image_available.jpeg'

class Item extends Component {

    render() {
        const item = this.props.item
        const type = window.location.pathname.replace('/', '').toLowerCase();
        if (type === 'movie') {
            return (
                <li className="list-group-item">
                    {item.poster_path !== null ? <Img src={'https://image.tmdb.org/t/p/w92' + item.poster_path} /> : <Img src={no_img} />}
                    <p>{item.title}</p>
                    <p>{item.overview}</p>
                </li>
            );
        } else if (type === 'person') {
            return (
                <li className="list-group-item">
                    {item.profile_path !== null ? <Img src={'https://image.tmdb.org/t/p/w92' + item.profile_path} /> : <Img src={no_img} />}
                    <p>{item.name}</p>
                </li>
            );
        } else if (type === 'company'){
            return (
                <li className="list-group-item">
                    {item.logo_path !== null ? <Img src={'https://image.tmdb.org/t/p/w92' + item.logo_path} /> : <Img src={no_img} />}
                    <p>{item.name}</p>
                </li>
            );
        }
        
    }
}

export default Item;