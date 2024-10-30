import React, { Component } from 'react';
import Calendar from "./Calendar/Calendar";
import './D8Events.css';
import {validDate, formatTime} from './D8Utils';
import ReactHtmlParser from '../node_modules/react-html-parser';
import { intlFormat } from 'date-fns';

// class EventTimeSection extends Component {
//   return(
//     <span>{validDate(this.props.listNode.very_start_date, 'EEE')}, </span>
//     <span>{validDate(this.props.listNode.very_start_date, 'MMMM')} </span>
//     <span>{validDate(this.props.listNode.very_start_date, 'do')}</span>
//     <div>{formatTime(this.props.listNode.start_date, this.props.listNode.end_date)}</div>
//   );
// }

function EventTimeSection(props) {
  return (
    <><span>{validDate(this.props.listNode.very_start_date, 'EEE')}, </span>
    <span>{validDate(this.props.listNode.very_start_date, 'MMMM')} </span>
    <span>{validDate(this.props.listNode.very_start_date, 'do')}</span>
    <div>{formatTime(this.props.listNode.start_date, this.props.listNode.end_date)}</div></>
  );
}


class EventItemDefault extends Component {

  render() {
    //console.log(this.props.listNode);
    let time_section = (<><span>{validDate(this.props.listNode.very_start_date, 'EEE')}, </span>
    <span>{validDate(this.props.listNode.very_start_date, 'MMMM')} </span>
    <span>{validDate(this.props.listNode.very_start_date, 'do')}</span>
    <div>{formatTime(this.props.listNode.start_date, this.props.listNode.end_date)}</div></>);

    if (this.props.listNode.time_description != "") {
      let newTime = this.props.listNode.time_description.split('<br />');
      time_section = (<><div>{ ReactHtmlParser (newTime[0]) }</div></>);
    }
    //console.log(this.props.listNode.time_description);

    const timestamp = new Date(this.props.listNode.very_start_date);
    // let eventDate = timestamp.getDay() + ', ' + timestamp.getMonth() + ' ' + timestamp.getDate();
    const eventDay = new Intl.DateTimeFormat('en-US', {
      weekday: 'long'
    }).format(timestamp);
    const eventMonth = new Intl.DateTimeFormat('en-US', {
      month: 'long'
    }).format(timestamp);
    const eventTime = this.props.listNode.start_date.split(' - ')[1];
    console.log(eventTime);

    return (
      <div className="card cards-components card-event card-horizontal">
        <a href={this.props.listNode.alias_indexed} target='_blank'>
          <img className="card-img-top uds-img borderless" src={this.props.listNode.image_url} alt={this.props.listNode.title} loading='lazy' decoding='async'/>
          <span className="visually-hidden">{this.props.listNode.title}</span>
        </a>
        <div className="card-content-wrapper">
          <div className="card-header">
            <h3 className="card-title">
              <a href={`${this.props.listNode.alias_indexed}`} target="_blank">{this.props.listNode.title}</a>
              </h3>
          </div>
          <div className="card-event-details">
            <div className="card-event-icons">
              <div><i className="far fa-calendar"></i></div>
              <div>
                {eventDay + ', ' + eventMonth + ' ' + timestamp.getDate()}
                <br/>
                {eventTime}
              </div>
            </div>
            <div className="card-event-icons">
              <div><i className="fas fa-map-marker-alt"></i></div>
              <div>{this.props.listNode.locations ? <span>{this.props.listNode.locations} <br /></span> : <></>}{this.props.listNode.campus}</div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

class EventItemCard extends Component {



  render() {

    let time_section = (<><span>{validDate(this.props.listNode.very_start_date, 'EEE')}, </span>
    <span>{validDate(this.props.listNode.very_start_date, 'MMMM')} </span>
    <span>{validDate(this.props.listNode.very_start_date, 'do')}</span>
    <div>{formatTime(this.props.listNode.start_date, this.props.listNode.end_date)}</div></>);

    if (this.props.listNode.time_description != "") {
      let newTime = this.props.listNode.time_description.split('<br />');
      time_section = (<><div>{ ReactHtmlParser (newTime[0]) }</div></>);
    }

    return (

<div className="col col-12 col-lg-4">
      <div className="card card-event">
        <img className="card-img-top" src={this.props.listNode.image_url} alt={this.props.listNode.title} />
        <div className="card-header">
          <h3 className="card-title"><a href={`${this.props.listNode.alias_indexed}}`} target="_blank">{this.props.listNode.title}</a></h3>
        </div>
        <div className="card-event-details">
          <div className="card-event-icons">
            <div><i className="far fa-calendar"></i></div>
            <div>
              {this.props.listNode.start_date}
            </div>
          </div>
        </div>
        <div className="card-event-details">
          <div className="card-event-icons">
            <div><i className="fas fa-map-marker-alt"></i></div>
            <div>{this.props.listNode.locations}<br/>{this.props.listNode.campus}</div>
          </div>
        </div>
      </div>
</div>
    );
  }
}

class D8Events extends Component {

  state = {
    displayData: []
  };

  isMobile() {
    if(window.innerWidth <= 414 && window.innerHeight <= 825){
      return true;
    }
    return false
  }

  componentDidMount() {

    // const feedURL = 'https://cors-anywhere.herokuapp.com/https://asuevents.asu.edu/feed-json/college-liberal-arts-and-sciences'
    const feedData = this.props.dataFromPage.feed.split(",");
    const feedURL = feedData[0];
    const feedStyle = this.props.dataFromPage.items;
    const feedTags = feedData.shift();
    var feedTagsOr = [];
    var feedTagsNot = [];
    var feedTagsAnd = [];
    for (var i = 0; i < feedData.length; i++) {
      if (feedData[i].charAt(0) == "-") {
        feedTagsNot.push(feedData[i].substring(1).toLowerCase());
      }
      else if (feedData[i].charAt(0) == "&") {
        feedTagsAnd.push(feedData[i].substring(1).toLowerCase());
      }
      else if (feedData[i].charAt(0) == "+") {
        feedTagsOr.push(feedData[i].substring(1).toLowerCase());
      }
    }



    //console.log(feedData);

    fetch(feedURL).then(res=>res.json()).then(response=>{
      //console.log(response.nodes);
      var tempDisplayData = response.nodes;
      var finalDisplayData = [];
      //console.log(tempDisplayData);

      // Loop through feed nodes and flag them if certain tags are found
      for (var i = 0; i < tempDisplayData.length; i++) {
        tempDisplayData[i].flag = false;
        // Flag NOT tags
        //console.log(feedTagsNot);
        for (var j = 0; j < feedTagsNot.length; j++) {
          //console.log(tempDisplayData[i].node.interests);
          //console.log(feedTagsNot[j]);
          if( tempDisplayData[i].node.interests.toLowerCase().includes(feedTagsNot[j]) ) {
            tempDisplayData[i].flag = true;
            //console.log("FLAGGING NODE");
            //console.log(tempDisplayData[i]);
          }
          if( tempDisplayData[i].node.event_units.toLowerCase().includes(feedTagsNot[j]) ) {
            tempDisplayData[i].flag = true;
          }
          if( tempDisplayData[i].node.audiences.toLowerCase().includes(feedTagsNot[j]) ) {
            tempDisplayData[i].flag = true;
          }
        }

        // Flag AND tags
        //console.log(feedTagsAnd);
        for (var k = 0; k < feedTagsAnd.length; k++) {
          if( tempDisplayData[i].node.interests.toLowerCase().includes(feedTagsAnd[k]) == false && tempDisplayData[i].node.event_units.toLowerCase().includes(feedTagsAnd[k]) == false && tempDisplayData[i].node.audiences.toLowerCase().includes(feedTagsAnd[k]) == false ) {
            tempDisplayData[i].flag = true;
          }
        }

        if(tempDisplayData[i].flag == false) {
          finalDisplayData.push(tempDisplayData[i]);
        }

      }

      this.setState({
        displayData: finalDisplayData,
        displayStyle: feedStyle,
        displayNot: feedTagsNot,
      })

      //console.log(this.state);
    });

    /*
    axios.get(feedURL).then(response => {
          console.log(response.data.nodes);
          var tempDisplayData = response.data.nodes;
          var finalDisplayData = [];
          //console.log(tempDisplayData);

          // Loop through feed nodes and flag them if certain tags are found
          for (var i = 0; i < tempDisplayData.length; i++) {
            tempDisplayData[i].flag = false;
            // Flag NOT tags
            console.log(feedTagsNot);
            for (var j = 0; j < feedTagsNot.length; j++) {
              //console.log(tempDisplayData[i].node.interests);
              //console.log(feedTagsNot[j]);
              if( tempDisplayData[i].node.interests.toLowerCase().includes(feedTagsNot[j]) ) {
                tempDisplayData[i].flag = true;
                //console.log("FLAGGING NODE");
                //console.log(tempDisplayData[i]);
              }
              if( tempDisplayData[i].node.event_units.toLowerCase().includes(feedTagsNot[j]) ) {
                tempDisplayData[i].flag = true;
              }
              if( tempDisplayData[i].node.audiences.toLowerCase().includes(feedTagsNot[j]) ) {
                tempDisplayData[i].flag = true;
              }
            }

            // Flag AND tags
            console.log(feedTagsAnd);
            for (var k = 0; k < feedTagsAnd.length; k++) {
              if( tempDisplayData[i].node.interests.toLowerCase().includes(feedTagsAnd[k]) == false && tempDisplayData[i].node.event_units.toLowerCase().includes(feedTagsAnd[k]) == false && tempDisplayData[i].node.audiences.toLowerCase().includes(feedTagsAnd[k]) == false ) {
                tempDisplayData[i].flag = true;
              }
            }

            if(tempDisplayData[i].flag == false) {
              finalDisplayData.push(tempDisplayData[i]);
            }

          }

          this.setState({
            displayData: finalDisplayData,
            displayStyle: feedStyle,
            displayNot: feedTagsNot,
          })

          console.log(this.state);

    })
    */

  }

  render() {
    var results = this.state.displayData.map(thisNode => ({ nid: thisNode.node.nid, title: thisNode.node.title, image_url: thisNode.node.image_url, start_date: thisNode.node.start_date, end_date: thisNode.node.end_date, campus: thisNode.node.campus, interests: thisNode.node.interests, very_start_date: thisNode.node.very_start_date, very_end_date: thisNode.node.very_end_date, alias: thisNode.node.alias, alias_indexed: thisNode.node['alias-indexed'], locations: thisNode.node.locations, time_description: thisNode.node.time_description }));

    //console.log(results[0]);
    //console.log(results[1]);
    //console.log(results[2]);


    //console.log(results, "beep boop beep");

    // need 2018-07-07T19%3A30
    // have 2018-07-07
    // very_start_date: "2018-07-07T19:30:00Z",

    switch(this.state.displayStyle) {

      case "Three":
        return (
          <div className="container D8News">
            {results.slice(0,3).map(( listNode, index ) => {
              return(
                <React.Fragment key={index}>
                  <EventItemDefault listNode = {listNode} />
                </React.Fragment>
              )
            })}
          </div>
        )
      break;

      case "Calendar":
        return (

             <main>
              <Calendar isMobile={this.isMobile.bind(this)} results={results}/>
            </main>
      );

      case "ThreeCards":
        return (
          <div className="container D8News">
          <div className="row">
            {results.slice(0,3).map(( listNode, index ) => {
              return(
                <React.Fragment key={index}>
                  <EventItemCard listNode = {listNode} />
                </React.Fragment>
              )
            })}
          </div>
          </div>
        )
      break;

      default:
        return (
          <div className="container">
            {results.map(( listNode, index ) => {
              return(
                <React.Fragment key={index}>
                  <EventItemDefault listNode = {listNode} />
                </React.Fragment>
              )
            })}
          </div>
        );

    }


  }
}

export default D8Events;
