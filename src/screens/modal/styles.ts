import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  modal: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingBottom: 200,
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
  },
});
