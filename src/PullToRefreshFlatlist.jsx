import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import * as Haptics from 'expo-haptics';

import RefreshHeader from './RefreshHeader';

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});

function PullToRefreshFlatlist({
  data,
  renderItem,
  ListHeaderComponent,

  // Refresh props
  refreshing,
  onRefresh,
  refreshHeight,
  animationSource,
  animationSize
}) {
  const [yOffset, setYOffset] = useState(0);
  const [animPaddingTop] = useState(new Animated.Value(0));

  const flatlistRef = useRef(null);

  // Run animate show header
  const showLoadingAnimation = (
    endCallback = () => { },
  ) => {
    flatlistRef.current.scrollToOffset(0);
    Animated.timing(animPaddingTop, {
      toValue: refreshHeight,
      duration: 200,
      easing: Easing.out(Easing.ease),
    }).start(endCallback);
  };

  // Run animate hide header
  const hideLoadingAnimation = (
    endCallback = () => { },
  ) => {
    Animated.timing(animPaddingTop, {
      toValue: 0,
      duration: 400,
      easing: Easing.elastic(1.3),
    }).start(endCallback);
  };

  // Hide refreshing animation when is not refreshing.
  useEffect(() => {
    if (refreshing) {
      showLoadingAnimation();
    } else {
      hideLoadingAnimation();
    }
  }, [refreshing]);

  function onScroll(event) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;

    if (
      y <= -refreshHeight
      && y >= -(refreshHeight + 10)
    ) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }

    setYOffset(y);
  }

  function onRelease() {
    if (yOffset <= -refreshHeight && !refreshing) {
      onRefresh();
    }
  }

  let progress = 0
  if (yOffset < 0 && !refreshing) {
    progress = yOffset / -refreshHeight
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <RefreshHeader
          animationSource={animationSource}
          animationSize={animationSize}
          progress={progress}
          shouldAnimate={refreshing}
          height={refreshHeight}
        />
      </View>
      <FlatList
        ref={flatlistRef}
        data={data}
        ListHeaderComponent={
          <Animated.View
            style={{
              paddingTop: animPaddingTop,
            }}
          >
            {ListHeaderComponent}
          </Animated.View>
        }
        renderItem={renderItem}
        onScroll={onScroll}
        onResponderRelease={onRelease}
      />
    </View>
  );
}

PullToRefreshFlatlist.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderItem: PropTypes.func.isRequired,
  ListHeaderComponent: PropTypes.any,

  // Refresh
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  animationSource: PropTypes.object.isRequired,
  animationSize: PropTypes.number,
  refreshHeight: PropTypes.number,
};

PullToRefreshFlatlist.defaultProps = {
  refreshHeight: 100,
  animationSize: 100,
};

export default PullToRefreshFlatlist;
