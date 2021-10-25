import React from "react";
import Modal from "./Modal"
import ReactDOM from 'react-dom';
import {format, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, isSameDay, parse, addMonths, parseISO, subMonths} from "date-fns";

class Calendar extends React.PureComponent {

  constructor() {
    super();
    this.renderCells = this.renderCells.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.onClose = this.onClose.bind(this);

  }
    state = {
      currentMonth: new Date(),
      selectedDate: undefined,
      selectedEvents: [],
      showModal: false
    };

    /*isMobile() {
      if(window.innerWidth <= 414 && window.innerHeight <= 825){
        return true;
      }
      return false
    }*/

  
    renderHeader() {
      const dateFormat = "MMMM yyyy";

  
   
      return (
        <div className="header row flex-middle">
          <div className=" col-center">
            <span className="month-year-block">{format(this.state.currentMonth, dateFormat)}</span>
          </div>

        </div>
      );
    }
  
    renderDays() {

      let dateFormat = "EEEE";
      const days = [];

      //render days of the week
  
      let startDate = startOfWeek(this.state.currentMonth);
  
      for (let i = 0; i < 7; i++) {
        if (!this.props.isMobile()) {
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
          </div>
          );
        }
        else {
          dateFormat = "EEE";
          days.push(
            <div className="col col-center" key={i}>
              {format(addDays(startDate, i), dateFormat)}
            </div>
            );
        }
      }
  
      return <div className="days row">{days}</div>;
    }
  
    renderCells() {
      const { currentMonth, selectedDate } = this.state;
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(monthStart);
      const startDate = startOfWeek(monthStart);
      const endDate = endOfWeek(monthEnd);
  
      const dateFormat = "d";
      const rows = [];
  
      let days = [];
      let day = startDate;
      let formattedDate = "";      

      //renders visual aids for days that contain events. sameDayBoolean iterates through the list of events and returns "true" for all events that match a certain day, and 
      //returns the array of events that is passed to the modal

      let eventDays = this.props.results.map(events => parseISO(events.very_end_date));
      let sameDayBoolean = (date, array) => array.some(d => isSameDay(date, d))
        
      while (day <= endDate) {
   
        for (let i = 0; i < 7; i++) {

          formattedDate = format(day, dateFormat);
          const cloneDay = day;
          days.push(
            <div
              className={`col cell ${
                !isSameMonth(day, monthStart)
                  ? "disabled"
                  : sameDayBoolean(day, eventDays) ? "event-date"
                  : isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day}
              onClick={ () => {this.onDateClick(cloneDay)}}
            >
              <p className="number">{formattedDate}</p>
              
            </div>
          );

          
          if (isSameDay(day, eventDays[0])) {
           // eventDays.shift();
           // console.log("shift testing");
          }
          day = addDays(day, 1);
        }
       
        
        rows.push(
          <div className="row" key={day}>
            {days}
          </div>
        );
        days = [];
      }
  
      return <div className="body">{rows}</div>;
    }
  
    onDateClick = day => {
      let eventArray = [];
      let eventResults = this.props.results;

      // build array for all events with dates that match the selected date
      for (let i = 0; i < eventResults.length; i++){

          if (isSameDay(day, parseISO(eventResults[i].very_end_date))){
            eventArray.push(eventResults[i])
          }
      } 

      if (eventArray.length === 0){

        return;

        } else {
        // sets state to events list that matches the selected date, and renders modal component
        this.setState({
          selectedEvents: eventArray,
          showModal: true
  
        })

      }
     
    };

    onClose = e => {
      this.setState({
        showModal: !this.state.showModal
      })
      
    };

    nextMonth = () => {
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      });
    };
  
    prevMonth = () => {
      this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1)
      });
    };

    renderFooter() {
      return (
        <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => this.prevMonth()}>
              chevron_left
          </div>
        </div>
          

        <div className="col col-end" onClick={() => this.nextMonth()}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
      )
    }
  
    render() {

      console.log(this.state.showModal);
      return (
        <div>
          
         
          
           <div className="calendar">
             <div id="modal">{this.state.showModal ? <Modal events={this.state.selectedEvents} close={this.onClose}/> : ''}</div>
             {this.renderHeader()}
             {this.renderDays()}
             {this.renderCells()}
         
             {this.renderFooter()}
           </div>
        </div>
      );
    }
  }


export default Calendar;