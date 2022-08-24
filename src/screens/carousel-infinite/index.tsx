import React from 'react';
import {
  Dimensions,
  Image,
  ImageURISource,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import Carousel from '../../components/carousel';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const list = [
  require('../movies-carousel/images/dune.jpeg'),
  require('../movies-carousel/images/godzilla-kong.jpeg'),
  require('../movies-carousel/images/luca.jpeg'),
  require('../movies-carousel/images/nttd.jpeg'),
];

export default function CarouselInfiniteScreen() {
  const renderItem = ({item}: {item: ImageURISource}) => {
    const rStyle = [styles.itemContainer, {backgroundColor: item}] as ViewStyle;
    return (
      <View style={rStyle}>
        <Image source={item} style={styles.itemImage} />
      </View>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <Header />
        <Carousel
          data={list}
          keyExtractor={(item: string, index: number) => `${item}_${index}`}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  itemImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
});
