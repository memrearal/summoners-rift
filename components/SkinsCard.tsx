import React from 'react';
import { View, ImageBackground, TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';
export default class SkinsCard extends React.Component {
  constructor(props){
    super(props);
  }
  renderSkins(){
    if(this.props.skins.length > 0){
      return this.props.skins.map((component, index) => {
        return(
          <ImageBackground source={{uri: "https://mobafire.com"+component.img}} key={"Skin"+index} style={styles.skin}>
           <View style={styles.content}>
              <Text style={styles.text}>
                {component.name.trim()}
              </Text>
              <Text style={styles.subtext}>
                RP: {component.cost.trim()}
              </Text>
            </View>
          </ImageBackground>
        );
      });
    }
  }
  render() {
    return(
      <View style={styles.container}>
        {this.renderSkins()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flexDirection: "row",flexWrap: "wrap"},
  skin: {
    height: 250, width: (Dimensions.get("window").width/4)+20, margin: 5
  },
  content: {marginTop: 220, borderRadius:2, backgroundColor: "#000000a0",height: 30,width: (Dimensions.get("window").width/4)+20,flexDirection: "column"},
  desc: {
    marginLeft: 10,
    fontSize: 10,
    color: 'white'
  },
  text: {
    fontSize: 10,
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
