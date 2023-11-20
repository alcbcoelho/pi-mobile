import { LinearGradient } from "expo-linear-gradient";
import { global } from '../styles/global';

export default function LinearGradientView({ children }) {
  return (
    <LinearGradient
      colors={["#946d51", "#AA866D", "#946d51"]}
      style={global.pageContainer}
    >
      {children}
    </LinearGradient>
  );
}
