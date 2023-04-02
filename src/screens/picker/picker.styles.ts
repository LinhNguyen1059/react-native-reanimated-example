import {StyleSheet} from 'react-native';

export const itemHeight = 32;
export const numberVisibleItems = 5;
export const opacityInactiveItem = 0.97;

export default StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemText: {
    textAlign: 'center',
    fontSize: 23,
  },
  container: {
    height: itemHeight * numberVisibleItems,
    flex: 1,
  },
});
