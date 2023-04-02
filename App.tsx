/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Routes} from './src/navigation/routes';
import WishCarouselScreen from './src/screens/wish-carousel';
import HomeScreen from './src/screens/home';
import ClothesScreen from './src/screens/clothes';
import RocketScreen from './src/screens/rocket';
import NavigationMenuScreen from './src/screens/navigation-menu';
import TaxiScreen from './src/screens/taxi';
import EyesFollowScreen from './src/screens/eyes-follow';
import ScrollHeaderScreen from './src/screens/scroll-header';
import MoviesCarouselScreen from './src/screens/movies-carousel';
import ImageModalCarouselScreen from './src/screens/image-modal-carousel';
import ModalCarouselScreen from './src/screens/image-modal-carousel/modal-screen';
import ListImageScreen from './src/screens/image-modal-carousel/list-image-screen';
import ModalScreen from './src/screens/modal';
import CarouselInfiniteScreen from './src/screens/carousel-infinite';
import OnboardingScreen from './src/screens/onboarding';
import TabBarScreen from './src/screens/tab-bar';
import PickerScreen from './src/screens/picker';
import CalendarScreen from './src/screens/calendar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName={Routes.HOME}
        screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name={Routes.WISH_CAROUSEL}
            component={WishCarouselScreen}
          />
          <Stack.Screen name={Routes.CLOTHES} component={ClothesScreen} />
          <Stack.Screen name={Routes.ROCKET} component={RocketScreen} />
          <Stack.Screen
            name={Routes.NAVIGATION_MENU}
            component={NavigationMenuScreen}
          />
          <Stack.Screen name={Routes.TAXI} component={TaxiScreen} />
          <Stack.Screen
            name={Routes.EYES_FOLLOW}
            component={EyesFollowScreen}
          />
          <Stack.Screen
            name={Routes.SCROLL_HEADER}
            component={ScrollHeaderScreen}
          />
          <Stack.Screen
            name={Routes.MOVIES_CAROUSEL}
            component={MoviesCarouselScreen}
          />
          <Stack.Screen
            name={Routes.IMAGE_MODAL_CAROUSEL}
            component={ImageModalCarouselScreen}
          />
          <Stack.Screen name={Routes.LIST_IMAGE} component={ListImageScreen} />
          <Stack.Screen name={Routes.MODAL} component={ModalScreen} />
          <Stack.Screen
            name={Routes.CAROUSEL_INFINITE}
            component={CarouselInfiniteScreen}
          />
          <Stack.Screen name={Routes.ONBOARDING} component={OnboardingScreen} />
          <Stack.Screen name={Routes.TAB_BAR} component={TabBarScreen} />
          <Stack.Screen name={Routes.PICKER} component={PickerScreen} />
          <Stack.Screen name={Routes.CALENDAR} component={CalendarScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name={Routes.MODAL_CAROUSEL}
            component={ModalCarouselScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
