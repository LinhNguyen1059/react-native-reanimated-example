import React from 'react';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import styles, {opacityInactiveItem} from './picker.styles';

export interface ItemProps {
  label: string;
  value: string;
}

interface PickerItemProps {
  item: ItemProps;
  i: number;
  scrollPosition: Animated.SharedValue<number>;
  h: number;
  half: number;
  textColor?: string;
}

const PickerItem = ({
  item,
  i,
  scrollPosition,
  h,
  half,
  textColor,
}: PickerItemProps) => {
  const animatedItem = useDerivedValue(() => {
    const v = (scrollPosition.value - i) / (half + 1);
    if (v <= -1) {
      return -1;
    }
    if (v >= 1) {
      return 1;
    }
    return v;
  });

  const childViewStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: half * 100},
      {rotateX: `${90 * animatedItem.value}deg`},
      {
        scale: 1 - 0.1 * Math.abs(animatedItem.value),
      },
    ],
    opacity: 1 - opacityInactiveItem * Math.abs(animatedItem.value),
  }));

  return (
    <Animated.View style={[styles.item, {height: h}, childViewStyle]}>
      <Text style={[styles.itemText, {color: textColor}]}>{item.label}</Text>
    </Animated.View>
  );
};

export default PickerItem;
