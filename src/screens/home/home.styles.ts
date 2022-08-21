import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
