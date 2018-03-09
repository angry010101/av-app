import React, { Component } from 'react';
/*
import ProfileImage from '/home/angry/av-app/src.jsx/ui/components/images/ProfileImage.jsx'
import Logo from '/home/angry/av-app/src.jsx/ui/components/images/Logo.jsx'
*/

import MainHeaderContent from 'js/ui/components/MainHeaderContent.jsx'

import ImExpansion from 'js/ui/components/im/ImExpansion.jsx'
import SearchInput from 'js/ui/components/SearchInput.jsx'
import HeaderActions from 'js/backend/HeaderActions.jsx'

import 'css/components/header.css';


import LocalizedStrings from 'react-localization';
 
var i = 0;
class Header extends Component {
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

    showSearch(e){

		this.changeLanguage();
		//to work uncomment
        /*this.setState({
            showSearch: !this.state.showSearch
        });*/
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

                <div style={hideButtonWhenSearch} className="main_header_content_wrapper">
                    <MainHeaderContent hideBtn={this.props.hideBtn} navMenuEnabled={this.props.navMenuEnabled} />
                </div>
                <ImExpansion />
            </div>
			</div>
    );
  }
}


export default Header;
