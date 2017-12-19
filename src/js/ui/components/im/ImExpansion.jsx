import React, { Component } from 'react';
import 'css/components/expansion.css'

import ExpansionDialog from 'js/ui/components/im/ExpansionDialog.jsx'
import ExpansionImOptions from 'js/ui/components/im/ExpansionImOptions.jsx'


class ImExpansion extends Component {
  render() {
    return (
        <div className="im_expansion_div">
          <ExpansionDialog />
          <div className="expansion_divider"></div>
          <ExpansionImOptions />
        </div>
    );
  }
}

export default ImExpansion;


/*
	<MessagesContainer /> 
*/