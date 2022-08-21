import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import {Routes} from '../../navigation/routes';
import {ImageModalCarouselProps, imageModalData} from './data';
import styles from './styles';

// @ts-ignore
export default function ListImageScreen() {
  const navigation = useNavigation();

  const onImageItemPress = (index: number) => {
    // @ts-ignore
    navigation.navigate(Routes.MODAL_CAROUSEL, {initialIndex: index});
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ImageModalCarouselProps;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => onImageItemPress(index)}>
        <Animated.Image
          entering={FadeInDown.duration(100 * index)}
          source={item.image}
          style={styles.imageItem}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlashList
        data={imageModalData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        estimatedItemSize={80}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
