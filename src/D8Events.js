import React, { Component } from 'react';
import Calendar from "./Calendar/Calendar";
import './D8Events.css';
import {validDate, formatTime} from './D8Utils';
import ReactHtmlParser from '../node_modules/react-html-parser';
import Loader from 'react-loader-spinner';
import { Fade } from 'react-reveal';
import InfiniteScroll from 'react-infinite-scroll-component';

function EventTimeSection(props) {
  return <>
      <span>{validDate(props.listNode.very_start_date, 'EEE')}, </span>
      <span>{validDate(props.listNode.very_start_date, 'MMMM')} </span>
      <span>{validDate(props.listNode.very_start_date, 'do')}</span>
      <div>{formatTime(props.listNode.start_date, props.listNode.end_date)}</div>
    </>;
}


class EventItemDefault extends Component {

  render() {
    let time_section = (<><span>{validDate(this.props.listNode.very_start_date, 'EEE')}, </span>
    <span>{validDate(this.props.listNode.very_start_date, 'MMMM')} </span>
    <span>{validDate(this.props.listNode.very_start_date, 'do')}</span>
    <div>{formatTime(this.props.listNode.start_date, this.props.listNode.end_date)}</div></>);

    if (this.props.listNode.time_description != "") {
      let newTime = this.props.listNode.time_description.split('<br />');
      time_section = (<><div>{ ReactHtmlParser (newTime[0]) }</div></>);
    }
    const timestamp = new Date(this.props.listNode.very_start_date);
    const eventDay = new Intl.DateTimeFormat('en-US', {
      weekday: 'long'
    }).format(timestamp);
    const eventMonth = new Intl.DateTimeFormat('en-US', {
      month: 'long'
    }).format(timestamp);
    const eventTime = this.props.listNode.start_date.split(' - ')[1];

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
  constructor(props) {
    super(props);
    this.state = {
      displayData: [],
      loadedData: [],
      isLoaded: false,
      callErr: false,
      errMsg: '',
      hasMore: true,
      results: []
    }
  }

  isMobile() {
    if(window.innerWidth <= 414 && window.innerHeight <= 825){
      return true;
    }
    return false
  }

  componentDidMount() {

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

    fetch(feedURL).then(res=>res.json()).then(response=>{
      var tempDisplayData = response.nodes;
      var finalDisplayData = [];

      // Loop through feed nodes and flag them if certain tags are found
      for (var i = 0; i < tempDisplayData.length; i++) {
        tempDisplayData[i].flag = false;
        // Flag NOT tags
        for (var j = 0; j < feedTagsNot.length; j++) {
          if( tempDisplayData[i].node.interests.toLowerCase().includes(feedTagsNot[j]) ) {
            tempDisplayData[i].flag = true;
          }
          if( tempDisplayData[i].node.event_units.toLowerCase().includes(feedTagsNot[j]) ) {
            tempDisplayData[i].flag = true;
          }
          if( tempDisplayData[i].node.audiences.toLowerCase().includes(feedTagsNot[j]) ) {
            tempDisplayData[i].flag = true;
          }
        }

        // Flag AND tags
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
        loadedData: finalDisplayData.slice(0,10),
        displayStyle: feedStyle,
        displayNot: feedTagsNot,
        isLoaded: true
      })
      this.setState({
        results: this.state.loadedData.map(thisNode => ({ nid: thisNode.node.nid, title: thisNode.node.title, image_url: thisNode.node.image_url, start_date: thisNode.node.start_date, end_date: thisNode.node.end_date, campus: thisNode.node.campus, interests: thisNode.node.interests, very_start_date: thisNode.node.very_start_date, very_end_date: thisNode.node.very_end_date, alias: thisNode.node.alias, alias_indexed: thisNode.node['alias-indexed'], locations: thisNode.node.locations, time_description: thisNode.node.time_description }))
      })
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        this.setState({
          isLoaded: true,
          callErr: true,
          errMsg: 'Server responded with status: ' + error.response.status
        })
      } else if (error.request) {
        console.log(error.request);
        this.setState({
          isLoaded: true,
          callErr: true,
          errMsg: 'Server did not respond'
        })
      }
      else {
        console.log('Error', error.message);
        this.setState({
          isLoaded: true,
          callErr: true,
          errMsg: 'Error: ' + error.message
        })
      }
    });
  }

  fetchMoreData = () => {
    if (this.state.loadedData.length >= this.state.displayData.length || this.state.loadedData.length >= 50) {
      this.setState({hasMore: false});
      return;
    }
    let loadedLength = this.state.loadedData.length;
    setTimeout(() => {
      this.setState({
        loadedData: this.state.loadedData.concat(this.state.displayData.slice(loadedLength, loadedLength+10))
      });
      this.setState({
        results: this.state.loadedData.map(thisNode => ({ nid: thisNode.node.nid, title: thisNode.node.title, image_url: thisNode.node.image_url, start_date: thisNode.node.start_date, end_date: thisNode.node.end_date, campus: thisNode.node.campus, interests: thisNode.node.interests, very_start_date: thisNode.node.very_start_date, very_end_date: thisNode.node.very_end_date, alias: thisNode.node.alias, alias_indexed: thisNode.node['alias-indexed'], locations: thisNode.node.locations, time_description: thisNode.node.time_description }))
      });
    }, 500)
  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <div className="loader w-100 text-center">
          <Loader type="ThreeDots" color="#5C6670" height={100} width={100} />
        </div>
      )
    } else if (this.state.callErr && this.state.isLoaded ) {
      return (
        <Fade>
          <div className='errorContainer'>
            <div className='errorTitle h3'>Oops! Looks like the ASU Now News Feed could not be loaded.</div>
            <p className='errorCode'>{this.state.errMsg}</p>
          </div>
        </Fade>
      )
    } else {
      switch(this.state.displayStyle) {

        case "Three":
          return (
            <div className="container D8News">
              {this.state.results.slice(0,3).map(( listNode, index ) => {
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
                <Calendar isMobile={this.isMobile.bind(this)} results={this.state.results}/>
              </main>
        );

        case "ThreeCards":
          return (
            <div className="container D8News">
            <div className="row">
              {this.state.results.slice(0,3).map(( listNode, index ) => {
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
              <InfiniteScroll
                dataLength={this.state.loadedData.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<div className="loader w-100 text-center">
          <Loader type="ThreeDots" color="#5C6670" height={100} width={100} />
        </div>}
                endMessage={<div></div>}
              >
                {this.state.results.map((listNode, index) => {
                  return(
                    <React.Fragment key={index}>
                      <EventItemDefault listNode={listNode} />
                    </React.Fragment>
                  )
                })}
              </InfiniteScroll>
            </div>
          );
    }
  }


  }
}

export default D8Events;


