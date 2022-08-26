import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width: WIDTH} = Dimensions.get('screen');

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    color: 'gray',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: WIDTH - 32,
    height: WIDTH - 32,

    shadowColor: 'rgba(3, 108, 246, 0.2)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: '#036DF6',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: 'rgba(3, 108, 246, 0.4)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },

  image1: {
    width: WIDTH * 0.45,
    height: 350,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 40,
    zIndex: 4,
  },
  image2: {
    width: WIDTH * 0.4,
    height: 300,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    right: 30,
    zIndex: 3,
  },
  image3: {
    width: WIDTH * 0.45,
    height: 350,
    borderRadius: 20,
    position: 'absolute',
    bottom: 50,
    right: 40,
    zIndex: 2,
  },
  image4: {
    width: WIDTH * 0.45,
    height: 380,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 25,
    zIndex: 1,
  },
});

interface ImageProps {
  key: string;
  image: ImageURISource;
  interpolateOutput: number[];
  style: any;
}

const data: ImageProps[] = [
  {
    key: '1',
    image: require('./images/onboarding-1.jpg'),
    interpolateOutput: [-5, -5.5],
    style: styles.image1,
  },
  {
    key: '2',
    image: require('./images/onboarding-2.jpeg'),
    interpolateOutput: [5, 6],
    style: styles.image2,
  },
  {
    key: '3',
    image: require('./images/onboarding-3.jpg'),
    interpolateOutput: [5, 5.5],
    style: styles.image3,
  },
  {
    key: '4',
    image: require('./images/onboarding-4.jpg'),
    interpolateOutput: [-10, -11],
    style: styles.image4,
  },
];

const AnimatedImage = (
  props: ImageProps & {animated: Animated.SharedValue<number>},
) => {
  const imgStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      props.animated.value,
      [0, 1],
      [...props.interpolateOutput],
    );
    return {
      transform: [{rotate: `${rotate}deg`}],
    };
  });

  return (
    <Animated.Image source={props.image} style={[props.style, imgStyle]} />
  );
};

function OnboardingScreen() {
  const navigation = useNavigation();
  const animated = useSharedValue(0);

  useEffect(() => {
    animated.value = withRepeat(withTiming(1, {duration: 2000}), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animated.value, [0, 1], [0, 10]);
    return {
      transform: [{translateY}],
    };
  });

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>A home for your memories</Text>
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.content, rStyle]}>
            {data.map(d => (
              <AnimatedImage {...d} animated={animated} />
            ))}
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default OnboardingScreen;
