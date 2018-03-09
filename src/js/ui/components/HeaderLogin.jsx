import React, { Component } from 'react';
import SearchInput from 'js/ui/components/SearchInput.jsx'

import 'css/components/header.css';

import MainHeaderContentNoAuth from 'js/ui/components/MainHeaderContentNoAuth.jsx'


import LocalizedStrings from 'react-localization';
 
var i = 0
class HeaderLogin extends Component {
    constructor(){
        super();
        this.state=({
            showSearch: false,
            searchtext: "",
            showExp: ({
                "display": "none"
            }),
            isShown: false
        });
        this.changeSearch = this.changeSearch.bind(this);
    }

	changeLanguage(){
	}
	
    expClick(e){
        if (!this.state.isShown){
            this.setState({
                showExp: ({
                    "display": "block"
                }),
                isShown: !this.state.isShown
            });
        }  
        else {
            this.setState({
                showExp: ({
                    "display": "none"
                }),
                isShown: !this.state.isShown
            });
        }
    }

    showSearch(e){
		this.changeLanguage();
		//to owrk uncomment
		/*
        this.setState({
            showSearch: !this.state.showSearch
        });
		*/
    }

    onInpOver(e){
        e.preventDefault();
        /*this.setState({
            showSearch: !this.state.showSearch
        });*/
    }

    changeSearch(e){
        e.preventDefault();
        this.setState({
            searchtext: e.target.value
        })
    };

    render() {
        const hideButtonWhenSearch =
             (this.state.showSearch) ?
                ({"display": "none"}): 
                ({"display": "block"}); 

        return (
			<div>
			<div className="header_block"></div>
            <div className="header">
               
                {
                    (!this.state.showSearch) ?
                    <a onClick={this.showSearch.bind(this)} className="div_bg_logo">
                        <a className="a_logo_text">
                         <span className="logo_text">AV</span>
                        </a>
                    </a>

                    : <div className="div_search_wrapper">
                        <input onChange={this.changeSearch} className="search_input"/>  
                        <SearchInput q={this.state.searchtext}/>
                        <a onClick={this.showSearch.bind(this)} className="click_search_icon"></a>
                        </div>
                }
				
                <div className="main_header_content_wrapper">
                    <MainHeaderContentNoAuth />
                </div>
			</div>
            </div>
    );
  }
}


export default HeaderLogin;
