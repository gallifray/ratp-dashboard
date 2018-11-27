# [ratp-dashboard](https://ratp.gallifray.fr) `v0.6`


> #### Disclamer
> ratp-dashboard is a personal project. The only purpose of this application is to experiment React library, combined with RATP's API.
> 
> I have no affiliation with the RATP.

![](https://i.imgur.com/NtVGGBK.png)

## Global information

**ratp-dashboard** is a real-time dashboard for monitoring RATP's (public transport in Paris) network status.

The current version has the following functionalities:
* Monitoring RATP's global traffic status (homepage)
* For each line, a page displaying information about:
  * Its status (traffic)
  * Average wait time in stations on the line
  * Schedule of next passages by station

## Technologies used

This project was made using several technologies & APIs:
* [React.js](https://github.com/facebook/react): a Javascript framework for making dynamic apps
* [react-router](https://github.com/ReactTraining/react-router): a module to make routes and redirections in React apps
* [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React): a Javascript/CSS framework based around useful principles from natural language.
* [ratp-api-rest](https://github.com/pgrimaud/ratp-api-rest): a REST API made by [Pierre Grimaud](https://github.com/pgrimaud) to retreive data about the RATP network.

The website is hosted on [Netlify](https://www.netlify.com/).

## Possible improvements
* Handle *Bus* & *Noctilien* networks.
* Retreiving schedules for RERs, which currently doesn't work.
