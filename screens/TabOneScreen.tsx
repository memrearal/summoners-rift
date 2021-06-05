import * as React from 'react';
import { StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { parse } from 'node-html-parser';
import ChampionCard from '../components/ChampionCard';
export default class TabOneScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      champions: [],
      loading: true,
    }
  }
  componentDidMount(){
    if(this.state.loading == true){;
      var championsUrl = fetch("https://www.mobafire.com/league-of-legends/champions").then((resp)=>{return resp.text()}).then((text)=>{
        const parsed = parse(text);
        var htmlDoc = parsed.querySelectorAll(".champ-list__item");
        var islem = 0;
        var kalan = htmlDoc.length;
        const championsList = [];
        htmlDoc.forEach(function(key){
          islem++;
          var ChampionUrl = key.attributes.href;
          var ChampionName = key.querySelector(".champ-list__item__name").childNodes[1].childNodes[0].rawText;
          var ChampionDesc = key.querySelector(".champ-list__item__name").childNodes[3].childNodes[0].rawText;
          var ChampionRole = []
          var CRole = key.querySelector(".champ-list__item__role").childNodes;
          if(CRole.length == 7){
            ChampionRole.push(CRole[5].childNodes[0].rawText);
          }else if(CRole.length == 10){
            ChampionRole.push(CRole[8].childNodes[1].rawText);
            ChampionRole.push(CRole[8].childNodes[0].rawText);
          }else if(CRole.length == 13){
            ChampionRole.push(CRole[11].childNodes[0].rawText);
            ChampionRole.push(CRole[11].childNodes[1].rawText);
            ChampionRole.push(CRole[11].childNodes[2].rawText);
          }else if(CRole.length == 16){
            ChampionRole.push(CRole[14].childNodes[0].rawText);
            ChampionRole.push(CRole[14].childNodes[1].rawText);
            ChampionRole.push(CRole[14].childNodes[2].rawText);
            ChampionRole.push(CRole[14].childNodes[3].rawText);
          }
          var ChampionPriceRP = key.querySelector(".champ-list__item__rp").rawText;
          var ChampionPriceIP = key.querySelector(".champ-list__item__ip").rawText;
          var ChampionPickPoint = key.querySelector(".champ-list__item__pickP").rawText;
          var ChampionWinPoint = key.querySelector(".champ-list__item__winP").rawText;
          var ChampionBanPoint = key.querySelector(".champ-list__item__banP").rawText;
          var ChampionDamage = key.querySelector(".radial-stats").childNodes[1].attributes.rating;
          var ChampionToughness = key.querySelector(".radial-stats").childNodes[3].attributes.rating;
          var ChampionCrowdControl = key.querySelector(".radial-stats").childNodes[5].attributes.rating;
          var ChampionMobility = key.querySelector(".radial-stats").childNodes[7].attributes.rating;
          var ChampionUtility = key.querySelector(".radial-stats").childNodes[9].attributes.rating;
          var ChampionPhoto = "https://www.mobafire.com"+key.querySelector(".champ-list__item__pic").childNodes[3].attributes.src;
          championsList.push({
            name: ChampionName.replace("&#039;", "'").replace("&amp;", "&"),
            desc: ChampionDesc.replace("&#039;", "'").replace("&amp;", "&"),
            roles: ChampionRole,
            img: ChampionPhoto,
            url: ChampionUrl,
            prices: {
              rp: ChampionPriceRP,
              ip: ChampionPriceIP
            },
            points: {
              pick: ChampionPickPoint,
              win: ChampionWinPoint,
              ban: ChampionBanPoint
            },
            stats: {
              damage: ChampionDamage,
              toughness: ChampionToughness,
              crowdControl: ChampionCrowdControl,
              mobility: ChampionMobility,
              utility: ChampionUtility
            }
          });
        });
        if(islem == kalan){
          this.setState({champions: championsList, loading: false});
        }
      });
    }
  }
  componentWillUnmount() {
      this.setState = (state,callback)=>{
          return;
      };
  }
  getChampions(){
    const itemWidth = Dimensions.get("window").width / 3;
    return this.state.champions.map((item, index) => {
      return(
        <TouchableOpacity style={styles.item} onPress={()=>{this.props.navigation.push("ChampionInfo", {id: item.url, data: item});}} activeOpacity={0.6} key={index}>
          <ChampionCard item={item} width={itemWidth} />
        </TouchableOpacity>
      );
    });
  }
  render(){
    if(this.state.loading == true){
      return(
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content} style={{flex:1}}>
            {this.getChampions()}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  content: {backgroundColor:"black",flexWrap: 'wrap',flexDirection: 'row'},
  item: {}
});
