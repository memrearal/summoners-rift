import React from 'react';
import {View,Text,StyleSheet} from "react-native";
export default class AbilityOrderCard extends React.Component{
	renderOrders(list){
		return list.map((key, index)=>{
			if(key.type == 1){
				return(
					<View style={[styles.order, styles.active]}>
						<Text style={styles.level}>
							{key.level}
						</Text>
					</View>
				)
			}else{
				return(
					<View style={[styles.order, styles.disabled]}>
						<Text style={styles.level}>
							{key.level}
						</Text>
					</View>
				);
			}
		});
	}
	render(){
		const {abilities} = this.props;
		return(
			<View style={styles.container}>
				<View style={styles.item}>
					<View style={styles.ability}>
						<Text style={styles.white}>Q: </Text>
					</View>
					<View style={styles.orders}>
						{this.renderOrders(abilities[0])}
					</View>
				</View>
				<View style={styles.item}>
					<View style={styles.ability}>
						<Text style={styles.white}>W: </Text>
					</View>
					<View style={styles.orders}>
						{this.renderOrders(abilities[1])}
					</View>
				</View>
				<View style={styles.item}>
					<View style={styles.ability}>
						<Text style={styles.white}>E: </Text>
					</View>
					<View style={styles.orders}>
						{this.renderOrders(abilities[2])}
					</View>
				</View>
				<View style={styles.item}>
					<View style={styles.ability}>
						<Text style={styles.white}>R: </Text>
					</View>
					<View style={styles.orders}>
						{this.renderOrders(abilities[3])}
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		margin: 5,
		backgroundColor: "rgb(6, 28, 37)",
		flexDirection: "column"
	},
	ability: {
		width: 20
	},
	level: {
		fontSize: 10,
		textAlign: "center",
	},
	white: {
		color: "#fff"
	},
	item: {
		flexDirection: "row"
	},
	orders: {
		flexDirection: "row"
	},
	order: {
		marginTop: 3,
		height: 15,
		width: 15,
		marginHorizontal: 2
	},
	disabled: {
		backgroundColor: "#000"
	},
	active: {
		backgroundColor: "rgb(194, 143, 44)"
	}
});