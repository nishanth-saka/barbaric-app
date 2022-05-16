import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

const w = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ImageView = () => {
    return (
        <View style={styles.container}>
          <Image
            source={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${w.width * 2}&buster=${Math.random()}` }}
            style={{ width: w.width, height: w.width }}
            resizeMode="cover"
          />
        </View>
      );
}

export default ImageView;