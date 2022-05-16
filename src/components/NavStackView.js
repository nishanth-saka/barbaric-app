import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HOME_SCREEN } from '../constants';
import HomeScreen from '../views/HomeScreen';

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
                    
                    }}/>  

        </Stack.Navigator>
    )
}

export default NavStackView;
