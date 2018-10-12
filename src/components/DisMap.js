import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import axios from 'axios'
// import FourSquare from '../API/FourSquare'
// import MyPlaces from './MyPlaces';

class DisMap extends Component {
  constructor(props) {
      super(props);
      this.state = {
        favPlaces: [ // Our Favorite DW Places
          {name: "Splash Mountain", venueid: "4b901bfff964a5202e7633e3", message: "Morgan's Favorite Ride - Rode it 9 times!", location: {lat: 28.419425, lng: -81.585062}},
          {name: "Space Mountain", venueid: "4b099894f964a520141a23e3", message: "My Fave Ride", location: {lat: 28.419278, lng: -81.578037}},
          {name: "Haunted Mansion", venueid: "4b099894f964a520141a23e3", message: "Spooky Fun!", location: {lat: 28.420424, lng: -81.582883}},
          {name: "Cinderella's Royal Table", venueid: "4b994d2af964a520607135e3", message: "Fancy Food", location: {lat: 28.419722, lng: -81.581232}},
          {name: "Be Our Guest", venueid: "4db98498cda10f31e62de917", message: "Try the Grey Stuff--it's delicious!", location: {lat: 28.421364, lng: -81.580714}},
        ],
        markers: [],
        query: '', // Do I need query?
        // venues: [], // Keep for now, may not need this
        // map: '',
        infowindow: '',
        prevmarker: ''
      };
      // this.initMap = this.initMap.bind(this); // have this in initMap as well
      // this.openInfoWindow = this.openInfoWindow.bind(this);
      // this.closeInfoWindow = this.closeInfoWindow.bind(this);
}  
  
  componentDidMount() {
    scriptSrc()
    this.getVenues()
    window.initMap = this.initMap
    /*
    FourSquare.search({
      near: "Disney World",
      query: "food",
      limit: 5
    }).then(results => console.log(results));
    */
  }  

  initMap = () => {

    const google = window.google
    // Use this code if I want to add a style from Snazzy Maps:
    // const styles = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#454a4e"},{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"},{"color":"#1b1d1e"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#db611d"},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#1b1d1e"},{"lightness":"-2"},{"gamma":"1"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#1b1d1e"},{"lightness":"-2"},{"gamma":"1"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#1b1d1e"},{"lightness":"5"},{"gamma":"1"},{"weight":"0.20"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1b1d1e"},{"lightness":29},{"weight":0.2},{"gamma":"1"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#1b1d1e"},{"lightness":"5"},{"gamma":"1"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#1b1d1e"},{"lightness":"12"},{"gamma":"1"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#1b1d1e"},{"lightness":"3"},{"gamma":"1"}]}]

    // create a map 
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 28.41772, lng: -81.581212},
      zoom: 15,
      // styles: styles,
      mapTypeId: 'terrain' 
    });

    let infowindow = new google.maps.InfoWindow()

    this.state.favPlaces.forEach((location, ind) => {

      const marker = new google.maps.Marker({
          position: {lat: location.location.lat, lng: location.location.lng},
          map: map,
          title: location.name, 
          animation: window.google.maps.Animation.DROP,
          // When the time is right to try to add a custom icon:
          // icon: './Map_marker_icon_–_Nicolas_Mollet_–_Ghost_–_Events_–_Dark.png'
        })

        let contentString = `${location.name}</h3><h4>This place rocks!</h4>${location.message}`

        marker.addListener('click', function() {
          infowindow.setContent(contentString) // contentString
          infowindow.open(map, marker,) 
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
              setTimeout(function(){ marker.setAnimation(null);}, 750); // , 750 -- set to null in closeWindow Function below
          // this.openInfoWindow(marker);    
        });
         
      });
        this.setState({
          favPlaces: this.favPlaces
        });
  }

getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "",
      client_secret: "",
      query: "food",
      ll: "28.417729,  -81.581212",
      v: "20181007"
    }
    // Run: npm install axios
    axios.get(endPoint + new URLSearchParams(parameters)) 
      .then(response => {
        this.setState({
          favPlaces: response.data.response.groups[0].items
        }, 
        console.log(response))
      })
      .catch(error => {
        console.log("Error: " + error)
      })
}  
  
  render() {
    return (
        <div>
            
        </div>
    );
}
}

function scriptSrc() {
    let index = window.document.getElementsByTagName("script")[0]
    let script = window.document.createElement("script")
    script.src = 'https://maps.googleapis.com/maps/api/js?key=&callback=initMap'
    script.async = true
    script.defer = true
    script.onerror = function() {
        document.write("Error: Google Maps can't be loaded");
    }
    index.parentNode.insertBefore(script, index)
}
    
export default DisMap
