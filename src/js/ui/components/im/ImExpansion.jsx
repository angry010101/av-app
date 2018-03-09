import React, { Component } from 'react';
import 'css/components/expansion.css'

import ExpansionDialog from 'js/ui/components/im/ExpansionDialog.jsx'
import ExpansionImOptions from 'js/ui/components/im/ExpansionImOptions.jsx'

import onClickOutside from 'react-onclickoutside'

class ImExpansion extends Component {
	
	constructor(){
        super();
        this.state=({
            showExp: ({
                "display": "none"
            }),
            isShown: false
        });
    }
	
	
  handleClickOutside(){
    console.log('onClickOutside() method called')
	if (this.state.isShown) this.expClick()
  }
  
   expClick(){
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
	

  render() {
    return (
		<div>
		<a onClick={(e) =>  {  this.expClick() }} class="expansion">...</a>  
		<div style={this.state.showExp}>
        <div className="im_expansion_div">
          <ExpansionDialog />
          <div className="expansion_divider"></div>
          <ExpansionImOptions />
        </div>
		</div>
		</div>
    );
  }
}

export default onClickOutside(ImExpansion);


/*
	<MessagesContainer /> 
*/