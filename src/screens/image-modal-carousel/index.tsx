import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  NativeScrollEvent,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/header';
import {Routes} from '../../navigation/routes';
import {imageModalData} from './data';
import styles from './styles';

export default function ImageModalCarouselScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const scrollY = useSharedValue(0);
  const hStyle = [styles.headerContainer, {paddingTop: inset.top}] as ViewStyle;
  const headerStyle = [styles.header, {marginTop: inset.top}] as ViewStyle;

  const headerAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 190], [0, 1], 'clamp');
    return {opacity};
  });

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event: NativeScrollEvent) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const onSmallImagePress = () => {
    // @ts-ignore
    navigation.navigate(Routes.LIST_IMAGE);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[hStyle, headerAnimatedStyles]}>
        <Text style={styles.title}>Ibix Styles London Heathrow</Text>
        <Text style={styles.subtitle}>Hillingdon, London</Text>
      </Animated.View>
      <Header style={headerStyle} />
      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <View>
          <Image source={imageModalData[0].image} style={styles.image} />
          <TouchableOpacity
            style={styles.imageSmallContainer}
            onPress={onSmallImagePress}>
            <Image source={imageModalData[1].image} style={styles.smallImage} />
            <Text style={styles.seeMoreText}>+9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.anotherContent} />
      </Animated.ScrollView>
    </View>
  );
}
