import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Image, ScrollView, PermissionsAndroid, Text } from "react-native";
import {connect} from 'react-redux';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

import GridView from "../components/GridView";
import FlatListView from "../components/FlatListView";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showPicker: false,
      showResult: false,
      result: [],
      video: null,
      img1: null,
      img2: null,
      showToast: null,
      toastText1: '',
      toastText2: '',
      hideImagePicker : true,
    };
  }

  renderVideo(param) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Video
          source={{ uri: `${param?.video?.assets[0]?.uri}` }}
          style={{ width: 300, height: 400 }}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={(e) => console.log(e)}
          onLoad={(load) => console.log(load)}
          repeat={true}
        >
          <View></View>
        </Video>
      </View>
    );
  }

  renderImage(img) {
    const _uri1 = `data:image/png;base64,${img?.image?.img1?.assets[0]?.base64}`;
    const _uri2 = `data:image/png;base64,${img?.image?.img2?.assets[0]?.base64}`;

    return (
      <View style={{flex: 1, justifyContent: 'center' }}>
        <Image
            style={{ width: 300, height: 300, resizeMode: 'contain' }}
            source={{ uri: _uri1 }}
          />
          <Image
            style={{ width: 300, height: 300, resizeMode: 'contain' }}
            source={{ uri: _uri2 }}
          />
      </View>
    );
  }

  getActionSheet = () => {
    const {video, img1, img2, hideImagePicker} = this.state;
    return (
      <ActionSheet id="add_item">
          <View style={{height: 400, justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView >
            {video ? <this.renderVideo video={video}/> 
            : <>
            <TouchableOpacity style={[styles.selectButton]} onPress={() => {
                  ImagePicker.launchImageLibrary({ selectionLimit: 1, mediaType: 'video', includeBase64: true }, (response) => {
                        this.setState({ video: response }, () => {
                          this.setState({hideImagePicker: false})
                        });
                    })
              }}>
                <Text>{`Select Video`}</Text>  
              </TouchableOpacity>              
            </>}

            {(img1 && img2) ? <this.renderImage image={{img1, img2}} /> : <>
            <TouchableOpacity  style={styles.selectButton} onPress={() => {
                  ImagePicker.launchImageLibrary({ selectionLimit: 2, mediaType: 'photo', includeBase64: true }, (response) => {
                    this.setState({ img1: response }, () => {
                      ImagePicker.launchImageLibrary({ selectionLimit: 2, mediaType: 'photo', includeBase64: true }, (response2) => {
                      
                        console.log(``);
                        console.log(`response2: `);
                        console.log(response2);
                        console.log(``);
  
                          this.setState({ img2: response2 });
                        })
                    });
                    
                    })                    
              }}>
                <Text>{`Select Images`}</Text>  
              </TouchableOpacity>              
              </>}
              <TouchableOpacity  style={styles.selectButton} onPress={() => {
                 SheetManager.hide("add_item");        
              }}>
                <Text>{`UPLOAD`}</Text>  
              </TouchableOpacity>
          </ScrollView>
          </View>
      </ActionSheet>
    )
  }
  render() {        
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {this.props.showSearchGrid ? <GridView showSearchGrid={this.props.showSearchGrid}/> : <FlatListView />}
        <TouchableOpacity style={styles.addButton} 
          onPress={() => {
            this.setState({showPicker: true}, async() => {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  {
                    'title': 'Access Storage',
                    'message': 'Access Storage for the pictures'
                  }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log("You can use read from the storage");
                  SheetManager.show("add_item");                  
                } else {
                  console.log("Storage permission denied")
                }
              } catch (err) {
                console.warn(err)
                console.log(`err`);
                console.log(err);
              }
            })            
          }}
          />

        <this.getActionSheet  />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    addButton:{
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#ee6e73',                                    
        position: 'absolute',                                          
        bottom: 40,                                                    
        right: 40,
     },
     selectButton:{
       width: 200,
       height: 100,
       padding: 15
     }
})

function mapStateToProps(state) {
    return {
        showSearchGrid: state.pageListReducers.showSearchGrid,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getSlot1: params =>dispatch(getSlot1(params)),
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomeScreen);