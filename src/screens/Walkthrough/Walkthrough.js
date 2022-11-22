import React, { useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { TextButton } from '../../components';
import Walkthrough1 from './Walkthrough1';
import Walkthrough2 from './Walkthrough2';
import { COLORS, SIZES, constants, FONTS, dummyData } from '../../constants';

const Walkthrough = ({ navigation }) => {
  // Walkthrough 2
  const [walkthrough2Animate, setWalkthrough2Animate] = useState(false);

  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    if (viewableItems[0].index === 1) {
      // Walkthrough 2
      setWalkthrough2Animate(true);
    }
  });

  const scrollX = useRef(new Animated.Value(0)).current;

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {dummyData.walkThrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: 10,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SIZES.height * 0.2,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          //   borderWidth: 1,
          //   backgroundColor: 'red',
          paddingVertical: SIZES.height > 700 ? 40 : 20,
        }}>
        <Dots />
        {/* Buttons */}
        <View style={{ flexDirection: 'row', height: 55 }}>
          <TextButton
            label="Join Now"
            contentContainerStyle={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGrey,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
          />
          <TextButton
            label="Log In"
            contentContainerStyle={{
              flex: 1,
              marginLeft: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            labelStyle={{
              //   color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthMain' }],
              });
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }}>
      <Animated.FlatList
        data={dummyData.walkThrough}
        keyExtractor={item => item.id}
        horizontal
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: SIZES.width, justifyContent: 'center' }}>
              {/* Walkthrough Images */}
              <View style={{ flex: 1, justifyContent: 'center' }}>
                {index === 0 && <Walkthrough1 />}
                {index === 1 && <Walkthrough2 animate={walkthrough2Animate} />}
              </View>
              {/* Title & Descriptions */}
              <View
                style={{
                  height: SIZES.height * 0.35,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingHorizontal: SIZES.padding,
                }}>
                <Text style={{ ...FONTS.h1 }}>{item.title}</Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    marginTop: SIZES.radius,
                    textAlign: 'center',
                    color: COLORS.grey,
                  }}>
                  {item.sub_title}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

export default Walkthrough;
