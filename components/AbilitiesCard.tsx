import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
export default class AbilitiesCard extends React.Component {
  constructor(props){
    super(props);
  }
  renderAbilities(){
    if(this.props.cards.length > 0){
      return this.props.cards.map((component, index) => {
        return(
          <View key={"AbilityCard"+index} style={index != this.props.cards.length-1 ? styles.content : styles.contentLast}>
            <View style={styles.imageContainer}>
              <Image
                style={{width: 64, height:64}}
                source={{uri: "https://mobafire.com"+component.img}}
              />
            </View>
            <View style={styles.contentInner}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{component.key+" - "+component.name.replace("&#039;","'")}</Text>
                <View style={styles.row}>
                  <Text style={styles.bold}>Cost: </Text>
                  <Text style={styles.subtitle}>{component.cost}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.bold}>Cooldown: </Text>
                  <Text style={styles.subtitle}>{component.cooldown}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      });
    }
  }
  render() {
    return(
      <View style={styles.container}>
        <View>{this.renderAbilities()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    color: 'white',
  },
  content: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(194, 143, 44)",
    flexDirection:'row',
    color: 'white'
  },
  contentLast: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection:'row',
    color: 'white'
  },
  contentInner: {
    alignSelf:'stretch',
    paddingHorizontal:10,
    flexDirection:'column',
    color: 'white'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    color: 'white'
  },
  row: {
    flexDirection: "row"
  },
  bold: {
    fontWeight:"bold",
    color: "#fff"
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    color: 'white',
    flexWrap:'wrap'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    color: 'black'
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray',
    color: 'white'
  },
});