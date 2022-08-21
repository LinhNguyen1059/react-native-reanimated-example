/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  StatusBar,
  ImageURISource,
  ScrollViewProps,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import styles from './styles';

interface FeatureProps {
  id: number;
  icon: ImageURISource;
  iconActive: ImageURISource;
  animValue: number;
}

const listFeature: FeatureProps[] = [
  {
    id: 1,
    icon: require('./images/deposit-circle.png'),
    iconActive: require('./images/deposit.png'),
    animValue: 36,
  },
  {
    id: 2,
    icon: require('./images/withdraw-circle.png'),
    iconActive: require('./images/withdraw.png'),
    animValue: -10,
  },
  {
    id: 3,
    icon: require('./images/qr-circle.png'),
    iconActive: require('./images/qr.png'),
    animValue: -50,
  },
  {
    id: 4,
    icon: require('./images/scan-circle.png'),
    iconActive: require('./images/scan.png'),
    animValue: -92,
  },
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const UpperHeader = ({scrollY}: {scrollY: Animated.SharedValue<number>}) => {
  const searchAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 25], [1, 0], 'clamp');
    const scaleX = interpolate(scrollY.value, [0, 50], [1, 0], 'clamp');
    const translateX = interpolate(scrollY.value, [0, 25], [0, -90], 'clamp');
    return {
      opacity,
      transform: [{scaleX}, {translateX}],
    };
  });

  return (
    <View style={styles.upperHeader}>
      <View style={styles.searchContainer}>
        <Image
          source={require('./images/search.png')}
          style={[styles.icon16, {marginLeft: 8}]}
        />
        <Animated.View style={[styles.searchInput, searchAnimatedStyle]}>
          <View style={styles.searchText} />
        </Animated.View>
      </View>

      <Image source={require('./images/bell.png')} style={styles.bell} />
      <View style={styles.avatar} />
    </View>
  );
};

const FeatureItem = ({
  item,
  scrollY,
}: {
  item: FeatureProps;
  scrollY: Animated.SharedValue<number>;
}) => {
  const circleIconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 25], [1, 0], 'clamp'),
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 25], [0, 1], 'clamp'),
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 30], [1, 0], 'clamp');
    const scale = interpolate(scrollY.value, [0, 30], [1, 0], 'clamp');
    return {
      opacity,
      transform: [{scale}],
    };
  });

  const rAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollY.value,
      [0, 80],
      [0, item.animValue],
      'clamp',
    );
    const translateY = interpolate(scrollY.value, [0, 100], [0, -53], 'clamp');
    return {
      transform: [{translateX}, {translateY}],
    };
  });

  return (
    <Animated.View style={[styles.feature, rAnimatedStyle]}>
      <Animated.Image
        source={item.iconActive}
        style={[styles.featureIcon, iconAnimatedStyle]}
      />
      <Animated.Image
        source={item.icon}
        style={[styles.icon32, circleIconAnimatedStyle]}
      />
      <Animated.View style={[styles.featureText, textAnimatedStyle]} />
    </Animated.View>
  );
};

const ScrollViewAnimated = React.forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => {
    return (
      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        ref={ref}
        scrollEventThrottle={16}
        {...props}>
        <View style={styles.spaceForHeader} />
        <View style={{height: 815, backgroundColor: 'white'}} />
      </AnimatedScrollView>
    );
  },
);

export default function ScrollHeaderScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useSharedValue(0);
  const scrollDirection = useSharedValue('');
  const lastOffsetY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      const offsetY = event.contentOffset.y;
      scrollDirection.value = offsetY - lastOffsetY.value > 0 ? 'down' : 'up';
      lastOffsetY.value = offsetY;
      scrollY.value = offsetY;
    },
    onEndDrag: () => {
      scrollViewRef.current?.scrollTo({
        y: scrollDirection.value === 'up' ? 0 : 100,
        animated: true,
      });
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>

      <SafeAreaView style={styles.header}>
        <UpperHeader scrollY={scrollY} />

        <View style={[styles.lowerHeader]}>
          {listFeature.map(item => (
            <FeatureItem key={item.id} item={item} scrollY={scrollY} />
          ))}
        </View>
      </SafeAreaView>

      <ScrollViewAnimated ref={scrollViewRef} onScroll={handleScroll} />
    </View>
  );
}
