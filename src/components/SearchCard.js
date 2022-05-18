import React, { memo } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import _ from 'lodash';

// import { Video } from 'expo-av';
import YoutubePlayer from "react-native-youtube-iframe";

import { connect } from 'react-redux';

import { setRowIndex } from '../redux/actions/pageListActions';
import { IMAGE_TYPE } from '../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        margin: 10
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flexWrap: 'wrap',
        marginHorizontal: 10,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,        
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        marginRight: 10,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1',
        width: 400,
     },
});

class SearchCard extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            mainLoaded: false,
            thumbLoaded: false,
            status: false,
            scrollViewRef: null,
            data: [
                { type: 'row', text: 'row 1'},
                { type: 'row', text: 'row 2'},
                { type: 'list', data: ['Apple', 'Banna', 'Pear', 'Orange', 'Grape', 'Pineapple']},
                { type: 'row', text: 'row 3'},
                { type: 'row', text: 'row 4'},
                { type: 'row', text: 'row 5'},
                { type: 'list', data: ['Bike', 'Car', 'Train', 'Plane', 'Boat', 'Rocket']},
                { type: 'row', text: 'row 6'},
                { type: 'row', text: 'row 7'},
                { type: 'row', text: 'row 8'},
              ]
        }
    }

    
    componentDidMount = () => {
     
    }

    setMainLoaded(param){
        this.setState({mainLoaded: param})
    }

    setThumbLoaded(param){
        this.setState({thumbLoaded: param})
    }

    keyExtractor = (item, index) => {
        const _index = `${index.toString()}${_.random(false)}`;
        console.log(`_index: ${_index}`)
        return _index;
      }

      
    render(){        
        
        const { thumbLoaded} = this.state;
        const {item, focusIndex, index, nextItem} = this.props;
        const {fullImageURL, fullVideoURL, thumbnailURL, type, id} = item;
        
        
        if(!id){
            return(
                <></>
            )
        }

        

        ThumbImage = ({item}) => {
            const _isFocussed = (index == 0 || index === (focusIndex -1));
            const _imageURL = _isFocussed ?  fullImageURL : thumbnailURL ;

            console.log(`_isFocussed: ${_isFocussed} thumbnailURL: ${thumbnailURL}`);

            return (
                <SafeAreaView 
                    style={[styles.titleContainer, {backgroundColor: _isFocussed ? '#dddeee' : '#fff'}]}>                    
                    <Image
                        keyExtractor={this.keyExtractor}
                        resizeMode={'contain'}
                        source={{                    
                            uri: _imageURL,
                            cache: 'only-if-cached'
                        }}
                        fadeDuration={300}
                        progressiveRenderingEnabled={false}
                        style={[styles.image]}             
                        onLoad={() => {
                            if(!thumbLoaded){
                                this.setThumbLoaded(true)
                            }                                
                        }}                        
                    />
        
                </SafeAreaView>
            )
        }

        

        return (
            <View style={styles.container}>
                <ThumbImage  item={item} focusIndex={focusIndex} index={index}/>           
            </View>
        )
    }
 }


 function mapDispatchToProps(dispatch) {
    return {
        setRowIndex: params =>dispatch(setRowIndex(params)),
    }
}

function mapStateToProps(state) {

    return {
        focusIndex: state.pageListReducers.focusIndex
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(SearchCard))
