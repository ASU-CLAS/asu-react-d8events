import React, { Component } from 'react';
import { format } from 'date-fns'


export const validDate = (dateData, dateFormat) => {
  let returnDate = new Date(dateData)

  if(returnDate !== "Invalid Date") {
    returnDate = format(returnDate, dateFormat);
  }
  else {
    returnDate = "";
  }
  return returnDate;
}

//adjusted for D8
export const formatTime = (startTime, endTime) => {
  if(startTime === endTime) {
    return startTime;
  }
  else {
    return startTime + " - " + endTime;
  }
}

