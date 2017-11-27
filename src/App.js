import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './component/Header'
import Main from './component/Main'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searctText: "",
            items: [],
            total_pages: 0
        }

        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);
    }

    handleSubmit(value) {
        this.setState({ searctText: value });

        this.search(1, value);
    }

    handlePaging(page) {
        this.search(page, this.state.searctText);
    }

    reset() {
        this.setState({searchText: "", items: [], total_pages: 0});
    }

    search(page, searchText) {
        const type = window.location.pathname.replace('/', '').toLowerCase();
        let url = 'https://api.themoviedb.org/3/search/' + type + '?api_key=6949390c160c80174f3603c02804d757&language=en-US&query=' + searchText + '&page=' + page + '&include_adult=false';
        axios.get(url)
            .then(res => {
                const results = res.data.results.map(obj => obj);
                this.setState({ items: results });
                this.setState({ total_pages: res.data.total_pages });
            });
    }

    render() {
        return (
            <div>
                <Header handleSubmit={this.handleSubmit.bind(this)} reset={this.reset.bind(this)}/>
                <Main searchText={this.state.searctText} items={this.state.items} total_pages={this.state.total_pages} handlePaging={this.handlePaging.bind(this)}/>
            </div>
        );
    }
}

export default App;
