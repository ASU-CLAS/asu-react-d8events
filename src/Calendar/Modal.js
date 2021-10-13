import React from "react";

class Modal extends React.Component {

    onClose = e => {
        this.props.show = false;
      };

    listOfTitles() {

      let titleList = [];

      this.props.events.map(event => {
        titleList.push(<div>{event.title}</div>)
      })

      return titleList;
      
    }

      
        render() {
            console.log(this.props.events, this.props.show, "bean bean")

            if(!this.props.show){
                return null;
            }
            return <div>
              
               
              <div className="modal" id="modal">
              <h2>Modal Window</h2>
              <div className="content"> {this.listOfTitles()}</div>
              <div className="actions">
                   <button className="toggle-button" onClick={this.onClose}>
                     close
                   </button>
              </div>
                </div>
             </div>
          
          
          ;
        }
      }
 

 export default Modal;