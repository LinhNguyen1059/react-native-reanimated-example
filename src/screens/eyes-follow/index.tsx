import React, {useRef} from 'react';
import {LayoutChangeEvent, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header';
import styles from './styles';

function EyesFollowScreen() {
  const eyeRef = useRef<View>(null);
  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      // console.log(
      //   '🚀 ~ file: index.tsx ~ line 12 ~ EyesFollowScreen ~ event',
      //   event,
      // );
    },
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 25 ~ handleLayout ~ event',
      event.nativeEvent,
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header />
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View style={styles.content}>
            <View style={styles.box}>
              <View style={styles.hair} />
              <View style={styles.bottom}>
                <View style={styles.shirt} />
                <View style={styles.leftShirtStrap} />
                <View style={styles.rightShirtStrap} />
                <View style={styles.shirtButton} />
              </View>
              <View style={styles.head}>
                <View style={styles.neck}>
                  <View style={styles.neckShadow} />
                </View>
                <View style={styles.face}>
                  <View style={styles.eyes}>
                    <View>
                      <View style={styles.eyebrow} />
                      <View style={styles.eye} onLayout={handleLayout}>
                        <View style={styles.pupil}>
                          <View style={styles.blackPupil} />
                        </View>
                      </View>
                    </View>
                    <View>
                      <View style={styles.eyebrow} />
                      <View style={styles.eye}>
                        <View style={styles.pupil}>
                          <View style={styles.blackPupil} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.mouth}>
                    <View style={styles.mouthInside} />
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default EyesFollowScreen;
