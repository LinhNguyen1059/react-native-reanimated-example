import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  listItemContainer: {
    paddingHorizontal: 16,
  },
  listItemView: {
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  listItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'flex-start',
  },
  listNamePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 16,
    height: 60,
  },
  listNameText: {
    fontSize: 16,
    color: 'white',
    opacity: 0,
  },
  listPriceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0,
  },
  separator: {
    height: 20,
  },
});
