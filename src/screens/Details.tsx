import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Details: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
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

export default Details;
