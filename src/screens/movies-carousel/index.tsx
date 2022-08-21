import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';

import {movies, MoviesProps} from './data';
import styles, {ITEM_SIZE} from './styles';

const {width} = Dimensions.get('window');

const BackdropItem = ({
  item,
  scrollX,
}: {
  item: MoviesProps;
  scrollX: Animated.SharedValue<number>;
}) => {
  const idx = parseInt(item.id, 10) - 1;

  const rStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(idx - 1) * ITEM_SIZE, idx * ITEM_SIZE],
      [0, width],
    );
    return {
      width: translateX,
    };
  });

  if (!item.backdrop) {
    return null;
  }

  return (
    <Animated.View style={[styles.backdropItemContainer, rStyle]}>
      <Image source={item.backdrop} style={styles.backdropImage} />
    </Animated.View>
  );
};

const Backdrop = ({scrollX}: {scrollX: Animated.SharedValue<number>}) => {
  return (
    <View style={styles.backdrop}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        removeClippedSubviews={false}
        contentContainerStyle={styles.backdropFlatList}
        renderItem={({item: it}) => (
          <BackdropItem item={it} scrollX={scrollX} />
        )}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', '#f4f6f9']}
        style={styles.linearGradient}
      />
    </View>
  );
};

const MovieItem = ({
  item,
  scrollX,
}: {
  item: MoviesProps;
  scrollX: Animated.SharedValue<number>;
}) => {
  const idx = parseInt(item.id, 10) - 1;

  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      [(idx - 1) * ITEM_SIZE, idx * ITEM_SIZE, (idx + 1) * ITEM_SIZE],
      [0, -50, 0],
      'clamp',
    );
    return {
      transform: [{translateY}],
    };
  });

  if (!item.name) {
    return <View style={styles.emptyItem} />;
  }

  return (
    <View style={styles.movieContainer}>
      <Animated.View style={[styles.movieWrapper, rStyle]}>
        <View style={styles.mainImage}>
          <Image style={styles.movieImage} source={item.image} />
        </View>
        <View style={styles.movieDetails}>
          <Text style={styles.movieName}>{item.name}</Text>
          <View style={styles.movieRatingContainer}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Text
                key={index}
                style={
                  index + 1 <= item.rating
                    ? styles.ratingActive
                    : styles.ratingDisabled
                }>
                ★
              </Text>
            ))}
          </View>
          <View style={styles.movieGenreWrapper}>
            {item.genres.map(genre => (
              <View key={genre} style={styles.movieGenreContainer}>
                <Text style={styles.movieGenre}>{genre}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.movieButton}>
            <Text style={styles.movieButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default function MoviesCarouselScreen() {
  const scrollX = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      const offsetX = event.contentOffset.x;
      scrollX.value = offsetX;
    },
  });

  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <SafeAreaView>
        <Header />
      </SafeAreaView>

      <SafeAreaView edges={['bottom']} style={styles.container}>
        <Animated.FlatList
          onScroll={handleScroll}
          data={movies}
          keyExtractor={item => item.id}
          renderItem={item => <MovieItem item={item.item} scrollX={scrollX} />}
          horizontal
          contentContainerStyle={styles.flatList}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          renderToHardwareTextureAndroid
          scrollEventThrottle={16}
          bounces={false}
          initialScrollIndex={1}
          getItemLayout={(data, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
          })}
        />
      </SafeAreaView>
    </View>
  );
}
