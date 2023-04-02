import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  arrowButton: {
    width: 24,
    height: 24,
  },
  arrowImage: {
    width: 24,
    height: 24,
  },
  arrowDisabled: {
    opacity: 0.3,
  },

  itemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weeksContainer: {
    flexDirection: 'row',
  },
  itemContent: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  weekItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    flex: 1,
  },
  weekItemText: {
    fontSize: 16,
    color: '#757575',
  },
  dayItemSelected: {
    backgroundColor: '#00AFFF',
  },
  dayItemText: {
    fontSize: 16,
    color: '#212121',
  },
  dayItemTextDisabled: {
    color: '#BDBDBD',
  },
  dayItemTextToday: {
    color: '#00AFFF',
  },
  dayItemTextSelected: {
    color: '#FFFFFF',
  },

  monthListContainer: {
    paddingHorizontal: 12,
  },
  monthItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  monthItemWrapper: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  monthItemText: {
    fontSize: 16,
    color: '#212121',
  },
  monthItemSelected: {
    backgroundColor: '#00AFFF',
  },
  monthItemTextSelected: {
    color: '#FFFFFF',
  },
  monthItemTextDisabled: {
    color: '#BDBDBD',
  },
});
