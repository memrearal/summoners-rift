import React from 'react';
import { View, Image, ImageBackground, Text, StyleSheet } from 'react-native';
export default class ChampionCard extends React.Component {
  constructor(props){
    super(props);
  }
  getRoles(roles){
    return roles.map((x, index) => {
      if(x == "top"){
        return (<Image key={index} source={require('../assets/images/top.png')} style={{height: 18, width: 18}} />);
      }else if(x == "mid"){
        return (<Image key={index} source={require('../assets/images/mid.png')} style={{height: 18, width: 18}} />);
      }else if(x=="bot"){
        return (<Image key={index} source={require('../assets/images/bot.png')} style={{height: 18, width: 18}} />);
      }else if(x=="sup"){
        return (<Image key={index} source={require('../assets/images/sup.png')} style={{height: 18, width: 18}} />);
      }else if(x=="jung"){
        return (<Image key={index} source={require('../assets/images/jung.png')} style={{height: 18, width: 18}} />);
      }else{
        return;
      }
    });
  }
  render(){
    const item = this.props.item;
    return(
      <ImageBackground source={{uri: item.img}} style={[styles.container, {width: this.props.width}]}>
        <View style={styles.content}>
          <Text style={styles.text}>
            {item.name.trim()}
          </Text>
          <Text style={styles.subtext}>
            {item.desc.charAt(0).toUpperCase() + item.desc.slice(1)}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {height: 200},
  content: {marginTop: 150, backgroundColor: "#000000a0",height: 50,flexDirection: "column"},
  desc: {
    marginLeft: 12,
    fontSize: 16,
    color: 'white'
  },
  text: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#d0a85c',
    textAlign: 'center'
  },
  subtext: {
    fontSize: 10,
    color: '#d0a85c',
    textAlign: "center"
  },
});
