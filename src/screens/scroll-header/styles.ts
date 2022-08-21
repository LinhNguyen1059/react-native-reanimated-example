import {StyleSheet} from 'react-native';

const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

export default StyleSheet.create({
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 4,
    top: -4,
    left: -5,
  },
  searchText: {
    position: 'absolute',
    left: 48,
    top: 6,
    width: 100,
    height: 13,
    backgroundColor: '#e8e8e8',
    borderRadius: 4,
  },

  featureText: {
    marginTop: 12,
    width: 50,
    height: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 4,
  },
  container: {
    flex: 1,
  },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#AF0C6E',
  },
  upperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 8,
  },
  bell: {
    width: 16,
    height: 16,
    marginHorizontal: 32,
  },
  lowerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: LOWER_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  feature: {
    alignItems: 'center',
  },

  spaceForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
});
