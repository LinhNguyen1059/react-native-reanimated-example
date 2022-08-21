import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageModalCarouselProps, imageModalData} from './data';
import styles from './styles';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

// @ts-ignore
export default function ModalCarouselScreen(props) {
  const {initialIndex} = props.route.params;
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const topRef = React.useRef<FlatList>(null);
  const bottomRef = React.useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const thumbStyles = {position: 'absolute', bottom: inset.bottom} as ViewStyle;

  const onClosePress = () => {
    navigation.goBack();
  };

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {contentOffset, contentSize} = event.nativeEvent;
    const index = Math.floor(
      (contentOffset.x / contentSize.width) * imageModalData.length,
    );
    bottomRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const onThumbItemPress = (index: number) => {
    topRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const renderItem = ({item}: {item: ImageModalCarouselProps}) => {
    return (
      <View style={styles.smallImageModalContainer}>
        <Image source={item.image} style={styles.smallImageModal} />
      </View>
    );
  };

  const renderFlashListItem = ({
    item,
    index,
  }: {
    item: ImageModalCarouselProps;
    index: number;
  }) => {
    const imgStyle =
      index === currentIndex ? {borderWidth: 2, borderColor: '#000000'} : {};
    return (
      <TouchableOpacity
        style={styles.thumbContainer}
        onPress={() => onThumbItemPress(index)}>
        <Image source={item.image} style={[styles.thumbImage, imgStyle]} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity style={styles.closeBtnContainer} onPress={onClosePress}>
        <Text>Close</Text>
      </TouchableOpacity>

      <FlatList
        ref={topRef}
        data={imageModalData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        initialScrollIndex={initialIndex}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, idx) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * idx,
          index: idx,
        })}
        contentContainerStyle={styles.flatListContainer}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />

      <FlatList
        ref={bottomRef}
        data={imageModalData}
        keyExtractor={item => item.id}
        renderItem={renderFlashListItem}
        getItemLayout={(_, idx) => ({
          length: 100,
          offset: 100 * idx,
          index: idx,
        })}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        style={thumbStyles}
      />
    </SafeAreaView>
  );
}
