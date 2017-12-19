import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/*\
import '/home/angry/av-app/src/css/pages/login.css'
*/

import ChangeLogItem from 'js/ui/components/ChangeLogItem.jsx'



class ChangeLog extends Component {
  
  render() {
     return (
    	<div>
        	<ul>
          <li><ChangeLogItem text="Forwarded messages bug fixed" date="12.03.2017" /></li>
             
             <li><ChangeLogItem text="Doc uploading" date="11.23.2017" /></li>
                
               <li><ChangeLogItem text="Search dialogs fucking" date="21.12.2017" /></li>

                <li><ChangeLogItem text="Forwarded messages, photo attachments" date="14.12.2017" />    </li>
                <li><ChangeLogItem text="Fixed back button, added stickers, audios" date="11.12.2017" />  </li>
                <li><ChangeLogItem text="A lot of fucking audio messages, added support loading users dynamically(onlu forwarded mesages)" date="11.11.2017" /></li>
               <li><ChangeLogItem text="nothing" date="11.10.2017" /></li>
        		<li><ChangeLogItem text="Some work on send message panel, starting project telegram 420" date="11.09.2017" /></li>
   
        		<li><ChangeLogItem text="Preview message updating(LongPollHistory)" date="11.08.2017" /></li>
    	
        		<li><ChangeLogItem text="Teoriya algorithmov laba 5" date="11.07.2017" /></li>
    	
        		<li><ChangeLogItem text="LongPollHistory loading data" date="11.06.2017" /></li>
    	
        		<li><ChangeLogItem text="Login page design, Router->Route, ChangeLog" date="11.05.2017" /></li>
        		<li><ChangeLogItem text="green labeled images when online. the idea of creating ChangeLog is coming " date="11.04.2017" /></li>
        		<li><ChangeLogItem text="nothing" date="11.03.2017" /></li>
        		<li><ChangeLogItem text="do not know" date="11.02.2017" /></li>
        		<li><ChangeLogItem text="useless native website, server side python, changing to react " date="before" /></li>
        	</ul>
        </div>
    );
  }
}

/*#28534c*/
export default ChangeLog;