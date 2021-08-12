import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {RootStackParamList, Stacks} from '../shared/Navigations';
import {Octokit} from '@octokit/core';
import {url, token} from '../utils/utils';
import {Ionicons} from '@expo/vector-icons';
import {Card} from '../utils';
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const {width} = Dimensions.get('screen');
export type Props = {
  navigation: StackNavigationProp<RootStackParamList, Stacks.home>;
};

const octokit = new Octokit({auth: token});
const Home = ({navigation}: Props): React.ReactNode => {
  const [data, setData] = useState<Array<string>>([]);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingList, setLoadingList] = useState<Boolean>(false);
  const [itemToRender, setItemToRender] = useState<number>(8);
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
  });

  const handleScroll = (e: any): void => {
    const length: number = data.length;
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledBottom = scrollViewHeight + scrollPosition;
    if (isScrolledBottom >= contentHeight - 50 && itemToRender <= length) {
      setTimeout(() => {
        setItemToRender(itemToRender + 7);
        setLoadingList(true);
      });
    } else {
      setLoadingList(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getFirstData();
  }, []);

  async function getData(urls: string): Promise<void> {
    setLoading(true);
    setData([]);

    setLoading(true);

    await octokit
      .request(urls, {
        q: text,
      })
      .then(
        res => setData(res.data.items),
        setLoading(false),
        // console.log(items.data.items.map(i=>i.owner.id),'jasdbahjkhjashkadshk'),
      );
  }
  async function getFirstData(): Promise<void> {
    setLoading(true);
    setData([]);

    setLoading(true);

    await octokit
      .request(url, {
        q: 'react',
      })
      .then(res => setData(res.data.items), setLoading(false))
      .catch(err => console.log(err));
  }
  function cancelFetch() {
    setText('');
    setLoadingList(8);
  }

  const renderItem = ({item, index}: any): any => {
    if (index + 1 <= itemToRender) {
      return (
        <Card
          name={item.name}
          fullName={item.full_name}
          repo={item.owner.login}
          image={item.owner.avatar_url}
          from={'Home'}
          route={'Details'}
          navigation={navigation}
        />
      );
    }
  };

  // console.log(data);

  return (
    <View style={styles.container}>
      {/* <View style={{height: 40}}></View> */}
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{translateY: translateY}],
          },
        ]}>
        <Ionicons
          name="search"
          size={22}
          color={'#5C5C66'}
          style={styles.icon}
        />
        <TextInput
          keyboardType={'default'}
          onChangeText={txt => setText(txt)}
          style={[styles.searchStockStyle, {backgroundColor: '#ebebeb'}]}
          onSubmitEditing={() => getData(url)}
          value={text}
        />
        <TouchableOpacity onPress={cancelFetch}>
          <Text style={{left: 10}}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>

      {loading == true ? (
        <ActivityIndicator
          style={{justifyContent: 'center'}}
          size="large"
          color={'red'}
        />
      ) : (
        <View style={styles.container}>
          <View style={{top: 10}}></View>
          {loadingList === true ? (
            <ActivityIndicator
              style={{bottom: 50, position: 'absolute', zIndex: 9}}
              size="large"
              color="#D23B4B"
            />
          ) : null}

          {data?.length > 0 ? (
            <AnimatedFlatlist
              scrollEventThrottle={16}
              onMomentumScrollEnd={e => handleScroll(e)}
              data={data}
              initialNumToRender={7}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
            />
          ) : (
            <Text>Data Not Found</Text>
          )}
          {/* <View style={{height: 30}} /> */}
        </View>
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
  icon: {
    left: 20,
    position: 'absolute',
    zIndex: 99,
  },
  searchStockStyle: {
    height: 40,

    width: width / 1.4,
    borderColor: 'grey',

    borderWidth: 0.2,
    borderRadius: 2,
    paddingLeft: 50,
  },
  animatedView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 14,
    zIndex: 10,
    // paddingBottom: 20,
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
  content: {
    top: 30,
    marginTop: 20,
    paddingBottom: 80,
  },
});

export default Home;
