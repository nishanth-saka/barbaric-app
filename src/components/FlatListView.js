import React, { useState, useRef,useCallback } from 'react';
import { SafeAreaView, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';


import HomeCard from './HomeCard';
import FlatLisStyles from '../styles/index';
import { getPageList, setRowIndex } from '../redux/actions/pageListActions';

const ITEM_HEIGHT = 270;
const originalRenderItem = ({ item, index }) => {      
    return (        
        <HomeCard 
            item={item} 
            key={`${index}`} 
            index={index}
            />
      )
};
const FlatListView = (props) => {
    const {pageList, pageNumber} = props;
    
    let _flatListRef = null;

    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 3,
      waitForInteraction: false,
      minimumViewTime: 5,
    })
    
    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        let _currentViewIndex = _.last(viewableItems)?.index;
        if(_currentViewIndex){
            setTimeout(() => {
                props.setRowIndex(_currentViewIndex);
            }, 300);
        }
        console.log("Visible items are", _.last(viewableItems)?.index);

    })

    const renderItem = useCallback(({item, index}) => {
        return originalRenderItem({item, index});
    } , [pageList]);

    const handleScrollView = (e) => {
        let offset = e.nativeEvent.contentOffset.y;
        // let viewSize = e.nativeEvent.layoutMeasurement;
        let index = parseInt(offset / (ITEM_HEIGHT));   // your cell height                        
        console.log(`handleScrollView: ${index}`);
       }

    return (
        <SafeAreaView style={FlatLisStyles.container}>
                <FlatList
                    ref={(list) =>_flatListRef = list}
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfig.current}
                    windowSize={10}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    initialNumToRender={3}
                    keyExtractor={(item, index) => `${item.id}${index}`}
                    data={pageList}
                    renderItem={renderItem}
                    nestedScrollEnabled={true}
                    onEndReachedThreshold={0.5}
                    disableIntervalMomentum={true}
                    onEndReached={() => {
                        props.getPageList({pageNumber : pageNumber + 1});
                    }}
                    
                    onScrollEndDrag={handleScrollView}        
                    />
        </SafeAreaView>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getPageList: params =>dispatch(getPageList(params)),
        setPageList: params =>dispatch(setPageList(params)),
        setRowIndex: params =>dispatch(setRowIndex(params)),
    }
}

function mapStateToProps(state) {

    return {
        pageList: state.pageListReducers.pageList,
        pageNumber: state.pageListReducers.pageNumber,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlatListView)
