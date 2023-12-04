import { useEffect, useState } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { Text, RadioButton, Button, HelperText, Switch, TextInput, useTheme, Snackbar, Portal } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { objectSchemaValidation } from '../helpers/objectSchemaValidation';
import DateTimePicker from '@react-native-community/datetimepicker';

// Services
import { createItem } from '../services/objectService';

// Hooks
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';

// Components
import TextInputController from '../components/TextInputController';

// Styles
import { global } from '../styles/global';

export default function ObjectRegister({ navigation, route }) {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const [radioValue, setRadioValue] = useState('found');
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [formatedDate, setFormatedDate] = useState('');
	const [formatedTime, setFormatedTime] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [snackbarVisibility, setSnackbarVisibility] = useState();

	const { userAuth } = useAuth();
	const { userItems, getUserItems } = useUser();
	const theme = useTheme();

	const situation = radioValue === 'found' ? ['achado', 'achei'] : ['perdido', 'perdi'];
	const labelPlace = `Local em que foi ${situation[0]}`;
	const labelDate = `Data em que foi ${situation[0]}`;
	const labelTime = `Horário em que foi ${situation[0]}`;
	const labelAgreement = `Atesto que realmente ${situation[1]} este objeto, sob pena de perda da conta em caso de registro falso.`;

	const controller = new AbortController();

	const {
		control,
		reset,
		setValue,
		handleSubmit,
		formState: { errors, isDirty, isSubmitting },
	} = useForm({ resolver: yupResolver(objectSchemaValidation) });

	const onSubmit = async (data) => {
		const datetime = `${formatedDate.slice(-4)}-${formatedDate.slice(3, 5)}-${formatedDate.slice(0, 2)}T${formatedTime.slice(0, 6)}00.000Z`;
		const characteristics = data?.characteristics ? data.characteristics.split(',').map((item) => item.trim()) : [];
		const newData = { ...data, characteristics, datetime};
		console.log('Dados Formulário Objeto:', newData);

		const result = await createItem(newData);
		if (result.id) {
			await getUserItems();
			// Alert.alert('Objeto cadastrado com sucesso!');
			navigation.navigate('MyObjects',
			{ screen: 'Home', params: { actionOnObjectRecord: 'create' }});
		} else {
			navigation.setParams({ errorDisplay: true });
			// Alert.alert('Erro ao cadastrar o objeto!');
		}
	};

	useEffect(() => {
		let snackbarTime;
		if (route.params?.errorDisplay) {
			setSnackbarVisibility(true);

			snackbarTime = setTimeout(() => {
				// const paramName = {props.params}
				setSnackbarVisibility(false);
				// params[props.params] = false;
				route.params.errorDisplay = false;
			}, 3000);
		}

		return () => {
			controller.abort();
			clearTimeout(snackbarTime);
		};
	}, [route.params.errorDisplay])

	useEffect(() => {
		navigation.setParams({ unsavedChanges: isDirty });
	}, [isDirty]);

	// useEffect(() => {
	// 	reset();
	// }, [userItems, userAuth, navigation.isFocused]);

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

	const onChangeMode = (selectedMode) => {
		setShowDatePicker(true);
		setMode(selectedMode);
	};

	const onChangeDateTime = (event, selectedDate) => {
		const usedDate = selectedDate || date;
		setShowDatePicker(false);
		setDate(usedDate);
		if (mode === 'date') {
			let tempDate = new Date(usedDate).toLocaleDateString('pt-BR', { dateStyle: 'short' });

			setValue('date', tempDate, { shouldDirty: true });
			setFormatedDate(tempDate);
		} else if (mode === 'time') {
			let tempTime = new Date(usedDate).toLocaleTimeString('pt-BR', { timeStyle: 'long' });

			setValue('time', tempTime, { shouldDirty: true })
			setFormatedTime(tempTime);
		}

		// let dateTimeValue = new Date(usedDate).toISOString();

		// console.log("datetime: " + dateTimeValue);
		// ----
		// const usedDate = selectedDate || date;
		// setShowDatePicker(false);
		// setDate(usedDate);

		// let dateTimeValue = new Date(usedDate).toISOString();
		// let tempDate = new Date(usedDate).toLocaleDateString('pt-BR', { dateStyle: 'short' });
		// let tempTime = new Date(usedDate).toLocaleTimeString('pt-BR', { timeStyle: 'long' });

		// // setValue('datetime', dateTimeValue);
		// setFormatedDate(tempDate);
		// setFormatedTime(tempTime);
	};

	return (
		<>
			<Portal>
				<Snackbar
					style={{backgroundColor: theme.colors.error}}
					visible={snackbarVisibility}
				>
					<Text style={{ color: theme.colors.onError }}>Erro ao cadastrar o objeto!</Text>
				</Snackbar>
        	</Portal>
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
					{errors.situation ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.situation?.message}
						</HelperText>
					) : null}

					<TextInputController
						name={'objectType'}
						label={'Objeto'}
						placeholder={'Ex.: "Celular"'}
						control={control}
						error={errors.objectType}
						leftIcon={<Ionicons name='watch-outline' size={24} color={theme.colors.outline} />}
					/>
					<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						Aquilo que seu objeto consiste.
					</HelperText>
					{errors.objectType ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.objectType?.message}
						</HelperText>
					) : null}

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
					{errors.color ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.color?.message}
						</HelperText>
					) : null}

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

					<TextInputController
						name={'place'}
						label={labelPlace}
						control={control}
						error={errors.place}
						leftIcon={<Ionicons name='location-outline' size={24} color={theme.colors.outline} />}
					/>
					{errors.place ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.place?.message}
						</HelperText>
					) : null}

					{showDatePicker ? (
						<View>
							<DateTimePicker
								value={date}
								onChange={onChangeDateTime}
								mode={mode}
								is24Hour={true}
								display={'spinner'}
								minuteInterval={1}
								dateFormat='day month year'
							/>
						</View>
					) : null}

					<Controller
						name={'date'}
						control={control}
						render={({ field: { onChange }}) => (
							<TextInput
								style={global.input}
								label={labelDate}
								error={errors.date}
								value={formatedDate}
								onChangeText={onChange}
								maxLength={10}
								mode='outlined'
								onPressIn={() => onChangeMode('date')}
								left={
									<TextInput.Icon
										icon={() => <Ionicons name='calendar-outline' size={24} color={theme.colors.outline} />}
									/>
								}
							/>
						)}
					/>
					{errors.date ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.date?.message}
						</HelperText>
					) : null}

					<Controller
						name={'time'}
						control={control}
						render={({ field: { onChange }}) => (
							<TextInput
								style={global.input}
								label={labelTime}
								error={errors.time}
								value={formatedTime}
								onChangeText={onChange}
								maxLength={5}
								mode='outlined'
								onPressIn={() => onChangeMode('time')}
								left={
									<TextInput.Icon
										icon={() => <Ionicons name='time-outline' size={24} color={theme.colors.outline} />}
									/>
								}
							/>
						)}
					/>
					{errors.time ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.time?.message}
						</HelperText>
					) : null}

					<TextInputController
						name={'info'}
						label={'Informações complementares'}
						placeholder={'Ex.: "Achei no refeitório, perto do microondas..."'}
						control={control}
						error={errors.info}
						multiline={true}
						maxLength={140}
						leftIcon={<Ionicons name='information' size={24} color={theme.colors.outline} />}
					/>
					<HelperText type='info' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
						Informações adicionais sobre o objeto que você ache importante ressaltar.
					</HelperText>

					<View style={global.agreement}>
						<Text style={{ width: '80%' }}>{labelAgreement}</Text>
						<Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{ width: '20%' }} />
					</View>

					<Button
						style={global.button}
						mode='contained'
						loading={isSubmitting}
						disabled={isSwitchOn ? false : true}
						onPress={handleSubmit(onSubmit)}
					>
						Adicionar Objeto
					</Button>
				</View>
			</ScrollView>
		</>
	);
}
