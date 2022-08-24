import React, {forwardRef, memo, useEffect, useMemo, useState} from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const AnimatedFlashList = Animated.createAnimatedComponent(FlatList);

const FlashListForwardRef = forwardRef<FlashList<any>, FlashListProps<any>>(
  (props, ref) => {
    return <AnimatedFlashList ref={ref} {...props} />;
  },
);

interface IProps {
  data: any[];
  keyExtractor: ((item: any, index: number) => string) | undefined;
  renderItem: ListRenderItem<any> | null | undefined;
  itemWidth?: number;
}

const Carousel = (props: IProps) => {
  const {data, itemWidth = SCREEN_WIDTH, renderItem, keyExtractor} = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const flashListRef = useAnimatedRef<FlashList<any>>();

  const array = useMemo(() => {
    // [3, 1, 2, 3, 1]
    return [data[data.length - 1], ...data, data[0]];
  }, [data]);

  const goToPage = (page: number) => {
    const to = page * itemWidth;
    flashListRef.current?.scrollToOffset({offset: to, animated: false});
  };

  useEffect(() => {
    if (currentPage === data.length + 1) {
      goToPage(1);
      setCurrentPage(1);
    }
    if (currentPage === 0) {
      goToPage(data.length);
      setCurrentPage(data.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleJs = (event: NativeScrollEvent) => {
    const {contentOffset, layoutMeasurement} = event;
    const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentPage(pageNum);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onMomentumEnd: (event: NativeScrollEvent) => {
      runOnJS(handleJs)(event);
    },
  });

  return (
    <FlashListForwardRef
      ref={flashListRef}
      data={array}
      keyExtractor={keyExtractor}
      // @ts-ignore
      renderItem={renderItem}
      estimatedItemSize={itemWidth}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      extraData={array}
      scrollEventThrottle={4}
      initialScrollIndex={currentPage}
    />
  );
};

export default memo(Carousel);
