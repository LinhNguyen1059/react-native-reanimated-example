import React from 'react';
import {
  Dimensions,
  Image,
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
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const data = [
  {id: '1', image: require('./images/home.png'), title: 'Home', type: 'home'},
  {
    id: '2',
    image: require('./images/search.png'),
    title: 'Explore',
    type: 'explore',
  },
  {
    id: '3',
    image: require('./images/plus.png'),
    title: 'Home',
    type: 'big-plus',
  },
  {
    id: '4',
    image: require('./images/kanban.png'),
    title: 'Stats',
    type: 'stats',
  },
  {
    id: '5',
    image: require('./images/settings.png'),
    title: 'Settings',
    type: 'settings',
  },
];

const ITEM_WIDTH = SCREEN_WIDTH / data.length;
const ITEM_CONTENT_HEIGHT = ITEM_WIDTH / 2.2;

interface ItemProps {
  image: ImageURISource;
  title: string;
  type: string;
  onPress: () => void;
  isActive: boolean;
}

const Item = ({image, title, type, isActive, onPress}: ItemProps) => {
  const value = useSharedValue(0);

  React.useEffect(() => {
    if (isActive) {
      value.value = withSpring(1);
    } else {
      value.value = withSpring(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      value.value,
      [1, 0],
      [-ITEM_CONTENT_HEIGHT, 0],
    );
    return {
      transform: [{translateY}],
    };
  });

  if (type === 'big-plus') {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.plusButton}>
          <Image source={image} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemContent}>
        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Animated.Image source={image} style={[styles.icon]} />
          <Text style={styles.text}>{title}</Text>
          <View style={styles.dot} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default function TabBarScreen() {
  const [typeActive, setTypeActive] = React.useState<string>('home');

  const onPress = (type: string) => {
    setTypeActive(type);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <View style={{flex: 1}} />
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.itemsContainer}>
          {data.map(item => (
            <Item
              {...item}
              onPress={() => onPress(item.type)}
              isActive={typeActive === item.type}
            />
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH / 1.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  plusButton: {
    backgroundColor: '#000',
    borderRadius: ITEM_WIDTH / 2,
    width: ITEM_WIDTH / 1.5,
    height: ITEM_WIDTH / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  itemContent: {
    height: ITEM_CONTENT_HEIGHT,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    height: ITEM_CONTENT_HEIGHT * 2,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
  },
});
