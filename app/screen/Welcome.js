import React, {Component} from 'react';

import { Image, Linking, ScrollView, StyleSheet,Share ,TouchableWithoutFeedback, View } from "react-native";
import colors from "../config/colors"
import httpService from "../services/ApiManager.service"
import NotificationPopup from 'react-native-push-notification-popup';


class Welcome extends Component {
  constructor(props) {
    super(props);   
    this._httpService = new httpService(props);    
    this.state = {
      data: [],     
    };
  }
  async componentDidMount() {   
   this._getData();   
   }
   _getData=async()=>{
    try {    
    let response = await this._httpService._doHttpRequest(
            "https://resources.vega6.info/get-photo/search",
            "POST",
             );   
    if (response.data.status) {
                let data = response.data.data;
                console.log(data);
                this.setState({data:data})
    } else {
                console.log("NOt Found any data")
              }
    } catch (error) {
     console.log(error);
    }
    }; 

 __popup=(data)=>{
    this.popup.show({
        onPress: async function() {
            try {
                const result = await Share.share({
                  message:'Check this image out \n Link :- '+data.url,
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
        },
        appIconSource: require('../assets/icon.jpg'),
        appTitle: 'vega6',
        timeText: 'Now',
        title: 'Tap to share on Social Media',
        body: 'Check this image out \n Link :- '+data.url,
        slideOutTime: 15000
      }); 
 }
  
  render() {  
      return (
        <ScrollView style={styles.containerDefault}>
        {this.state.data.length>0?this.state.data.map((item) => (             
            <View key={item.url} style={styles.container}> 
            <TouchableWithoutFeedback
            onPress={()=>this.__popup(item)}
            >
            <Image source={{uri: item.url}} style={{height:"100%",width:"100%", borderRadius:10,}}></Image>
            </TouchableWithoutFeedback>           
            </View>               
     )):<></>} 
    <NotificationPopup ref={ref => this.popup = ref} /> 
     </ScrollView>   
           
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height:100,
        width:100,
        backgroundColor:colors.blue,
        marginVertical:5,
        borderRadius:10,
    },
    containerDefault:{   
        
    }
});

export default Welcome;
