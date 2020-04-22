import React, { useState, useEffect } from 'react';
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

  // Refresh props
  refreshing,
  onRefresh,
  refreshHeight,
  animationSource,
  animationSize,
}) {
  const [progress, setProgress] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [shouldImpact, setShouldImpact] = useState(true);
  const [animPaddingTop] = useState(new Animated.Value(0));

  // Run animate show header
  const showLoadingAnimation = (
    endCallback = () => { },
  ) => {
    Animated.timing(animPaddingTop, {
      toValue: refreshHeight,
      // Immediately appears
      duration: 0,
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

    if (y < 0 && !refreshing) {
      const percent = y / -refreshHeight;
      setProgress(percent);
    }

    if (
      y <= -refreshHeight
      && y >= -(refreshHeight + 10)
      && shouldImpact
    ) {
      setShouldImpact(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        .then(() => {
          setShouldImpact(true);
        });
    }

    setYOffset(y);
  }

  function onRelease() {
    if (yOffset <= -refreshHeight && !refreshing) {
      onRefresh();
    }
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <RefreshHeader
          animationSource={animationSource}
          animationSize={animationSize}
          progress={progress}
          shouldAnimate={refreshing}
        />
      </View>
      <Animated.View
        style={{
          paddingTop: animPaddingTop,
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          onScroll={onScroll}
          onResponderRelease={onRelease}
          scrollEventThrottle={1}
        />
      </Animated.View>
    </View>
  );
}

PullToRefreshFlatlist.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderItem: PropTypes.func.isRequired,

  // Refresh
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  animationSource: PropTypes.string.isRequired,
  animationSize: PropTypes.number,
  refreshHeight: PropTypes.number,
};

PullToRefreshFlatlist.defaultProps = {
  refreshHeight: 100,
  animationSize: 100,
};

export default PullToRefreshFlatlist;
