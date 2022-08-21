import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeb3d',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pulse: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ff5722',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ff5722',
    borderRadius: 100,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  rocketFire: {
    width: 20,
    height: 250,
    position: 'absolute',
    bottom: -255,
    left: 26,
  },
});
