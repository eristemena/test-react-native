import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import MainStack from './MainStack';

const MainNav: FC = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default MainNav;
