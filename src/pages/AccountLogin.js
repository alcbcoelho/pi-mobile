import { useState, useContext } from "react";
import { View, Image, Pressable } from "react-native";
import { Text, Button, HelperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../helpers/loginSchemaValidation";
import LinearGradientView from "../components/LinearGradientView";

// Components
import TextInputController2, {
  colorUnauthScreensError,
  colorUnauthScreensBG,
} from "../components/TextInputController2";

// Contexts
import { AuthContext } from "../contexts/AuthContext";
import { DataMockupContext } from "../contexts/DataMockupContext";

// import { userData } from '../mockup/UserData';

// Styles
import { global, styleUnauthenticatedScreens } from "../styles/global";

export default function AccountLogin({ navigation }) {
  const messages = [
    "Usuário não cadastrado!",
    "Usuário e/ou senha incorretos!",
  ];

  const [helperText, setHelperText] = useState();
  const [showHelperText, setShowHelperText] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const { userData } = useContext(DataMockupContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", resolver: yupResolver(loginSchemaValidation) });

  const onSignIn = (data) => {
    console.log("Dados Formulário Login:", data);

    if (userData.find((user) => user.email === data.email) === undefined) {
      setHelperText(messages[0]);
      setShowHelperText(true);
    } else {
      if (
        userData.find((user) => user.password === data.password) === undefined
      ) {
        setHelperText(messages[1]);
        setShowHelperText(true);
      } else {
        setShowHelperText(false);
        login(data.email);

		navigation.navigate('AuthenticatedRoutes', { screen: 'MyObjects' });	//
      }
    }

  };

  const toggleShowPassword = () => setShowPassword((previous) => !previous);

  const setIconColor = (name) =>
    errors[name] ? colorUnauthScreensError : "white";

  const size = 16;

  return (
    <LinearGradientView>
      <Image
        style={styleUnauthenticatedScreens.logo}
        source={require("../../assets/logo.png")}
      />

      <TextInputController2
        onFocus={() => setShowHelperText(false)}
        name={"email"}
        label={"Email"}
        placeholder={"Insira seu email"}
        control={control}
        error={errors.email}
        keyboardType={"email-address"}
        leftIcon={
          <Ionicons
            name="mail-outline"
            size={24}
            color={setIconColor("email")}
          />
        }
      />

      <TextInputController2
        onFocus={() => setShowHelperText(false)}
        name={"password"}
        label={"Password"}
        placeholder={"Insira sua senha"}
        control={control}
        error={errors.password}
        secureTextEntry={!showPassword}
        keyboardType={"default"}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={setIconColor("password")}
          />
        }
        rightIcon={
          showPassword ? (
            <Ionicons
              name="eye-outline"
              size={24}
              color={setIconColor("password")}
              onPress={toggleShowPassword}
            />
          ) : (
            <Ionicons
              name="eye-off-outline"
              size={24}
              color={setIconColor("password")}
              onPress={toggleShowPassword}
            />
          )
        }
      />
      {showHelperText && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: size,
              width: size,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colorUnauthScreensError /* "#fff" */,
              borderRadius: size,
            }}
          >
            <Text variant="labelSmall" style={{ color: colorUnauthScreensBG }}>
              !
            </Text>
          </View>
          <HelperText
            type="error"
            theme={{ colors: { error: colorUnauthScreensError /* "#fff" */ } }}
          >
            {helperText}
          </HelperText>
        </View>
      )}
      {/* TODO: COMPONENTIZAR ISSO AQUI (tbm presente em TextInputController2) */}

      <Button
        style={global.button}
        buttonColor="white"
        textColor="#946d51"
        mode="contained"
        // loading={true}
        onPress={handleSubmit(onSignIn)}
      >
        Entrar
      </Button>

      <View style={global.loginLinks}>
        <Pressable onPress={() => navigation.navigate("AccountRecover")}>
          <Text
            style={[
              styleUnauthenticatedScreens.whiteText,
              styleUnauthenticatedScreens.underlinedText,
            ]}
          >
            Recuperar conta
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("AccountRegister")}>
          <Text
            style={[
              styleUnauthenticatedScreens.whiteText,
              styleUnauthenticatedScreens.underlinedText,
            ]}
          >
            Criar conta
          </Text>
        </Pressable>
      </View>
    </LinearGradientView>
  );
}
