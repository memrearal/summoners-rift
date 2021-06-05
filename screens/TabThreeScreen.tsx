import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { parse } from 'node-html-parser';
import Component from '../components/Component';
import { Text, View } from '../components/Themed';

export default class PatchNotes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      patchNotes: []
    }
  }
  componentDidMount(){
    if(this.state.loading == true){
      fetch("https://na.leagueoflegends.com/en-us/news/tags/patch-notes").then((resp)=>{return resp.text()}).then((text)=>{
        const parsed = parse(text);
        var patchList = []
        parsed.querySelectorAll("a.gkCnQM").map((article, index)=>{
          patchList.push({
            title: article.querySelector(".jprNto").rawText,
            date: article.querySelector("time").attributes.dateTime,
            link: article.attributes.href
          });
        });
        this.setState({loading: false, patchNotes: patchList})
      });
    }
  }
  renderPatchNotes(){
    return this.state.patchNotes.map((patch, index)=>{
      var patchdate = new Date(patch.date);
      return(
        <Component title={patch.title}>
          <Text style={{marginBottom: 5, color:"#fff"}}>Patch Release Date : {((patchdate.getDate() > 9) ? patchdate.getDate() : ('0' + patchdate.getDate())) + '/' + (((patchdate.getMonth() > 8) ? (patchdate.getMonth() + 1) : ('0' + (patchdate.getMonth() + 1)))) + '/'+ patchdate.getFullYear()}</Text>
        </Component>
      );
    });
  }
  render(){
    return (
      <ScrollView style={styles.container}>
        {this.renderPatchNotes()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
