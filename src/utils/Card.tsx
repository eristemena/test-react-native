import React from 'react';
import {RouteProp} from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

const {width} = Dimensions.get('screen');
export type Props = {
  name: string;
  fullName: string;
  image: string;
  from: string;
  route: string;
  navigation: RouteProp<any>;
  repo: string;
};
const Card: React.FC<Props> = ({
  name,
  fullName,
  image,
  from,
  route,
  navigation,
  repo,
}) => {
  function Press(repos: string, username: string) {
    if (from === 'Home') {
      navigation.navigate(route, {
        repo: repos,
        username,
      });
    } else {
      Linking.openURL(name);
    }
  }
  return (
    <View style={styles.card}>
      <View style={styles.paddingCard}>
        <Image
          source={{uri: image}}
          resizeMode="cover"
          style={{height: 50, width: 50, borderRadius: 50}}
        />
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => Press(repo, name)}>
          <Text numberOfLines={1}>{fullName}</Text>
          <Text style={{color: from === 'Details' ? 'blue' : 'black'}}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchStockStyle: {
    height: 40,

    width: width / 1.4,
    borderColor: 'grey',

    borderWidth: 0.2,
    borderRadius: 2,
    paddingLeft: 50,
  },
  card: {
    marginTop: 10,
    backgroundColor: 'white',
    width: width * 0.9,
    height: 80,
    justifyContent: 'center',
    borderRadius: 5,
  },
  paddingCard: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
});
