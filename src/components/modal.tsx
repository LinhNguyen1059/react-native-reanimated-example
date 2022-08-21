import React, {useEffect} from 'react';
import {Dimensions, StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {
  GestureHandlerRootView,
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

interface ModalProps {
  backdropColor?: string;
  backdropOpacity?: number;
  onBackdropPress?: () => void;
  children: React.ReactNode;
  isVisible: boolean;
  style?: ViewStyle;
}

export default function Modal(props: ModalProps) {
  const {
    backdropColor,
    children,
    backdropOpacity = 0.5,
    isVisible = false,
    onBackdropPress,
    style: styleOverride,
  } = props;
  const animated = useSharedValue(0);
  const isActive = useSharedValue(false);
  const pressed = useSharedValue(false);

  const backdropPressed = () => {
    onBackdropPress && onBackdropPress();
  };

  useAnimatedReaction(
    () => pressed.value,
    result => {
      ('worklet');
      if (result === true) {
        runOnJS(backdropPressed)();
        pressed.value = false;
      }
    },
    [pressed],
  );

  useEffect(() => {
    if (isVisible) {
      animated.value = withTiming(1, {duration: 300});
      isActive.value = true;
      pressed.value = false;
      StatusBar.setTranslucent(true);
    } else {
      animated.value = withTiming(0, {duration: 300});
      isActive.value = false;
      StatusBar.setTranslucent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const onTapGestureHandler = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      pressed.value = true;
    }
  };
  const onChildTapGestureHandler = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      pressed.value = false;
    }
  };

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animated.value, [0, 1], [0, backdropOpacity]);
    const top = isActive.value ? 0 : SCREEN_HEIGHT;
    return {opacity, top};
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const top = interpolate(animated.value, [0, 1], [SCREEN_HEIGHT, 0]);
    return {top};
  });

  const gestureStyle = isVisible ? {right: 0} : {right: SCREEN_WIDTH};

  return (
    <GestureHandlerRootView style={[styles.gesture, gestureStyle]}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.backdrop,
            {backgroundColor: backdropColor, opacity: backdropOpacity},
            backdropAnimatedStyle,
          ]}
        />
        <TapGestureHandler onHandlerStateChange={onTapGestureHandler}>
          <Animated.View
            style={[styles.content, styleOverride, contentAnimatedStyle]}>
            <TapGestureHandler onHandlerStateChange={onChildTapGestureHandler}>
              <Animated.View>{children}</Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  container: {
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: SCREEN_WIDTH / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  content: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
});
