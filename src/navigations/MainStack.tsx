import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import Details from '../screens/Details';
import Home from '../screens/Home';
import {Stacks} from '../shared/Navigations';

const Stack = createStackNavigator();

const MainStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={Stacks.home}
        component={Home}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name={Stacks.details}
        component={Details}
        options={{title: 'Details'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
