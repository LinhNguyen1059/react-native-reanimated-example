import {StyleSheet} from 'react-native';

const TAXI_WIDTH = 80;
const TAXI_HEIGHT = 180;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  road: {
    width: 150,
    height: 600,
    backgroundColor: '#333333',
    borderRadius: 75,
    overflow: 'hidden',
    alignItems: 'center',
  },
  roadLine: {
    marginTop: -92,
  },

  taxi: {
    position: 'absolute',
    bottom: 50,
    width: TAXI_WIDTH,
    height: TAXI_HEIGHT,
    backgroundColor: '#f4b603',
    borderRadius: 10,

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  lights: {
    position: 'absolute',
    left: 12,
    width: 15,
    height: 5,
    shadowOffset: {
      width: 42,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 2,
  },
  backLight: {
    bottom: 2,
    backgroundColor: '#fc3c25',
    shadowColor: '#fc3c25',
  },
  frontLight: {
    top: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff',
  },
  body: {
    position: 'absolute',
    top: 10,
    left: 5,
    width: TAXI_WIDTH - 10,
    height: TAXI_HEIGHT - 20,
    backgroundColor: '#fdd206',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taxiText: {
    backgroundColor: '#ffffff',
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: 2,
    borderRadius: 2,
    overflow: 'hidden',
    letterSpacing: 1,
    zIndex: 10,
  },
  taxiCab: {
    position: 'absolute',
    top: 30,
    backgroundColor: '#111111',
    borderRadius: 10,
    width: TAXI_WIDTH - 10,
    height: TAXI_HEIGHT - 80,
    zIndex: 1,
    overflow: 'hidden',
  },
  taxiCabTop: {
    position: 'absolute',
    top: 20,
    left: 7,
    backgroundColor: '#fdd206',
    borderRadius: 10,
    width: TAXI_WIDTH - 24,
    height: TAXI_HEIGHT - 120,
    zIndex: 2,
  },
  taxiCabCenterLine: {
    position: 'absolute',
    top: TAXI_HEIGHT - 130,
    width: TAXI_WIDTH - 10,
    height: 3,
    backgroundColor: '#fdd206',
  },
  cornerTopLeftRightBottomLine: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 5,
    backgroundColor: '#fdd206',
    transform: [
      {translateX: -8},
      {translateY: -8},
      {rotate: '70deg'},
      {translateX: 10},
      {translateY: 10},
    ],
    shadowColor: '#fdd206',
    shadowOffset: {
      width: 100,
      height: -25,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  cornerTopRightLeftBottomLine: {
    position: 'absolute',
    top: 0,
    // right: 0,
    width: 40,
    height: 5,
    backgroundColor: '#fdd206',
    transform: [
      {translateX: 52},
      {translateY: 52},
      {rotate: '-70deg'},
      {translateX: -50},
      {translateY: -50},
    ],
    shadowColor: '#fdd206',
    shadowOffset: {
      width: 90,
      height: 27,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    zIndex: 20,
  },
  lightBeam: {
    position: 'absolute',
    top: 0,
    width: 15,
    height: 150,
    transform: [{translateY: -150}],
  },
  lightBeamRight: {
    right: -42,
  },

  taxi2: {
    top: 100,
  },
});
