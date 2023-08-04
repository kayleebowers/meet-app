"use strict";

//add required packages
const { google } = require("googleapis");
const calendar = google.calendar("v3");

//set access levels (include all scopes passed in Google console)
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

//get variables from config.json
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
  "https://kayleebowers.github.io/meet-app/"
];

//create new instance of google.auth.OAuth2 and accept params
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

//create and export getAuthURL
module.exports.getAuthURL = async () => {
  // generate authentication URL from Google API using instance stored in oAuth2Client
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

// create and export getAccessToken
module.exports.getAccessToken = async (event) => {
  // decode auth code from URL above
  const code = decodeURIComponent(`${event.pathParameters.code}`);
  
  return new Promise((resolve, reject) => {
    // exchange authorization code for access token
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      } 
      return resolve(response);
    });
  }).then((results) => {
    // Respond with OAuth token 
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }, 
      body: JSON.stringify(results)
    }
  }).catch((error) => {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  })
}

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    }, 
    body: JSON.stringify({
      authUrl
    })
  };
};