import React from "react";

class Modal extends React.Component {

    onClose = e => {
        this.props.show = false;
      };

      
        render() {
            console.log(this.props.events)
            if(!this.props.show){
                return null;
            }
          return <div>
              
              This is an events modal {this.props.events[0]}
              <div class="modal" id="modal">
        <h2>Modal Window</h2>
        <div class="content">{this.props.children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
          </div>
          
          
          ;
        }
      }
 

 export default Modal;