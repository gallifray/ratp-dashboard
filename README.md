# [ratp-dashboard](https://ratp.gallifray.fr) `v0.6`


> #### Disclamer
> ratp-dashboard is a personal project. The only purpose of this application is to experiment React library, combined with RATP's API.
> 
> I have no affiliation with the RATP.

![](https://i.imgur.com/3saxFZM.png)


## Global information

**ratp-dashboard** is a real-time dashboard for monitoring RATP's (public transport in Paris) network status.

The current version has the following functionalities:
* Monitoring RATP's global traffic status (homepage)
* For each line, a page displaying information about:
  * Its status (traffic)
  * Average wait time in stations on the line
  * Schedule of next passages by station

## Technologies used

<img src="https://i.imgur.com/oUHcPlO.png" alt="drawing" width="150"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://i.imgur.com/pPQ8RXM.png" alt="drawing" width="100"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://i.imgur.com/JC2Qqmg.png" alt="drawing" width="100"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://i.imgur.com/C5u8ZIa.png" alt="drawing" width="100"/>


This project was made using several technologies & APIs:
* [React.js](https://github.com/facebook/react): a Javascript framework for making dynamic apps
* [react-router](https://github.com/ReactTraining/react-router): a module to make routes and redirections in React apps
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React): a Javascript/CSS framework based around useful principles from natural language.
* [ratp-api-rest](https://github.com/pgrimaud/ratp-api-rest): a REST API made by [Pierre Grimaud](https://github.com/pgrimaud) to retreive data about the RATP network.

The website is hosted on [Netlify](https://www.netlify.com/).

## Possible improvements
* Handle *Bus* & *Noctilien* networks.
* Retreiving schedules for RERs, which currently doesn't work.
* Statistics through time.

# Experimental
Beside the website https://ratp.gallifray.fr/, I developped desktop versions of ratp-dashboard.
There are currently builds for Linux & macOS, Windows version will be released soon...
See: [**ratp-dashboard-electron**](https://github.com/gallifray/ratp-dashboard-electron/releases)

**Keep in mind that these apps are on an experimental phase and may not be stable.**
