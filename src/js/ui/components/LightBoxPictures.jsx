import React, { Component } from 'react';

import HandleShadowViewActions from 'js/backend/HandleShadowViewActions.jsx'
import * as ShadowActions from 'js/backend/ShadowViewActions.jsx'

import dispatcher from "js/backend/Dispatcher.jsx"


import Lightbox from 'react-images';


class LightboxPictures extends Component {
    constructor(props){
        super(props);
        this.state=({
            i: [],
            type_attachment: "nothing",
            lightboxIsOpen: true,
            currentImage: props.currentImg
        });
		
		this.gotoNext = this.gotoNext.bind(this) 
		this.gotoPrevious = this.gotoPrevious.bind(this) 
	}

    handleClose(e){
        ShadowActions.hideShadowView();
    }

    componentWillMount(){
        
    }

	componentDidMount(){
		this.setState({
            currentImage: this.props.currentImg
        })
	}
	
	
    gotoPrevious(e){
        if (this.state.currentImage > 0){
            this.setState({
                currentImage: this.state.currentImage-1
            });
        }
    }

    gotoNext(e){
        if (this.state.currentImage <= this.props.images.length){
            this.setState({
                currentImage: this.state.currentImage+1
            });
        }
    }

    closeLightbox(e){
        dispatcher.dispatch({
         type: 'hideShadowView'
        });
    }

    render() {
        return (
            <Lightbox
                images={this.props.images}
                isOpen={this.props.show}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                onClose={this.closeLightbox}
             />
        );
    }
}

export default LightboxPictures;
