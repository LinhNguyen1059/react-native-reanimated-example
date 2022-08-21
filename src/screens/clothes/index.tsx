import React, {useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageURISource,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/header';
import styles from './clothes.styles';

const {width: WIDTH} = Dimensions.get('window');

interface ListItemProps {
  id: number;
  name: string;
  image: ImageURISource;
  price: number;
}
interface ItemProps {
  item: ListItemProps;
  onPress: () => void;
}

const list: ListItemProps[] = [
  {
    id: 1,
    name: 'Selfridges Capsule',
    image: require('./images/img-1.jpeg'),
    price: 50,
  },
  {
    id: 2,
    name: 'Activewear Drop 2',
    image: require('./images/img-2.jpeg'),
    price: 50,
  },
  {
    id: 3,
    name: 'Shirting Capsule SS22',
    image: require('./images/img-3.jpeg'),
    price: 50,
  },
  {
    id: 4,
    name: 'Prince x Sporty & Rich Pt.2',
    image: require('./images/img-4.jpeg'),
    price: 50,
  },
  {
    id: 5,
    name: 'Prince x Sporty & Rich',
    image: require('./images/img-5.jpeg'),
    price: 50,
  },
  {
    id: 6,
    name: 'Cold Weather Drop',
    image: require('./images/img-6.jpeg'),
    price: 50,
  },
  {
    id: 7,
    name: 'Activewear Collection',
    image: require('./images/img-7.png'),
    price: 50,
  },
  {
    id: 8,
    name: 'Solid & Striped Collab',
    image: require('./images/img-8.jpeg'),
    price: 50,
  },
  {
    id: 9,
    name: 'Tennis Capsule Pt.2',
    image: require('./images/img-9.png'),
    price: 50,
  },
];

const ListItem = (props: ItemProps) => {
  const {item, onPress} = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const {height: imgHeight, width: imgWidth} = Image.resolveAssetSource(
    item.image,
  );

  const actuallyHeight = ((WIDTH - 32) * imgHeight) / imgWidth;
  const viewHeight = {
    height: actuallyHeight,
    width: '100%',
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      height: isOpen
        ? withTiming(actuallyHeight, {duration: 300})
        : withDelay(500, withTiming(200, {duration: 300})),
    };
  });

  const tStyle = useAnimatedStyle(() => {
    const translateY = isOpen
      ? withDelay(500, withTiming(0, {duration: 300}))
      : withTiming(10, {duration: 300});
    const opacity = isOpen
      ? withDelay(500, withTiming(1, {duration: 300}))
      : withTiming(0, {duration: 300});

    return {
      opacity,
      transform: [{translateY}],
    };
  });

  const onItemPress = () => {
    setIsOpen(!isOpen);
    onPress && onPress();
  };

  return (
    <View style={styles.listItemContainer}>
      <TouchableOpacity onPress={onItemPress}>
        <Animated.View style={[styles.listItemView, rStyle]}>
          <View style={viewHeight}>
            <Image source={item.image} style={styles.listItemImage} />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', '#000000']}
              style={styles.listNamePrice}>
              <Animated.Text style={[styles.listNameText, tStyle]}>
                {item.name}
              </Animated.Text>
              <Animated.Text style={[styles.listPriceText, tStyle]}>
                $ {item.price.toFixed(2)}
              </Animated.Text>
            </LinearGradient>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

function ClothesScreen() {
  const inset = useSafeAreaInsets();
  const ref = useRef<FlatList>(null);
  const flatListContentStyle = {paddingBottom: inset.bottom};

  const onPress = (index: number) => {
    ref.current?.scrollToIndex({index, animated: true});
  };

  return (
    <SafeAreaView>
      <Header />
      <FlatList
        ref={ref}
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <ListItem item={item} onPress={() => onPress(index)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={flatListContentStyle}
      />
    </SafeAreaView>
  );
}

export default ClothesScreen;
