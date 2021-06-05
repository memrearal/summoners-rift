import React from 'react';
import {View,Text,StyleSheet} from "react-native";
export default class Component extends React.Component{
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>
						{this.props.title}
					</Text>
				</View>
				<View style={styles.content}>
					{this.props.children}
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		margin: 5,
		backgroundColor: "rgb(6, 28, 37)"
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: "rgb(194, 143, 44)"
	},
	title: {
		fontSize: 12,
		fontWeight: "bold",
		margin: 5,
		color: "#fff"
	},
	content: {
		margin: 5
	}
});