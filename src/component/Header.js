import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
    }

    //handle the submit event
    submit(event) {
        event.preventDefault();
        const form = event.target;
        const input = form.elements["search"]
        this.props.handleSubmit(input.value);
    }

    //reset the props
    reset() {
        this.props.reset();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto nav-tabs">
                        <li className="nav-item active"><Link to="/Movie" className='nav-link' onClick={this.reset}>Movie <span className="sr-only">(current)</span></Link></li>
                        <li className="nav-item "><Link to="/Person" className='nav-link' onClick={this.reset}>Person</Link></li>
                        <li className="nav-item "><Link to="/Company" className='nav-link' onClick={this.reset}>Company</Link></li>
                        <li className="nav-item "><Link to="/Contact" className='nav-link' onClick={this.reset}>Contact</Link></li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0" onSubmit={this.submit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id='searchTextField' name="search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
                    </form>
                </div>
            </nav>

        );
    }
}

export default Header;