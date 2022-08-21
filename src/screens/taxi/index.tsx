import React, {useEffect} from 'react';
import {Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {G, Rect} from 'react-native-svg';
import Header from '../../components/header';
import styles from './styles';

const SvgAnimated = Animated.createAnimatedComponent(Svg);

const Taxi = ({
  style: styleOverride,
  delay,
}: {
  style?: ViewStyle;
  delay: number;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(100, {duration: delay}),
      -1,
      false,
    );
    translateY.value = withRepeat(
      withTiming(100, {duration: delay}),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const rStyle = useAnimatedStyle(() => {
    const translateXAnimation = interpolate(
      translateX.value,
      [0, 25, 50, 75, 100],
      [20, -20, 20, -20, 20],
    );
    const translateYAnimation = interpolate(
      translateY.value,
      [0, 25, 50, 75, 100],
      [-20, 0, 20, 0, -20],
    );
    return {
      transform: [
        {translateX: translateXAnimation},
        {translateY: translateYAnimation},
      ],
    };
  });

  return (
    <Animated.View style={[styles.taxi, rStyle, styleOverride]}>
      <View style={[styles.lights, styles.backLight]} />
      <View style={[styles.lights, styles.frontLight]}>
        <LinearGradient
          colors={['#fff6', 'transparent']}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.lightBeam}
        />
        <LinearGradient
          colors={['#fff6', 'transparent']}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          style={[styles.lightBeam, styles.lightBeamRight]}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.taxiText}>Taxi</Text>
        <View style={styles.taxiCab}>
          <View style={styles.taxiCabTop} />
          <View style={styles.taxiCabCenterLine} />
          <View style={styles.cornerTopLeftRightBottomLine} />
          <View style={styles.cornerTopRightLeftBottomLine} />
        </View>
      </View>
    </Animated.View>
  );
};

function TaxiScreen() {
  const line = useSharedValue(0);

  useEffect(() => {
    line.value = withRepeat(withTiming(60, {duration: 200}), -1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: line.value}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.road}>
          <SvgAnimated
            height="700"
            width="11"
            style={[styles.roadLine, lStyle]}>
            <G>
              {[...Array(25)].map((_, i) => (
                <Rect
                  key={i}
                  x="0"
                  y="0"
                  width="4"
                  height="20"
                  fill="yellow"
                  translateY={i * 40}
                />
              ))}
            </G>
          </SvgAnimated>
          <Taxi delay={1500} />
          <Taxi delay={3000} style={styles.taxi2} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default TaxiScreen;
