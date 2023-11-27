import { useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, RadioButton, Button, HelperText, Switch, TextInput, useTheme } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { objectSchemaValidation } from '../helpers/objectSchemaValidation';

// Components
import TextInputController from '../components/TextInputController';

// Contexts
import { AuthContext } from '../contexts/AuthContext';
import { DataMockupContext } from '../contexts/DataMockupContext';

// Styles
import { global } from '../styles/global';

export default function ObjectRegister({ navigation, route }) {
	const [radioValue, setRadioValue] = useState('found'); // setar um valor inicial?
	const [isSwitchOn, setIsSwitchOn] = useState(false);

	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [formatedDate, setFormatedDate] = useState('');
	const [formatedTime, setFormatedTime] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);

	const { userData, createObject } = useContext(DataMockupContext);
	const { user: {id} } = useContext(AuthContext);
	const theme = useTheme();

	const situation = radioValue === 'found' ? ['achado', 'achei'] : ['perdido', 'perdi'];
	const labelPlace = `Local em que foi ${situation[0]}`;
	const labelDate = `Data em que foi ${situation[0]}`;
	const labelTime = `Horário em que foi ${situation[0]}`;
	const labelAgreement = `Atesto que realmente ${situation[1]} este objeto, sob pena de perda da conta em caso de registro falso.`;

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({ mode: 'onSubmit', resolver: yupResolver(objectSchemaValidation) });

	const onSubmit = (data) => {
		console.log('Dados Formulário Objeto:', data);
		
		const { situation, object, brand, model, color, characteristics, place, date, time, info } = data;
		
		let highestId = 0;
		const situation_ = data.situation === "found" ? "foundObjects" : "lostObjects";
		userData[userData.findIndex(user => user.id == id)]?.objects[situation_].forEach(({ id }) => highestId = id > highestId ? id : highestId);

		console.log('ID do usuário: ' + id + '\nID do novo objeto: ' + (highestId + 1));	//
		
		createObject({
			id: highestId + 1,
			situation,
			object,
			brand: typeof brand !== "undefined" ? brand : null,
			model: typeof model !== "undefined" ? model : null,
			color,
			characteristics,
			place,
			date,
			time,
			info: typeof info !== "undefined" ? info : null,
			imgUrl: []
		}, id);

		navigation.navigate('MyObjects', { screen: "FoundObjects" });	// ❤
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

		let tempDate = new Date(currentDate).toLocaleDateString('pt-BR', { dateStyle: 'short' });
		let tempTime = new Date(currentDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

		if (mode === 'date') {
			setValue('date', tempDate);
			setFormatedDate(tempDate);
		} else {
			setValue('time', tempTime);
			setFormatedTime(tempTime);
		}
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
			<View style={global.pageContainer}>
				<Controller
					name={'situation'}
					control={control}
					defaultValue='found'
					rules={{ required: 'Selecione uma das opções acima!' }}
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
									<RadioButton value='found' />
									<Text>Objeto Achado</Text>
								</View>
								<View style={global.inputRow}>
									<RadioButton value='lost' />
									<Text>Objeto Perdido</Text>
								</View>
							</View>
						</RadioButton.Group>
					)}
				/>
				{errors.situation && (
					<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						{errors.situation?.message}
					</HelperText>
				)}

				<TextInputController
					name={'object'}
					label={'Objeto'}
					placeholder={'Ex.: "Celular"'}
					control={control}
					error={errors.object}
					leftIcon={<Ionicons name='watch-outline' size={24} color={theme.colors.outline} />}
				/>
				<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
					Aquilo que seu objeto consiste.
				</HelperText>
				{errors.object && (
					<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						{errors.object?.message}
					</HelperText>
				)}

				<TextInputController
					name={'brand'}
					label={'Marca'}
					placeholder={'Ex.: "Apple"'}
					control={control}
					error={errors.brand}
					leftIcon={<AntDesign name='apple-o' size={24} color={theme.colors.outline} />}
				/>
				<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
					A marca do seu objeto, caso seja aplicável.
				</HelperText>
				{/* {errors.brand ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.brand?.message}
						</HelperText>
					) : null} */}

				<TextInputController
					name={'model'}
					label={'Modelo'}
					placeholder={'Ex.: "iPhone12"'}
					control={control}
					error={errors.model}
					leftIcon={<AntDesign name='apple-o' size={24} color={theme.colors.outline} />}
				/>
				<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
					O modelo do seu objeto, caso seja aplicável.
				</HelperText>
				{/* {errors.model ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.model?.message}
						</HelperText>
					) : null} */}

				<TextInputController
					name={'color'}
					label={'Cor predominante'}
					placeholder={'Ex.: "Branco"'}
					control={control}
					error={errors.color}
					leftIcon={<Ionicons name='color-palette-outline' size={24} color={theme.colors.outline} />}
				/>
				<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
					A cor predominante do seu objeto.
				</HelperText>
				{errors.color && (
					<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						{errors.color?.message}
					</HelperText>
				)}

				<TextInputController
					name={'characteristics'}
					label={'Outras características'}
					placeholder={'Ex.: "capinha vermelha, tela rachada"'}
					control={control}
					error={errors.characteristics}
					leftIcon={<Ionicons name='document-text-outline' size={24} color={theme.colors.outline} />}
				/>
				<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
					Elementos descritivos adicionais que possam ajudar a especificar ainda mais o objeto em questão.
					{`\n`}
					<Text style={{ fontWeight: 'bold' }}>Separe cada característica com uma vírgula.</Text>
				</HelperText>
				{/* {errors.characteristics ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.characteristics?.message}
						</HelperText>
					) : null} */}

				<TextInputController
					name={'place'}
					label={labelPlace}
					control={control}
					error={errors.place}
					leftIcon={<Ionicons name='location-outline' size={24} color={theme.colors.outline} />}
				/>
				{errors.place && (
					<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						{errors.place?.message}
					</HelperText>
				)}

				{showDatePicker && (
					<DateTimePicker
						value={date}
						onChange={onChangeDate}
						mode={mode}
						is24Hour={true}
						display={'spinner'}
					/>
				)}

				<TextInput
					style={global.input}
					label={labelDate}
					error={errors.date}
					value={formatedDate}
					maxLength={10}
					mode='outlined'
					onPressIn={() => onChangeMode('date')}
					left={
						<TextInput.Icon
							icon={() => <Ionicons name='calendar-outline' size={24} color={theme.colors.outline} />}
						/>
					}
				/>
				{errors.date && (
					<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						{errors.date?.message}
					</HelperText>
				)}

				<TextInput
					style={global.input}
					label={labelTime}
					error={errors.time}
					value={formatedTime}
					maxLength={5}
					mode='outlined'
					onPressIn={() => onChangeMode('time')}
					left={
						<TextInput.Icon
							icon={() => <Ionicons name='time-outline' size={24} color={theme.colors.outline} />}
						/>
					}
				/>
				{errors.time && (
					<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						{errors.time?.message}
					</HelperText>
				)}

				<TextInputController
					name={'info'}
					label={'Informações complementares'}
					placeholder={'Ex.: "Achei no refeitório, perto do microondas..."'}
					control={control}
					error={errors.info}
					multiline={true}
					maxLength={110}
					leftIcon={<Ionicons name='information' size={24} color={theme.colors.outline} />}
				/>
				<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
					Informações adicionais sobre o objeto que você ache importante ressaltar.
				</HelperText>
				{/* {errors.info ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.info?.message}
						</HelperText>
					) : null} */}

				<View style={global.agreement}>
					<Text style={{ width: '80%' }}>{labelAgreement}</Text>
					<Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{ width: '20%' }} />
				</View>

				<Button
					style={global.button}
					mode='contained'
					// loading={true}
					disabled={isSwitchOn ? false : true} // adicionar mais condições
					onPress={handleSubmit(onSubmit)}
				>
					Adicionar Objeto
				</Button>
			</View>
		</ScrollView>
	);
}
