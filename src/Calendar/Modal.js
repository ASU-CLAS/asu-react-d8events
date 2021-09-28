import React from "react";

class Modal extends React.Component {

    onClose = e => {
        this.props.show = false;
      };

      
        render() {
            console.log(this.props.events, "bean bean")
            if(!this.props.show){
                return null;
            }
          return <div>
              
              This is an events modal 
              <div className="modal" id="modal">
        <h2>Modal Window</h2>
        <div className="content">{this.props.children}</div>
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