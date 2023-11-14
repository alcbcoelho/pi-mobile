import { useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import {
  Text,
  RadioButton,
  HelperText,
  TextInput,
  useTheme,
} from "react-native-paper";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAppTheme from "../../hooks/useAppTheme";
// import { objectSchemaValidation } from './objectSchemaValidation';

// Components
import TextInputController from "../../components/TextInputController";
import PrimaryFAB from "../../components/PrimaryFAB";
import AddImageButton from "../../components/AddImageButton";

// Styles
import { global } from "../../styles/global";

export default function ObjectEdit({ route, navigation }) {
  const [radioValue, setRadioValue] = useState("found");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [formatedDate, setFormatedDate] = useState("");
  const [formatedTime, setFormatedTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const theme = useTheme();

  const situation =
    radioValue === "found" ? ["achado", "achei"] : ["perdido", "perdi"];
  const labelPlace = `Local em que foi ${situation[0]}`;
  const labelDate = `Data em que foi ${situation[0]}`;
  const labelTime = `Horário em que foi ${situation[0]}`;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    navigation.navigate("ObjectDetails", {
      foundObject: route.params.foundObject,
      objectId: route.params.objectId,
    });
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onChangeMode = (selectedMode) => {
    setShowDatePicker(true);
    setMode(selectedMode);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate).toLocaleDateString("pt-BR", {
      dateStyle: "short",
    });
    let tempTime = new Date(currentDate).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (mode === "date") {
      setValue("date", tempDate);
      setFormatedDate(tempDate);
    } else {
      setValue("time", tempTime);
      setFormatedTime(tempTime);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={global.pageContainer}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              marginTop: 32,
            }}
          >
            {[1, 2, 3, 4].map((item) => (
              <AddImageButton key={item} onPress={() => console.log("*abre galeria de fotos*")} />
            ))}
          </View>
          <Controller
            name={"situation"}
            control={control}
            defaultValue="found"
            rules={{ required: "Selecione uma das opções acima!" }}
            render={({ field: { value, onChange } }) => (
              <RadioButton.Group
                onValueChange={(value) => {
                  onChange(value);
                  setRadioValue(value);
                }}
                value={value}
              >
                <View style={{ marginVertical: 16 }}>
                  <View style={global.inputRow}>
                    <RadioButton value="found" />
                    <Text>Objeto Achado</Text>
                  </View>
                  <View style={global.inputRow}>
                    <RadioButton value="lost" />
                    <Text>Objeto Perdido</Text>
                  </View>
                </View>
              </RadioButton.Group>
            )}
          />
          {errors.situation && (
            <HelperText
              type="error"
              style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
            >
              {errors.situation?.message}
            </HelperText>
          )}

          <TextInputController
            name={"object"}
            label={"Objeto"}
            placeholder={'Ex.: "Celular"'}
            control={control}
            error={errors.object}
            leftIcon={
              <Ionicons
                name="watch-outline"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          <HelperText
            type="info"
            style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
          >
            Aquilo que seu objeto consiste.
          </HelperText>
          {errors.object && (
            <HelperText
              type="error"
              style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
            >
              {errors.object?.message}
            </HelperText>
          )}

          <TextInputController
            name={"brand"}
            label={"Marca"}
            placeholder={'Ex.: "Apple"'}
            control={control}
            error={errors.brand}
            leftIcon={
              <AntDesign
                name="apple-o"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          <HelperText
            type="info"
            style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
          >
            A marca do seu objeto, caso seja aplicável.
          </HelperText>
          {/* {errors.brand ? (
							<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
								{errors.brand?.message}
							</HelperText>
						) : null} */}

          <TextInputController
            name={"model"}
            label={"Modelo"}
            placeholder={'Ex.: "iPhone12"'}
            control={control}
            error={errors.model}
            leftIcon={
              <AntDesign
                name="apple-o"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          <HelperText
            type="info"
            style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
          >
            O modelo do seu objeto, caso seja aplicável.
          </HelperText>
          {/* {errors.model ? (
							<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
								{errors.model?.message}
							</HelperText>
						) : null} */}

          <TextInputController
            name={"color"}
            label={"Cor predominante"}
            placeholder={'Ex.: "Branco"'}
            control={control}
            error={errors.color}
            leftIcon={
              <Ionicons
                name="color-palette-outline"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          <HelperText
            type="info"
            style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
          >
            A cor predominante do seu objeto.
          </HelperText>
          {errors.color && (
            <HelperText
              type="error"
              style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
            >
              {errors.color?.message}
            </HelperText>
          )}

          <TextInputController
            name={"characteristics"}
            label={"Outras características"}
            placeholder={'Ex.: "capinha vermelha, tela rachada"'}
            control={control}
            error={errors.characteristics}
            leftIcon={
              <Ionicons
                name="document-text-outline"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          <HelperText
            type="info"
            style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
          >
            Elementos descritivos adicionais que possam ajudar a especificar
            ainda mais o objeto em questão.
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              Separe cada característica com uma vírgula.
            </Text>
          </HelperText>
          {/* {errors.characteristics ? (
							<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
								{errors.characteristics?.message}
							</HelperText>
						) : null} */}

          <TextInputController
            name={"place"}
            label={labelPlace}
            control={control}
            error={errors.place}
            leftIcon={
              <Ionicons
                name="location-outline"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          {errors.place && (
            <HelperText
              type="error"
              style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
            >
              {errors.place?.message}
            </HelperText>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={date}
              onChange={onChangeDate}
              mode={mode}
              is24Hour={true}
              display={"spinner"}
            />
          )}

          <TextInput
            style={global.input}
            label={labelDate}
            error={errors.date}
            value={formatedDate}
            maxLength={10}
            mode="outlined"
            onPressIn={() => onChangeMode("date")}
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name="calendar-outline"
                    size={24}
                    color={theme.colors.outline}
                  />
                )}
              />
            }
          />
          {errors.date && (
            <HelperText
              type="error"
              style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
            >
              {errors.date?.message}
            </HelperText>
          )}

          <TextInput
            style={global.input}
            label={labelTime}
            error={errors.time}
            value={formatedTime}
            maxLength={5}
            mode="outlined"
            onPressIn={() => onChangeMode("time")}
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={theme.colors.outline}
                  />
                )}
              />
            }
          />
          {errors.time && (
            <HelperText
              type="error"
              style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
            >
              {errors.time?.message}
            </HelperText>
          )}

          <TextInputController
            name={"info"}
            label={"Informações complementares"}
            placeholder={'Ex.: "Achei no refeitório, perto do microondas..."'}
            control={control}
            error={errors.info}
            multiline={true}
            maxLength={110}
            leftIcon={
              <Ionicons
                name="information"
                size={24}
                color={theme.colors.outline}
              />
            }
          />
          <HelperText
            type="info"
            style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}
          >
            Informações adicionais sobre o objeto que você ache importante
            ressaltar.
          </HelperText>
          <View style={{ marginBottom: 32 }} />
        </View>
      </ScrollView>
      <View style={[global.fabButton, { gap: 16 }]}>
        <PrimaryFAB
          icon="content-save-outline"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
    // <Text>Edit screen</Text>
  );
}
