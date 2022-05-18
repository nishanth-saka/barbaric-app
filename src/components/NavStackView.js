import React  from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HOME_SCREEN } from '../constants';
import HomeScreen from '../views/HomeScreen';
import { connect } from 'react-redux';
import { setSearchGrid } from '../redux/actions/pageListActions';

const Stack = createStackNavigator();

function NavStackView(props) {
    
    // console.log(``);
    // console.log(`NavStackView:`);
    // console.log(props);
    // console.log(``);

    return (
        <Stack.Navigator
            initialRouteName={props.initialRouteName}>

            <Stack.Screen name={HOME_SCREEN} component={HomeScreen} options={{ 
                    title: 'F100',
                    headerStyle: {
                        backgroundColor: '#fff'            
                    },
                    // headerTintColor: RED_COLOR,
                    // headerTitleStyle: {
                    //     fontWeight: '100',
                        // fontFamily: FONT_HEADER
                    // },
                    headerRight:() => { 
                        return <TouchableOpacity onPress={(args) => {
                            props.setSearchGrid(!props.showSearchGrid)
                        }} style={[{display: 'flex'}, styles.btn]}>
                        <Text>HELLO</Text>      
                    </TouchableOpacity>;
                      },
                    
                    }}/>  

        </Stack.Navigator>
    )
}

const styles = new StyleSheet.create({
    btn: {
        width:60, 
        height:50, 
        padding:10, marginRight: 15, 
        borderWidth:1, 
        borderRadius: 5, 
        alignContent:'center', 
        alignItems:'center'
    }
});


function mapDispatchToProps(dispatch) {
    return {
        setSearchGrid: params =>dispatch(setSearchGrid(params)),
    }
}

function mapStateToProps(state) {

    return {
        showSearchGrid: state.pageListReducers.showSearchGrid,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavStackView);
