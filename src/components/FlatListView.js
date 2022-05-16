import React, { useState, useRef,useCallback } from 'react';
import { SafeAreaView, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';


import HomeCard from './HomeCard';
import FlatLisStyles from '../styles/index';
import { getPageList } from '../redux/actions/pageListActions';

const localArray = [];
const itemHeight = 270;
const originalRenderItem = ({ item, index }) => {
    
    // let _existingItemIndex = _.findIndex(localArray, {index});
    
    // localArray.push({
    //     index,
    //     item,
    //     renderItem: <HomeCard item={item}/>
    // });

    // if(_existingItemIndex > -1){
    //     return localArray[_existingItemIndex]?.renderItem;
    // }

    return (        
        <HomeCard item={item} key={`${index}`}/>
      )
};
const FlatListView = (props) => {
    const {pageList, pageNumber} = props;
    let _flatListRef = null;

    
    const [inViewPort, setInViewPort] = useState(0)
    const [newPageList, setPageList] = useState([])
    const [viewableItems, setViewableItems] = useState([])

    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
      waitForInteraction: true,
      minimumViewTime: 5,
    })
    
    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
      if (changed && changed.length > 0) {
        setInViewPort(changed[0].index);        
      }
    })

    const renderItem = useCallback(({item, index}) => {
        return originalRenderItem({item, index});
    } , [pageList]);

    return (
        <SafeAreaView style={FlatLisStyles.container}>
                <FlatList
                    ref={(list) =>_flatListRef = list}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfig.current}
                    windowSize={10}
                    removeClippedSubviews={false}
                    maxToRenderPerBatch={3}
                    initialNumToRender={10}
                    keyExtractor={(item, index) => `${item.id}${index}`}
                    data={pageList}
                    renderItem={renderItem}
                    nestedScrollEnabled={true}
                    onEndReachedThreshold={0.4}
                    onEndReached={() => {
                        props.getPageList({pageNumber : pageNumber + 1});
                    }}
                    />
        </SafeAreaView>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getPageList: params =>dispatch(getPageList(params)),
    }
}

function mapStateToProps(state) {

    return {
        pageList: state.pageListReducers.pageList,
        pageNumber: state.pageListReducers.pageNumber,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlatListView)
