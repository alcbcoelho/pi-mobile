import { View, useWindowDimensions, Pressable } from "react-native";
import CustomPressable from "./CustomPressable";
import useAppTheme from "../hooks/useAppTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddImageButton({ onPress }) {
  const { theme, themeType } = useAppTheme();
  const { width } = useWindowDimensions();

  const imageButtonSize = (width / 2) * 0.8;
  const imageSelectorBackgroundColor =
    themeType === "light"
      ? "rgba(147, 75, 0, 0.15)"
      : "rgba(255, 183, 130, 0.15)";

  const handleOnPress = () => {}

  return (
    <CustomPressable
      onPress={handleOnPress}
    >
      <View
        style={{
          width: imageButtonSize,
          height: imageButtonSize,
          backgroundColor: imageSelectorBackgroundColor,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={24}
          color={theme.colors.background}
        />
      </View>
    </CustomPressable>
  );
}
