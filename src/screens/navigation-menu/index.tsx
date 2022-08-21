import React from 'react';
import {Image, ImageURISource, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import styles from './styles';

interface ListItemProps {
  id: number;
  icon: ImageURISource;
}

const list: ListItemProps[] = [
  {id: 0, icon: require('./images/home-outline.png')},
  {id: 1, icon: require('./images/person-outline.png')},
  {id: 2, icon: require('./images/settings-outline.png')},
  {id: 3, icon: require('./images/mail-outline.png')},
  {id: 4, icon: require('./images/key-outline.png')},
  {id: 5, icon: require('./images/videocam-outline.png')},
  {id: 6, icon: require('./images/game-controller-outline.png')},
  {id: 7, icon: require('./images/camera-outline.png')},
];

const ListItem = ({item, active}: {item: ListItemProps; active: boolean}) => {
  const rotate = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(rotate.value, [0, 180], [0, 1]),
      transform: [
        {translateX: 120},
        {translateY: 0},
        {rotate: `${(rotate.value / 8) * item.id}deg`},
        {translateX: -translateX.value},
        {translateY: 0},
      ],
    };
  });

  React.useEffect(() => {
    function runAnimation() {
      'worklet';
      if (active) {
        rotate.value = withDelay(
          100 * item.id,
          withTiming(360, {duration: 800}),
        );
        translateX.value = withDelay(
          100 * item.id,
          withTiming(120, {duration: 800}),
        );
      } else {
        rotate.value = withDelay(100 * item.id, withTiming(0, {duration: 800}));
        translateX.value = withDelay(
          100 * item.id,
          withTiming(0, {duration: 800}),
        );
      }
    }

    runAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Animated.View style={[styles.listItem, rStyle]}>
      <TouchableOpacity>
        <Image
          source={item.icon}
          style={[
            styles.listItemIcon,
            {transform: [{rotate: `${(360 / -8) * item.id}deg`}]},
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

function NavigationMenuScreen() {
  const rotate = useSharedValue(0);
  const [active, setActive] = React.useState(false);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(`${rotate.value}deg`, {duration: 1200}),
        },
      ],
    };
  });

  const onPress = () => {
    'worklet';
    if (rotate.value === 0) {
      rotate.value = 315;
    } else {
      rotate.value = 0;
    }
    runOnJS(setActive)(!active);
  };

  return (
    <LinearGradient
      colors={['#8460ed', '#ff1252']}
      style={styles.linearGradient}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Animated.View style={rStyle}>
              <TouchableOpacity style={styles.plusButton} onPress={onPress}>
                <Image
                  source={require('./images/add-outline.png')}
                  style={styles.plusIcon}
                />
              </TouchableOpacity>
            </Animated.View>
            {list.map(item => (
              <ListItem key={item.id} item={item} active={active} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default NavigationMenuScreen;
