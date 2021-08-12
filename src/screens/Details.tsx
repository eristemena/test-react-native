import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Octokit} from '@octokit/core';
import {Card} from '../utils/index';
import {token} from '../utils/utils';
import {RouteProp} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const octokit = new Octokit({auth: token});
export interface DetailProps {
  navigation: RouteProp<any, any>;
  route: RouteProp<any, any>;
}

const Details: FC<DetailProps> = ({navigation, route}) => {
  const {repo, username} = route.params;
  const [loading, setLoading] = useState<Boolean>(true);
  const [data, setData] = useState<Array<number>>([]);
  [];

  useEffect(() => {
    // getDataContributor();
    getContributor();
  }, []);

  async function getContributor(): Promise<void> {
    await octokit
      .request('GET /repos/{owner}/{repo}/contributors', {
        owner: repo,
        repo: username,
      })
      .then(res => setData(res.data));
    setLoading(false);
  }
  const renderItem = ({item}: any) => {
    return (
      <Card
        name={item.html_url}
        fullName={item.login}
        image={item.avatar_url}
        from={'Details'}
        navigation={navigation}
        route={''}
        repo={''}
      />
    );
  };
  return (
    <View style={styles.container}>
      {!loading ? (
        <AnimatedFlatlist
          scrollEventThrottle={16}
          data={data}
          initialNumToRender={7}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      ) : (
        <ActivityIndicator size={'large'} color="red" />
      )}
    </View>
  );
};

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
export default Details;
