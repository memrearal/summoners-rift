import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Component from '../components/Component';
import { Text, View } from '../components/Themed';

export default class PatchNoteScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount(){
    if(this.state.loading == true){
      this.setState({loading: false})
    }
  }
  render(){
    return (
      <ScrollView style={styles.container}>
        <Text>Hey!</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
