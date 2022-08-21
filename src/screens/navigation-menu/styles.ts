import {Dimensions, StyleSheet} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const PLUS_BUTTON_WIDTH = 100;
const BUTTON_WIDTH = 60;

export default StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    height: WIDTH,
    alignSelf: 'center',
  },
  plusButton: {
    width: PLUS_BUTTON_WIDTH,
    height: PLUS_BUTTON_WIDTH,
    borderRadius: PLUS_BUTTON_WIDTH / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    width: PLUS_BUTTON_WIDTH - 40,
    height: PLUS_BUTTON_WIDTH - 40,
  },
  listItem: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: WIDTH / 10,
    zIndex: -1,
  },
  listItemIcon: {
    width: BUTTON_WIDTH - 40,
    height: BUTTON_WIDTH - 40,
  },
});
