import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SquareSize = 120;

export default function App() {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withTiming(rotate.value + 90);
        }}
        style={[styles.square, rStyle]}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const maxTranslationAmount = 100;
          const translationX =
            Math.random() * maxTranslationAmount * 2 - maxTranslationAmount;
          const translationY =
            Math.random() * maxTranslationAmount * 2 - maxTranslationAmount;
          translateX.value = withSpring(translationX);
          translateY.value = withSpring(translationY);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 64,
    width: 64,
    backgroundColor: "#111",
    borderRadius: 32,
    position: "absolute",
    bottom: 48,
    right: 32,
  },
  square: {
    width: SquareSize,
    height: SquareSize,
    backgroundColor: "#00a6ff",
    borderRadius: 30,
    borderCurve: "continuous",
  },
});
