import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './D8Events.css';

class D8Events extends Component {

  state = {
    ourData: []
  };

  componentDidMount() {

    const feedURL = 'https://cors-anywhere.herokuapp.com/https://asuevents.asu.edu/feed-json/college-liberal-arts-and-sciences'
    axios.get(feedURL).then(response => {
          // console.log(response.data.nodes)
          this.setState({
            ourData: response.data.nodes,
          })
    })

  }

  render() {
    // console.log(this.state.ourData);
    var results = this.state.ourData.map(thisNode => ({ nid: thisNode.node.nid, title: thisNode.node.title, image_url: thisNode.node.image_url, start_date: thisNode.node.start_date, campus: thisNode.node.campus, interests: thisNode.node.interests, very_start_date: thisNode.node.very_start_date, very_end_date: thisNode.node.very_end_date, alias: thisNode.node.alias }));
    console.log(results);
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);

    // need 2018-07-07T19%3A30
    // have 2018-07-07
    // very_start_date: "2018-07-07T19:30:00Z",

    return (
      <div id="D8Events">

        <div className="container">

                  {results.map(( listNode, index ) => {
                    return(

                      <React.Fragment key={index}>

                        <div className="row d8EventRow">

                          <div className="d8EventDateContainer">
                            <span className="d8EventDateNumber">{moment(listNode.very_start_date).format('D')}</span>

                            <div className="d8DayOfWeekMonthContainer">
                              <span className="d8EventDayOfWeek">{moment(listNode.very_start_date).format('dddd')}</span>
                              <span className="d8EventMonth">{moment(listNode.very_start_date).format('MMMM')}</span>
                            </div>

                          </div>

                          <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">

                              <a href={`${listNode.alias}/?eventDate=${moment(listNode.very_start_date).format('YYYY-MM-DD')}`} target="_blank"><img src={listNode.image_url} alt={listNode.title} className="img-fluid d8EventImage" /></a>

                          </div>

                          <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 d8EventDetailsContainer">

                              <p className="d8EventTitle"><a href={`${listNode.alias}/?eventDate=${moment(listNode.very_start_date).format('YYYY-MM-DD')}`} target="_blank">{listNode.title}</a></p>
                              <p className="d8EventDetails">{moment(listNode.very_start_date).format('h:mm')} - {moment(listNode.very_end_date).format('h:mm')} | {listNode.campus} | {listNode.interests.replace(/\|/g, ", ")}</p>

                          </div>

                        </div>

                      </React.Fragment>

                    )
                  })}

        </div>
      </div>
    );
  }
}

export default D8Events;
