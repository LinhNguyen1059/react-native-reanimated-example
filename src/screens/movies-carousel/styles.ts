import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const SPACING = 30;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.82 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    alignItems: 'flex-end',
  },
  movieContainer: {
    width: ITEM_SIZE,
  },
  movieWrapper: {
    marginHorizontal: SPACING / 2,
    paddingTop: SPACING,
    backgroundColor: 'white',
    borderRadius: ITEM_SIZE / 2,
    alignItems: 'center',
    // paddingBottom: SPACING * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  mainImage: {
    paddingHorizontal: SPACING,
    width: '100%',
    height: width * 0.8,
  },
  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: ITEM_SIZE / 2,
  },

  movieDetails: {
    marginTop: 20,
  },
  movieName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieYear: {
    textAlign: 'center',
  },
  movieGenreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  movieGenreContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#6b6b6b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  movieGenre: {
    fontSize: 12,
  },
  movieRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ratingActive: {
    color: '#ffb428',
    fontSize: 20,
  },
  ratingDisabled: {
    color: '#c9c9c9',
    fontSize: 20,
  },

  movieButton: {
    backgroundColor: '#000',
    width: ITEM_SIZE - SPACING * 3,
    height: ITEM_SIZE - SPACING * 6,
    borderRadius: SPACING,
    marginBottom: -60,
  },
  movieButtonText: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
  },

  emptyItem: {
    width: EMPTY_ITEM_SIZE,
  },

  backdrop: {
    position: 'absolute',
    width: '100%',
    height: BACKDROP_HEIGHT,
  },
  linearGradient: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
    bottom: 0,
  },
  backdropFlatList: {
    width,
    height: BACKDROP_HEIGHT,
  },

  backdropItemContainer: {
    position: 'absolute',
    height,
    overflow: 'hidden',
  },
  backdropImage: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
  },
});
