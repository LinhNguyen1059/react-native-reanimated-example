import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import styles from './styles';

const PulseItem = ({delay}: {delay: number}) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
        }),
        -1,
        false,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Animated.View style={[styles.pulseItem, ringStyle]} />;
};

function RocketScreen() {
  const fire = useSharedValue(-1);

  React.useEffect(() => {
    fire.value = withRepeat(withTiming(1, {duration: 100}), -1, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(fire.value, [0, 1], [-1, 1]);
    return {
      transform: [{translateY}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.pulse}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <PulseItem key={index} delay={200 * index} />
          ))}
          <Animated.View style={rStyle}>
            <Image source={require('./rocket.png')} />
            <LinearGradient
              colors={['#ffc107', 'rgba(255, 193, 7, 0.1)']}
              style={styles.rocketFire}
            />
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RocketScreen;
