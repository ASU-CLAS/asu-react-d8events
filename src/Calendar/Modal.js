import React from "react";
import './Modal.scss';

class Modal extends React.Component {


    listOfTitles() {

      let titleList = [];

      //displays list of events within modal body
      this.props.events.map(event => {
        titleList.push(<a className="btn" href={event.alias} target="_blank">{event.title}</a>)
      })

      return titleList;
      
    }

      
        render() {
    
            return  <div><div className="modal-calendar" id="modal">
          
                       <h3 className="modal-center">Events</h3>
                         <div className="content">{this.listOfTitles()}</div>
                         <div className="actions modal-center">
                          <button className="toggle-button" onClick={this.props.close}>
                             close
                          </button>
                        </div>
                     </div></div> 
             
          
          
          ;
        }
      }
 

 export default Modal;