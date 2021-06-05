import React from 'react';
import { View, Image, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
export default class ItemsCard extends React.Component {
  constructor(props){
    super(props);
  }
  renderItems(){
    if(this.props.items.length > 0){
      return this.props.items.map((component, index) => {
        return(
          <View key={"Items"+index} style={styles.content}>
            <Image
              style={styles.img}
              source={{uri: "https://mobafire.com"+component.img}}
            />
          </View>
        );
      });
    }
  }
  render() {
    return(
      <View style={styles.container}>
        {this.renderItems()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap:'nowrap',
    flexDirection: 'row',
  },
  content: {
    borderColor: "rgb(194, 143, 44)",
    borderWidth: 1,
    marginRight: 5
  },
  img: {
    width: Dimensions.get("window").width / 8,
    height: Dimensions.get("window").width / 8
  }
});