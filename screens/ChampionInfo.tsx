import * as React from 'react';
import { StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import AbilitiesCard from '../components/AbilitiesCard';
import ItemsCard from '../components/ItemsCard';
import Component from '../components/Component';
import AbilityOrderCard from '../components/AbilityOrderCard';
import SkinsCard from '../components/SkinsCard';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {parse} from 'node-html-parser';
export default class ChampionInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      info: null,
      items: [],
      startItems: [],
      abilities: [],
      skins: [],
      height: 500
    }
  }
  componentDidMount(){
    if(this.state.loading == true){
      fetch("https://www.mobafire.com"+this.props.route.params.id).then((resp)=>{return resp.text()}).then((text)=>{
        const parsed = parse(text);
        var abilitieList = [];
        var abilitiesParsed = parsed.querySelectorAll(".champ__abilities__item").map(function(key, index){
          if(key.querySelector(".champ__abilities__item__letter") == null){
            var AbilityKey = "PASSIVE";
          }else{
            var AbilityKey = key.querySelector(".champ__abilities__item__letter").rawText;
          }
          var AbilityName = key.querySelector(".champ__abilities__item__name").childNodes[0].rawText;
          var AbilityImage = key.querySelector(".champ__abilities__item__pic").childNodes[1].attributes.src;
          var AbilityCost = key.querySelector(".champ__abilities__item__cost").rawText;
          if(AbilityCost.trim() == ""){
            AbilityCost = "0";
          }
          var AbilityRange = key.querySelector(".champ__abilities__item__range").rawText;
          var AbilityCoolDown = key.querySelector(".champ__abilities__item__cooldown").rawText;
          if(AbilityCoolDown.trim() == ""){
            AbilityCoolDown = "0";
          }
          var AbilityDesc = key.querySelector(".champ__abilities__item__desc").rawText;
          abilitieList.push({
            name: AbilityName.trim(),
            key: AbilityKey.trim(),
            img: AbilityImage.trim(),
            cost: AbilityCost.trim(),
            range: AbilityRange.trim(),
            cooldown: AbilityCoolDown.trim(),
            desc: AbilityDesc.trim()
          });
        });
        var itemsList = [];
        var itemsParsed = parsed.querySelectorAll(".champ-build__item--luxury").map((key, index)=>{
          if(index == 0 || index == 1 || index == 2 || index == 5 || index == 6 || index == 7){
            var data = {
              name: key.querySelector("span").rawText,
              img: key.querySelector("img").attributes.src
            };
            if(itemsList.indexOf(data) == -1){
              itemsList.push(data);
            }
          }
        });
        var startItems = [];
        var totemParsed = parsed.querySelectorAll(".champ-build__section__content")[4].querySelector(".champ-build__item");
        var data = {
          name: totemParsed.querySelector("span").rawText,
          img: totemParsed.querySelector("img").attributes.src
        };
        if(startItems.indexOf(data) == -1){
          startItems.push(data);
        }
        var startItemsParsed = parsed.querySelectorAll(".champ-build__section__content")[3].querySelectorAll(".champ-build__item").map((key, index)=>{
          var data = {
            name: key.querySelector("span").rawText,
            img: key.querySelector("img").attributes.src
          };
          if(startItems.indexOf(data) == -1){
            startItems.push(data);
          }
        });
        var abilityQ = []
        parsed.querySelectorAll(".champ-build__abilities__row")[1].querySelectorAll("li").map((key, index)=>{
          abilityQ.push({
            level: key.attributes.level,
            type: ('class' in key.attributes ? 1 : 0)
          });
        });
        var abilityW = [];
        parsed.querySelectorAll(".champ-build__abilities__row")[2].querySelectorAll("li").map((key, index)=>{
          abilityW.push({
            level: key.attributes.level,
            type: ('class' in key.attributes ? 1 : 0)
          });
        });
        var abilityE = [];
        parsed.querySelectorAll(".champ-build__abilities__row")[3].querySelectorAll("li").map((key, index)=>{
        abilityE.push({
            level: key.attributes.level,
            type: ('class' in key.attributes ? 1 : 0)
          });
        });
        var abilityR = [];
        parsed.querySelectorAll(".champ-build__abilities__row")[4].querySelectorAll("li").map((key, index)=>{
          abilityR.push({
            level: key.attributes.level,
            type: ('class' in key.attributes ? 1 : 0)
          });
        });
        this.setState({abilities: abilitieList, abilityOrders: [abilityQ, abilityW, abilityE, abilityR], items: itemsList, startItems: startItems, info: this.props.route.params.data});
      });
      fetch("https://www.mobafire.com"+this.props.route.params.id+"/skins").then((resp)=>{return resp.text()}).then((text)=>{
        const parsedy = parse(text);
        var skinsList = [];
        var skinsParsed = parsedy.querySelectorAll(".champ-skins__item").map(function(key, index){
          var SkinName = key.childNodes[5].childNodes[1].rawText.trim();
          var SkinId = index;
          var SkinImage = key.childNodes[1].attributes.src.trim();
          if(key.querySelector(".champ-skins__item__cost") == null){
            if(key.querySelector(".date").rawText == "Unreleased"){
              var SkinCost = "Unreleased";
            }else{
              var SkinCost = "0";
            }
          }else{
            var SkinCost = key.querySelector(".champ-skins__item__cost").rawText;
          }
          skinsList.push({
            id: SkinId,
            name: SkinName,
            img: SkinImage,
            cost: SkinCost,
          });
        });
        this.setState({skins:skinsList, loading: false});
      });
    }
  }
  componentWillUnmount() {
      this.setState = (state,callback)=>{
          return;
      };
  }
  getRoles(roles){
    return roles.map((x, index) => {
      if(x == "top"){
        return (<View key={"Role"+Math.floor(Math.random() * index*10)} style={{flexDirection:"row",backgroundColor: "#111111"}}><Image key={index} source={require('../assets/images/top.png')} style={{height: 16, width: 16}} /><Text style={{fontSize:10,color: "#fff"}}>Top Lane</Text></View>);
      }else if(x == "mid"){
        return (<View key={"Role"+Math.floor(Math.random() * index*10)} style={{flexDirection:"row",backgroundColor: "#111111"}}><Image key={index} source={require('../assets/images/mid.png')} style={{height: 16, width: 16}} /><Text style={{fontSize:10,color: "#fff"}}>Middle</Text></View>);
      }else if(x=="bot"){
        return (<View key={"Role"+Math.floor(Math.random() * index*10)} style={{flexDirection:"row",backgroundColor: "#111111"}}><Image key={index} source={require('../assets/images/bot.png')} style={{height: 16, width: 16}} /><Text style={{fontSize:10,color: "#fff"}}>Bot Lane</Text></View>);
      }else if(x=="sup"){
        return (<View key={"Role"+Math.floor(Math.random() * index*10)} style={{flexDirection:"row",backgroundColor: "#111111"}}><Image key={index} source={require('../assets/images/sup.png')} style={{height: 16, width: 16}} /><Text style={{fontSize:10,color: "#fff"}}>Support</Text></View>);
      }else if(x=="jung"){
        return (<View key={"Role"+Math.floor(Math.random() * index*10)} style={{flexDirection:"row",backgroundColor: "#111111"}}><Image key={index} source={require('../assets/images/top.png')} style={{height: 16, width: 16}} /><Text style={{fontSize:10,color: "#fff"}}>Jungle</Text></View>);
      }else{
        return;
      }
    });
  }
  render(){
    if(this.state.loading == true){
      return (
        <View style={styles.container}>
          <Text style={styles.title}>LOADING</Text>
        </View>
      );
    }
    return(
      <View style={styles.Container}>
        <View style={styles.Header}>
          <Image style={styles.HeaderChampionAvatar} source={{uri: this.state.info.img}} />
          <View style={styles.HeaderChampionInfo}>
            <Text style={styles.HeaderChampionInfoTitle}>
              {this.state.info.name}
            </Text>
            <Text style={styles.HeaderChampionInfoSubtitle}>
              {this.state.info.desc}
            </Text>
            <Text style={styles.HeaderChampionInfoRoles}>
              {this.getRoles(this.state.info.roles)}
            </Text>
            <Text style={styles.HeaderChampionInfoPrices}>
              {"IP: "+this.state.info.prices.ip+" RP: "+this.state.info.prices.rp}
            </Text>
          </View>
        </View>
        <ScrollableTabView
          contentProps={{style:{flex: 1}}}
          initialPage={0}
          tabBarInactiveTextColor="#fff"
          tabBarActiveTextColor="rgb(194, 143, 44)"
          tabBarUnderlineStyle={{backgroundColor: "rgb(194, 143, 44)"}}
        >
          <ScrollView tabLabel='Infos' i={0}>
            <Component title={"START ITEMS"}>
              <ItemsCard items={this.state.startItems} />
            </Component>
            <Component title={"RECOMMENDED BUILD"}>
              <ItemsCard items={this.state.items} />
            </Component>
            <Component title={"ABILITY ORDER"}>
              <AbilityOrderCard abilities={this.state.abilityOrders} />
            </Component>
            <Component title={"ABILITIES"}>
              <AbilitiesCard cards={this.state.abilities} />
            </Component>
          </ScrollView>
          <View tabLabel='Guides / Builds' i={1}>
            <Text>My</Text>
          </View>
          <ScrollView tabLabel='Skins' i={2}>
            <SkinsCard skins={this.state.skins} />
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#111111",
    flex: 1,
  },
  Header: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#111111"
  },
  HeaderChampionAvatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderColor: "#d0a85c",
    borderWidth: 1
  },
  HeaderChampionInfo: {
    paddingLeft: 10,
    backgroundColor: "#111111"
  },
  HeaderChampionInfoTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14
  },
  HeaderChampionInfoSubtitle: {
    fontSize: 12,
    color: "#fff"
  },
  HeaderChampionInfoRoles: {
    fontSize: 12,
    color: "#fff"
  },
  HeaderChampionInfoPrices: {
    fontSize: 12,
    color: "#fff"
  }

});