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
		 
		
	}

    handleClose(e){
        ShadowActions.hideShadowView();
    }

    componentWillMount(){
        
    }

	componentDidMount(){
		
	}
	
	
    gotoPrevious(e){
        if (this.props.currentImg > 0){
            this.props.changeImage(this.props.currentImg-1);
        }
    }

    gotoNext(e){
		if (this.props.currentImg <= this.props.images.length){
            this.props.changeImage(this.props.currentImg+1)
        }
    }

    closeLightbox(e){
        dispatcher.dispatch({
         type: 'hideShadowView'
        });
    }

    render() {
		this.cimg = this.props.currentImg
		return (
            <Lightbox
                images={this.props.images}
                isOpen={this.props.show}
                onClickPrev={(e) => this.gotoPrevious(e)}
                onClickNext={(e) => this.gotoNext(e)}
                currentImage={this.cimg}
                onClose={this.closeLightbox}
             />
        );
    }
}

export default LightboxPictures;
