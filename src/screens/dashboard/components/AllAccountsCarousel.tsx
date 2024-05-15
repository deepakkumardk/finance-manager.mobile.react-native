import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {AccountDataInfo} from 'src/types';
import AccountCard from './AccountCard';
import {Text} from 'react-native-paper';

const {width} = Dimensions.get('window');

export const AllAccountsCarousel = ({
  accountSummaryList,
  onPress,
}: {
  accountSummaryList: AccountDataInfo[];
  onPress: (item: AccountDataInfo, index: number) => void;
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const ref = useRef<any>();

  return (
    <Carousel
      ref={ref}
      data={accountSummaryList}
      slideStyle={{marginTop: 12, marginBottom: 32}}
      renderItem={({item, index}) => (
        <AccountCard {...item} onPress={() => onPress(item, index)} />
      )}
      itemWidth={width}
      sliderWidth={width}
      loop={true}
      firstItem={0}
      containerCustomStyle={styles.container}
      contentContainerCustomStyle={styles.contentContainer}
      onSnapToItem={slideIndex => setActiveSlideIndex(slideIndex)}>
      <Pagination
        // @ts-ignore
        carouselRef={ref}
        tappableDots={true}
        dotsLength={accountSummaryList.length}
        activeDotIndex={activeSlideIndex}
        inactiveDotScale={0.6}
        inactiveDotOpacity={0.4}
        dotStyle={styles.dotStyle}
        containerStyle={styles.container}
        inactiveDotStyle={styles.inactiveDotStyle}
      />
      <Text>SLKDJf</Text>
    </Carousel>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 1,
    // paddingVertical: 10,
  },
  container: {
    // backgroundColor: 'red',
    // paddingVertical: 41,
    overflow: 'visible',
  },
  paginationContainer: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  inactiveDotStyle: {
    backgroundColor: 'gray',
  },
  dotStyle: {
    width: 100,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});
