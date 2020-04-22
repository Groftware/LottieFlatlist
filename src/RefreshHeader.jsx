import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieView: {
    width: 100,
    height: 100,
  },
});

const RefreshHeader = ({
  animationSource,
  animationSize,
  progress,
  height,
  shouldAnimate,
}) => {
  const lottieAnimation = useRef(null);

  useEffect(() => {
    if (shouldAnimate) {
      lottieAnimation.current.play();
    }
  }, [shouldAnimate]);

  return (
    <View style={[
      styles.container,
      {
        height
      }
    ]}>
      <LottieView
        ref={lottieAnimation}
        style={[
          styles.lottieView,
          {
            width: animationSize,
            height: animationSize,
          },
        ]}
        source={animationSource}
        progress={progress > 1 ? 1 : progress}
      />
    </View>
  );
};
RefreshHeader.propTypes = {
  animationSource: PropTypes.object.isRequired,
  // Number from 0 to 1
  progress: PropTypes.number.isRequired,
  shouldAnimate: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,

  animationSize: PropTypes.number,
};

RefreshHeader.defaultProps = {
  animationSize: 100,
};

export default RefreshHeader;
