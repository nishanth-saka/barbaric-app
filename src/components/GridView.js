// import React in our code
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import SearchCard from './SearchCard';


// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Image
} from 'react-native';

const originalRenderItem = ({ item, index }) => {      
  return (        
      <SearchCard 
          item={item} 
          key={`${index}`} 
          index={index}
          />
    )
};
 
const GridView = (props) => {
  
  const [text, onChangeText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [randomIndex, setRandomIndex] = useState(true);
 
  useEffect(() => {
    let _dataArray = randomIndex ? props.pageList : _.reverse(props.pageList);    
    setDataSource(_dataArray);      
    setRandomIndex(!randomIndex);
  }, [text]);
 
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <FlatList
        data={dataSource}
        renderItem={originalRenderItem}
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      width: 300,
      justifyContent: 'center',
      backgroundColor: '#ccddee',
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 200
    },
    input: {
      height: 40,
      marginTop: 20,
      borderWidth: 1,
      padding: 10,      
    },
  });
  

function mapDispatchToProps(dispatch) {
    return {
        getPageList: params =>dispatch(getPageList(params)),
        setPageList: params =>dispatch(setPageList(params)),
        setRowIndex: params =>dispatch(setRowIndex(params)),
    }
}

function mapStateToProps(state) {

    return {
        pageList: state.pageListReducers.pageList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GridView);