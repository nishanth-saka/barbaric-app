import React, { memo } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import _ from 'lodash';

import YoutubePlayer from "react-native-youtube-iframe";

import { connect } from 'react-redux';

import { setRowIndex } from '../redux/actions/pageListActions';
import { IMAGE_TYPE } from '../constants';

const styles = StyleSheet.create({
    container: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        width: 300,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 270,
        borderRadius: 10
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
     addButton:{
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#ee6e73',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
     }
});

class HomeCard extends React.PureComponent{
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

    renderHorizontalItem = ({item}) => {
        return (
          <View style={styles.horizontalItem} keyExtractor={this.keyExtractor}>
            <Text  keyExtractor={this.keyExtractor}>{item}</Text>
          </View>
        );
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

            return (
                <SafeAreaView 
                    style={[styles.container, {backgroundColor: _isFocussed ? '#dddeee' : '#fff'}]}>
                    <Text >{`${index} : ${id} - FOCUS: ${_isFocussed ? 'Y' : 'N'}`}</Text>
                    {!_isFocussed ? <Image
                        keyExtractor={this.keyExtractor}
                        defaultSource={require('../assets/logo-512.png')}
                        resizeMode={'contain'}
                        source={{                    
                            uri: _imageURL,
                            cache: 'only-if-cached'
                        }}
                        fadeDuration={300}
                        progressiveRenderingEnabled={false}
                        style={[styles.image, {height: 270}]}             
                        onLoad={() => {
                            if(!thumbLoaded){
                                this.setThumbLoaded(true)
                            }                                
                        }}                        
                    />  : 
                    <ScrollView
                            ref={(list) => {this.scrollViewRef = list}}
                            horizontal={true}
                            onLayout={() => {
                                setTimeout(() => {
                                    this.scrollViewRef?.scrollToEnd({ animated: true })
                                }, 1400);
                            }}

                        >
                        <Image
                            keyExtractor={this.keyExtractor}
                            defaultSource={require('../assets/logo-512.png')}
                            resizeMode={'contain'}
                            source={{                    
                                uri: _imageURL,
                                cache: 'only-if-cached'
                            }}
                            fadeDuration={300}
                            progressiveRenderingEnabled={false}
                            style={[styles.item, {height: 330}]}             
                            onLoad={() => {
                                if(!thumbLoaded){
                                    this.setThumbLoaded(true)
                                }                                
                            }}                        
                        />
                        <Image
                            keyExtractor={this.keyExtractor}
                            defaultSource={require('../assets/logo-512.png')}
                            resizeMode={'contain'}
                            source={{                    
                                uri: nextItem?.fullImageURL,
                                cache: 'only-if-cached'
                            }}
                            fadeDuration={300}
                            progressiveRenderingEnabled={false}
                            style={[styles.item, {height: 330}]}             
                            onLoad={() => {
                                if(!thumbLoaded){
                                    this.setThumbLoaded(true)
                                }                                
                            }}                        
                        />
                        </ScrollView>
                }
            
                </SafeAreaView>
            )
        }

        VideoImage = ({item}) => {
            const _isFocussed = (index == 0 || index === (focusIndex -1));
            const _imageURL = _isFocussed ?  fullVideoURL : thumbnailURL ;
            let _videPlayer = null;

            return (
                <View style={[styles.container, {backgroundColor: _isFocussed ? '#dddeee' : '#fff'}]}>
                    <Text >{`${index} : ${id} - FOCUS: ${_isFocussed ? 'Y' : 'N'}`}</Text>
                    {!_isFocussed ? 
                    <Image
                        defaultSource={require('../assets/logo-512.png')}
                        resizeMode={'contain'}
                        source={{                    
                            uri: thumbnailURL,
                            cache: 'only-if-cached'
                        }}
                        fadeDuration={300}
                        progressiveRenderingEnabled={false}
                        style={[styles.image, {display: !_isFocussed ? 'flex' : 'none'}]}             
                        onLoad={() => {
                            if(!thumbLoaded){
                                this.setThumbLoaded(true)
                            }                                
                        }}                        
                />                 :
                <View style={[styles.titleContainer]}>
                    <YoutubePlayer
                            width={300}
                            height={330}
                            play={_isFocussed}
                            thumbnail_url={thumbnailURL}
                            videoId={fullVideoURL}
                            onChangeState={(state) => {
                                console.log(`==`);
                                console.log(`index: ${index}`);            
                                console.log(`fullVideoURL: ${fullVideoURL}`);                
                                console.log(`state:`);                
                                console.log(state);
                                console.log(`==`);
                            }}
                    />
                </View>
                    
                }
                </View>
            )
        }

       

        return (
            <View style={styles.container}>
                {item.type === IMAGE_TYPE ? 
                    <ThumbImage  item={item} focusIndex={focusIndex} index={index}/>                       
                    : 
                    <VideoImage  item={item} focusIndex={focusIndex} index={index} />
                    }                
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(HomeCard))
