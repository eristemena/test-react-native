import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RootStackParamList, Stacks} from '../shared/Navigations';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, Stacks.home>;
}

const Home: FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate(Stacks.details, {id: '4'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
