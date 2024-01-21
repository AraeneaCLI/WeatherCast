import React, { Component } from "react";
import {StyleSheet, Text, View, TextInput, ImageBackground } from "react-native";

import Forecast from "./src/forecast"
import OpenWeatherMap from "./src/openweathermap"

class WeatherProject extends Component {
   constructor(props){
     super(props);
     this.state = {zip : "", forecast:null };
   }

   _handleTextChange = event => {
     let zip = event.nativeEvent.text;
     OpenWeatherMap.fetchForecast(zip).then(forecast => {
       console.log(forecast);
       this.setState({forecast:forecast});
     });
   };

   render(){
     let content = null;
     if(this.state.forecast !== null){
       content = (
         <Forecast
           main={this.state.forecast.main}
           description={this.state.forecast.description}
           temp={this.state.forecast.temp}
         />
       );
     }
     return(
     <ImageBackground
       source={require("./assets/bg.jpeg")}
       resizeMode="cover"
       style={styles.backdrop}
     >
       <View style={styles.container}>
         <Text style={styles.welcome}>
           You Input {this.state.zip}.
         </Text>
         <TextInput
           style={styles.input}
           onSubmitEditing={this._handleTextChange}
         />
         {content}
       </View>
     </ImageBackground>
     );
   }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems: "center",
  },

  welcome:{
    fontSize:20,
    textAlign:"center",
    margin:10
  },

  input: {
   fontSize: 20,
   borderWidth: 2,
   padding: 2,
   height: 40,
   width: 100,
   textAlign: "center"
   },

   backdrop:{
    flex:1,
    flexDirection:"column"
   }
});

export default WeatherProject;