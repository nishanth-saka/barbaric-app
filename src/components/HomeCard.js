import React, { memo } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { Video } from 'expo-av';

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
        flexDirection: 'row'
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
        const {mainLoaded} = this.state;
        const {item} = this.props;
        let player = null;

        console.log(``);
        console.log(`thumbnailURL: ${item.thumbnailURL}`);
        console.log(item?.fullVideoURL);
        console.log(``);
        console.log(``);
        
        MainImage = ({item}) => {
            return (
                <View style={[styles.image, {display: 'flex'}]}>
                    <Text style={[styles.image]} >{item.id}</Text>
                    {item.type === IMAGE_TYPE ?
                        <Image
                            resizeMode={'contain'}
                            source={{                    
                                uri: item?.fullImageURL,
                                cache: 'only-if-cached'
                            }}
                            fadeDuration={300}
                            progressiveRenderingEnabled={true}
                            style={[styles.image, {display: mainLoaded ? 'flex' : 'none'}]}         
                            onLoad={() => {
                                this.setMainLoaded(true)
                            }}          
                    /> : 
                    <Video
                        source={{uri : item?.fullVideoURL}}
                        style={styles.backgroundVideo}
                        controls={false}
                        shouldPlay={false}
                        useNativeControls
                        resizeMode="contain" 
                        onPlaybackStatusUpdate={status => {
                            console.log(``);
                            console.log(`status:`);
                            console.log(status);
                            console.log(``);

                            // this.setMainLoaded(status.isLoaded)
                        }}
                        ref={(ref) => {
                        player = ref
                        }} />}
                </View>
                
            )
        }
    
        ThumbImage = ({item}) => {
            return (
                <View style={[styles.image]}>
                    <Text  >{item.id}</Text>
                    <Image
                            defaultSource={require('../assets/logo-512.png')}
                            resizeMode={'contain'}
                            source={{                    
                                uri: item?.thumbnailURL,
                                cache: 'only-if-cached'
                            }}
                            fadeDuration={300}
                            progressiveRenderingEnabled={true}
                            style={[styles.image, {display: mainLoaded ? 'none' : 'flex'}]}                                    
                        />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                {/* {mainLoaded ? <MainImage item={item}/> : <ThumbImage item={item}/>  } */}
                <MainImage item={item}/>
                {/* <ThumbImage item={item}/>       */}
            </View>
        )
    }
 }

// const HomeCard = ({ item }) => {
//     const [thumbLoaded, setThumbLoaded] = useState(false);
//     const ThumbImage = ({item}) => {
//         return (
//             <Image
//                 source={{                    
//                     uri: item?.urls?.full,
//                     cache: 'only-if-cached'
//                 }}
//                 style={[styles.image, {display: mainLoaded ? 'none' : 'flex'}]}
//                 onLoadStart={() => {
//                     setThumbLoaded(false)
//                 }}
//                 onLoad={() => {
//                     setThumbLoaded(true)
//                 }}
//             />
//         )
//     }

//     const [mainLoaded, setMainLoaded] = useState(false);
//     const MainImage = ({item}) => {
//         return (
//             <Image
//                 source={{                    
//                     uri: item?.urls?.full,
//                     cache: 'only-if-cached'
//                 }}
//                 style={[styles.image, {display: mainLoaded ? 'flex' : 'none'}]}
//                 onLoadStart={() => {
//                     setMainLoaded(false)
//                 }}
//                 onLoad={() => {
//                     setMainLoaded(true)
//                 }}
//             />
//         )
//     }
    
//     return (
//         <View style={styles.container}>
//             <MainImage item={item}/>
//             <ThumbImage item={item}/>      
//         </View>
//     )
// }

export default memo(HomeCard)

