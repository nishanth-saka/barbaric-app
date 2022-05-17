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
    const [isScrolling, setIsScrolling] = useState(true);
    const [currentViewIndex, setViewIndex] = useState(0);
    
    let _flatListRef = null;

    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 3,
      waitForInteraction: false,
      minimumViewTime: 5,
    })
    
    const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        let _currentViewIndex = _.last(viewableItems)?.index;
        
        if(_currentViewIndex){
            setViewIndex(_currentViewIndex);
        }
    })

    const renderItem = useCallback(({item, index}) => {
        return originalRenderItem({item, index});
    } , [pageList, isScrolling]);

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
                    keyExtractor={(item, index) => `${item?.id ?? ''}${index}`}
                    data={pageList}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.3}
                    disableIntervalMomentum={true}
                    onEndReached={() => {
                        props.getPageList({pageNumber : pageNumber + 1});
                    }}     
                    // decelerationRate={'fast'}     
                    // disableIntervalMomentum={true}
                    onScrollBeginDrag={() => {
                        console.log(`onScrollBeginDrag..`);
                        setIsScrolling(true)
                    }}
                    onMomentumScrollBegin={() => {
                        console.log(`onMomentumScrollBegin..`);
                        setIsScrolling(true)
                    }}
                    onMomentumScrollEnd={() => {
                        console.log(`onMomentumScrollEnd..`);
                        setIsScrolling(false);
                        props.setRowIndex(currentViewIndex);
                        }}
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
