import {Dimensions, StyleSheet} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
    paddingBottom: 5,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
  },
  header: {
    position: 'absolute',
    zIndex: 2,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 280,
    resizeMode: 'cover',
  },
  smallImage: {
    ...StyleSheet.absoluteFillObject,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  imageSmallContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 10,
    bottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  anotherContent: {
    height: SCREEN_HEIGHT,
  },

  modal: {
    margin: 0,
  },
  modalContentContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  close: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    width: (SCREEN_WIDTH - 12) / 3,
    height: (SCREEN_WIDTH - 12) / 3,
    margin: 2,
  },
  imageItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  closeBtnContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  smallImageModalContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallImageModal: {
    width: SCREEN_WIDTH,
    height: 280,
    resizeMode: 'cover',
  },
  flatListContainer: {
    flex: 1,
    alignItems: 'center',
  },

  thumbContainer: {
    width: 100,
    height: 100,
    paddingHorizontal: 2,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
