import React from 'react';
import {View} from 'react-native';
import {AnimatedFlashList} from '@shopify/flash-list';
import {useSharedValue} from 'react-native-reanimated';

import PickerItem, {ItemProps} from './item';
import styles, {itemHeight, numberVisibleItems} from './picker.styles';

interface PickerProps {
  onValueChange?: (value: string) => void;
  textColor?: string;
  data: ItemProps[];
  initialIndex?: number;
  itemHeight?: number;
}

function Picker(props: PickerProps) {
  const {onValueChange, textColor, data, initialIndex = -1} = props;
  const half = (numberVisibleItems - 1) / 2;
  const scrollPosition = useSharedValue(0);

  const renderItem = ({item, index}: {item: ItemProps; index: number}) => (
    <PickerItem
      item={item}
      i={index}
      h={itemHeight}
      scrollPosition={scrollPosition}
      half={half}
      textColor={textColor}
    />
  );

  return (
    <View style={styles.container}>
      <AnimatedFlashList
        data={data}
        contentContainerStyle={{
          paddingTop: itemHeight * half,
          paddingBottom: itemHeight * half,
        }}
        renderItem={renderItem}
        estimatedItemSize={itemHeight}
        showsVerticalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate={0.97}
        removeClippedSubviews
        snapToOffsets={data.map((_, index) => index * itemHeight)}
        onScroll={event => {
          scrollPosition.value = event.nativeEvent.contentOffset.y / itemHeight;
        }}
        initialScrollIndex={initialIndex}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.y / itemHeight,
          );
          onValueChange && onValueChange(data[index].value);
        }}
      />
    </View>
  );
}

export default Picker;
