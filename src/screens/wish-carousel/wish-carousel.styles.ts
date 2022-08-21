import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const IMAGE_BOTTOM_VIEW_WIDTH = width / 5;
const IMAGE_BOTTOM_WIDTH = 50;
const BOTTOM_HEIGHT = 180;
const RING_WIDTH = 65;

export default StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    width,
    height,
    overflow: 'hidden',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width,
    height: BOTTOM_HEIGHT,
    justifyContent: 'center',
  },
  bottomListWrapper: {
    width: IMAGE_BOTTOM_VIEW_WIDTH,
    height: IMAGE_BOTTOM_VIEW_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomImage: {
    width: IMAGE_BOTTOM_WIDTH,
    height: IMAGE_BOTTOM_WIDTH,
    resizeMode: 'cover',
    borderRadius: IMAGE_BOTTOM_WIDTH / 2,
  },
  bottomContent: {
    alignSelf: 'center',
  },
  separator: {
    width: (width - IMAGE_BOTTOM_WIDTH * 5 - 32) / 4,
  },
  ringCenter: {
    width: RING_WIDTH,
    height: RING_WIDTH,
    borderRadius: RING_WIDTH / 2,
    borderWidth: 3,
    borderColor: 'white',
    position: 'absolute',
    left: width / 2 - RING_WIDTH / 2,
    top: BOTTOM_HEIGHT / 2 - RING_WIDTH / 2,
  },
});
