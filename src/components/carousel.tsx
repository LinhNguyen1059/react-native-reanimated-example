import React, {forwardRef, memo, useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const AnimatedFlashList = Animated.createAnimatedComponent(FlatList);

const FlashListForwardRef = forwardRef<FlatList<any>, FlatListProps<any>>(
  (props, ref) => {
    return <AnimatedFlashList ref={ref} {...props} />;
  },
);

interface IProps {
  data: any[];
  keyExtractor: ((item: any, index: number) => string) | undefined;
  renderItem: ListRenderItem<any> | null | undefined;
  itemWidth?: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
}

const Carousel = (props: IProps) => {
  const {
    data,
    itemWidth = SCREEN_WIDTH,
    autoPlay = false,
    autoPlaySpeed = 5000,
    renderItem,
    keyExtractor,
  } = props;
  const flashListRef = useAnimatedRef<FlatList<any>>();
  const timerId = useRef<any>(null);
  const currentIndex = useRef<number>(0);
  const isPlaying = useSharedValue<boolean>(true);

  const gotoNextSlide = () => {
    if (currentIndex.current === data.length - 1) {
      currentIndex.current = 0;
      flashListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    } else {
      flashListRef.current?.scrollToIndex({
        index: ++currentIndex.current,
        animated: true,
      });
    }
  };

  const startAutoPlay = () => {
    timerId.current = setInterval(() => {
      gotoNextSlide();
    }, autoPlaySpeed);
  };

  const stopAutoPlay = () => {
    clearInterval(timerId.current);
  };

  useEffect(() => {
    if (flashListRef.current && autoPlay) {
      stopAutoPlay();
      startAutoPlay();
    }

    return () => {
      stopAutoPlay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const onScrollMomentumEnd = (index: number) => {
    currentIndex.current = index;
    startAutoPlay();
  };

  const onScrollBeginDrag = () => {
    if (autoPlay) {
      stopAutoPlay();
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: () => {
      if (autoPlay) {
        isPlaying.value = false;
        runOnJS(onScrollBeginDrag)();
      }
    },
    onMomentumEnd: (event: NativeScrollEvent) => {
      const {contentOffset, layoutMeasurement} = event;
      const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);
      if (!isPlaying.value) {
        isPlaying.value = true;
        runOnJS(onScrollMomentumEnd)(pageNum);
      }
    },
  });

  return (
    <FlashListForwardRef
      ref={flashListRef}
      data={data}
      keyExtractor={keyExtractor}
      // @ts-ignore
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={4}
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      })}
      initialScrollIndex={currentIndex.current}
    />
  );
};

export default memo(Carousel);
