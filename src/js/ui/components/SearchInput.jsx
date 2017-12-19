import React, { Component } from 'react';

import 'css/components/search_input.css';

class SearchInput extends Component {
    constructor(){
        super();
        this.state=({
            showExp: false,
            showSearch: false
        });
    }

    render() {
        return (
            <div className="search_result">
                <div className="search_text">
                    Search: {this.props.q}
                </div>
                <div>
                </div>
            </div>      
        );
    }
}


export default SearchInput;
