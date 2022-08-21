import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageURISource,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/header';

import {IMAGE} from './images';
import styles from './wish-carousel.styles';

const {width} = Dimensions.get('window');

export interface ListItemProps {
  id: number;
  image: ImageURISource;
}

const list: ListItemProps[] = [
  {id: 1, image: IMAGE[1]},
  {id: 2, image: IMAGE[2]},
  {id: 3, image: IMAGE[3]},
  {id: 4, image: IMAGE[4]},
  {id: 5, image: IMAGE[5]},
];
const listBottom: ListItemProps[] = [
  {id: 1, image: null},
  {id: 2, image: null},
  {id: 3, image: IMAGE[1]},
  {id: 4, image: IMAGE[2]},
  {id: 5, image: IMAGE[3]},
  {id: 6, image: IMAGE[4]},
  {id: 7, image: IMAGE[5]},
  {id: 8, image: null},
  {id: 9, image: null},
];

function WishCarouselScreen() {
  const topRef = useRef<FlatList>(null);
  const bottomRef = useRef<FlatList>(null);
  const scrollX = new Animated.Value(0);
  const inset = useSafeAreaInsets();

  const headerStyles = [styles.header, {marginTop: inset.top}] as ViewStyle;

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {contentOffset, contentSize} = event.nativeEvent;
    bottomRef.current?.scrollToOffset({
      offset: (contentOffset.x / contentSize.width) * width,
      animated: true,
    });
  };

  const onBottomItemPress = (index: number) => {
    topRef.current?.scrollToIndex({
      index: index - 2,
      animated: true,
    });
    bottomRef.current?.scrollToIndex({
      index: index - 2,
      animated: true,
    });
  };

  const ListItem = ({item, index}: {item: ListItemProps; index: number}) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width * 0.7, 0, width * 0.7],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.listWrapper}>
        <Animated.Image
          source={item.image}
          style={[styles.image, {transform: [{translateX}]}]}
        />
      </View>
    );
  };

  const BottomListItem = ({
    item,
    index,
  }: {
    item: ListItemProps;
    index: number;
  }) => {
    return (
      <View style={styles.bottomListWrapper}>
        {item.image ? (
          <TouchableOpacity onPress={() => onBottomItemPress(index)}>
            <Image source={item.image} style={styles.bottomImage} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header style={headerStyles} />
      <Animated.FlatList
        data={list}
        ref={topRef}
        renderItem={ListItem}
        keyExtractor={(item: ListItemProps) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={2}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <View>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)', '#000000']}
          style={styles.bottom}>
          <FlatList
            ref={bottomRef}
            data={listBottom}
            renderItem={BottomListItem}
            keyExtractor={(item: ListItemProps) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bottomContent}
            bounces={false}
            initialScrollIndex={2}
            scrollEnabled={false}
            getItemLayout={(_, index) => ({
              length: width / 5,
              offset: (width / 5) * index,
              index,
            })}
          />
          <View style={styles.ringCenter} />
        </LinearGradient>
      </View>
    </View>
  );
}

export default WishCarouselScreen;
