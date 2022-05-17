import React, { memo } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Video } from 'expo-av';
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
});

class HomeCard extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            mainLoaded: false,
            thumbLoaded: false,
        }
    }

    setMainLoaded(param){
        this.setState({mainLoaded: param})
    }

    setThumbLoaded(param){
        this.setState({thumbLoaded: param})
    }


    render(){        
        const {mainLoaded, thumbLoaded} = this.state;
        const {item, focusIndex, index} = this.props;
        const {fullImageURL, thumbnailURL} = item;
        console.log(`index: ${index} focusIndex: ${focusIndex}`);
        
        ThumbImage = ({item}) => {
            const _isFocussed = (index == 0 || index === (focusIndex -1));
            const _imageURL = _isFocussed ?  fullImageURL : thumbnailURL ;

            return (
                <View style={[styles.container, {backgroundColor: _isFocussed ? '#dddeee' : '#fff'}]}>
                    <Text >{`${index} : ${item.id} - FOCUS: ${_isFocussed ? 'Y' : 'N'}`}</Text>
                    <Image
                            defaultSource={require('../assets/logo-512.png')}
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
                </View>
            )
        }

       

        return (
            <View style={styles.container}>
                <ThumbImage  item={item} focusIndex={focusIndex} index={index} />                
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
        focusIndex: state.pageListReducers.focusIndex,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(HomeCard))
