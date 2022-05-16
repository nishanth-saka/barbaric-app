import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import {connect} from 'react-redux';

import FlatListView from "../components/FlatListView";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false  
    };
  }

  componentDidMount() {    
  }

  render() {    
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatListView />
      </View>
    )
  }
}
function mapStateToProps(state) {
    return {
        // slot1: state.SelectionReducer.slot1,
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