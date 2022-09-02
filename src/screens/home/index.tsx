import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ICON} from '../../icons';
import {Routes} from '../../navigation/routes';
import styles from './home.styles';

interface ListItemProps {
  id: number;
  name: string;
  route: string;
}

const list: ListItemProps[] = [
  {id: 1, name: '🧞‍♂️ Wish carousel', route: Routes.WISH_CAROUSEL},
  {id: 2, name: '👗 Clothes', route: Routes.CLOTHES},
  {id: 3, name: '🚀 Rocket', route: Routes.ROCKET},
  {id: 4, name: '🎛 Navigation menu', route: Routes.NAVIGATION_MENU},
  {id: 5, name: '🚕 Taxi', route: Routes.TAXI},
  {id: 6, name: '👀 Eyes follow', route: Routes.EYES_FOLLOW},
  {id: 7, name: '📱 Scroll header', route: Routes.SCROLL_HEADER},
  {id: 8, name: '🍿 Movies carousel', route: Routes.MOVIES_CAROUSEL},
  {id: 9, name: '🌃 Images modal carousel', route: Routes.IMAGE_MODAL_CAROUSEL},
  {id: 10, name: '🤳 Modal', route: Routes.MODAL},
  {id: 11, name: '🌈 Carousel infinite', route: Routes.CAROUSEL_INFINITE},
  {id: 12, name: '🩴 Onboarding', route: Routes.ONBOARDING},
  {id: 13, name: '🍹 Tab bar', route: Routes.TAB_BAR},
];

function HomeScreen() {
  const navigation = useNavigation();
  const gotoRoute = (route: string) => {
    // @ts-ignore
    navigation.navigate(route);
  };

  const ListItem = ({item}: {item: ListItemProps}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => gotoRoute(item.route)}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Image source={ICON['arrow-right']} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={list}
        renderItem={ListItem}
        keyExtractor={(item: ListItemProps) => `${item.id}`}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
