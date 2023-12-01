import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, RadioButton, HelperText, TextInput, Switch, useTheme } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { objectSchemaValidation } from '../helpers/objectSchemaValidation';
import endpoints from '../config/endpoints';

// Services
import { findItemById, updateItem } from '../services/objectService';

// Components
import TextInputController from '../components/TextInputController';
import AddImageButton from '../components/AddImageButton';
// import PrimaryFAB from '../components/PrimaryFAB';

// Hooks
import useUser from '../hooks/useUser';
// import useAppTheme from '../hooks/useAppTheme';

// Styles
import { global } from '../styles/global';

// Data
// import MyObjectsList from '../mockup/RegisteredObjectsData';
// const { foundObjects, lostObjects } = MyObjectsList;

export default function ObjectEdit({ navigation, route }) {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const [radioValue, setRadioValue] = useState(item?.situation);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [formatedDate, setFormatedDate] = useState('');
	const [formatedTime, setFormatedTime] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { userItems } = useUser();
	const [item, setItem] = useState(userItems.find((item) => item.id === route.params.objectId));

	const theme = useTheme();

	const situation = radioValue === 'found' ? ['achado', 'achei'] : ['perdido', 'perdi'];
	const labelPlace = `Local em que foi ${situation[0]}`;
	const labelDate = `Data em que foi ${situation[0]}`;
	const labelTime = `Horário em que foi ${situation[0]}`;
	const labelAgreement = `Atesto que realmente ${situation[1]} este objeto, sob pena de perda da conta em caso de registro falso.`;

	const controller = new AbortController();
	const defaultItemPhoto = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-photo.jpg`;

	useEffect(() => {
		setItem(userItems.find((item) => item.id === route.params.objectId));
		return () => controller.abort();
	}, [route.params.objectId]);

	// useEffect(() => {
	// 	setItem(userItems.find((item) => item.id === route.params.objectId));
	// 	return () => controller.abort();
	// }, []);

	const {
		control,
		reset,
		setValue,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		defaultValues: {
			situation: item?.situation,
			objectType: item?.objectType,
			brand: item?.brand,
			model: item?.model,
			color: item?.color,
			characteristics: item?.characteristics ? item.characteristics.join(', ') : '',
			place: item?.place,
			datetime: item?.date,
			info: item?.info,
		},
		values: {
			situation: item?.situation,
			objectType: item?.objectType,
			brand: item?.brand,
			model: item?.model,
			color: item?.color,
			characteristics: item?.characteristics ? item.characteristics.join(', ') : '',
			place: item?.place,
			datetime: item?.date,
			info: item?.info,
		},
		resolver: yupResolver(objectSchemaValidation),
	});

	const onSubmit = async (data) => {
		const characteristics = data?.characteristics ? data.characteristics.split(',').map((item) => item.trim()) : [];
		const newData = { ...data, characteristics };
		console.log('Dados Formulário Objeto Edit:', newData);

		// const result = await updateItem(route.params.objectId, newData);
		// if (result.id) {
		// 	Alert.alert('Objeto atualizado com sucesso!');
		// 	navigation.navigate('ObjectDetails', {
		// 		foundObject: route.params.foundObject,
		// 		objectId: route.params.objectId,
		// 	});
		// } else {
		// 	Alert.alert('Erro ao cadastrar o objeto!');
		// }

		if (isSubmitSuccessful) reset();
	};

	useEffect(() => {
		// Será que tá fazendo alguma diferença?
		// if (isSubmitSuccessful) {
		// 	reset();
		// }
		reset();
	}, [isSubmitSuccessful]);

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

	const onChangeMode = (selectedMode) => {
		setShowDatePicker(true);
		setMode(selectedMode);
	};

	const onChangeDate = (event, selectedDate) => {
		const usedDate = selectedDate || date;
		setShowDatePicker(false);
		setDate(usedDate);

		let dateTimeValue = new Date(usedDate).toISOString();
		let tempDate = new Date(usedDate).toLocaleDateString('pt-BR', { dateStyle: 'short' });
		let tempTime = new Date(usedDate).toLocaleTimeString('pt-BR', { timeStyle: 'long' });

		setValue('datetime', dateTimeValue);
		setFormatedDate(tempDate);
		setFormatedTime(tempTime);
	};

	return (
		<>
			<ScrollView>
				<View style={global.pageContainer}>
					<View
						style={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							justifyContent: 'center',
							gap: 8,
							marginTop: 32,
						}}
					>
						{[1, 2, 3, 4].map((photo) => (
							<AddImageButton
								key={photo}
								image={
									item?.photos[photo - 1] === 'default-photo.jpg'
										? defaultItemPhoto
										: item?.photos[photo - 1]
								}
								onPress={() => console.log('*abre galeria de fotos*')}
							/>
						))}
					</View>

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
								onChange={onChangeDate}
								mode={mode}
								is24Hour={true}
								display={'spinner'}
								minuteInterval={1}
								dateFormat='day month year'
							/>
						</View>
					) : null}

					<TextInput
						style={global.input}
						label={labelDate}
						error={errors.datetime}
						value={new Date(item?.datetime).toLocaleDateString('pt-BR')}
						maxLength={10}
						mode='outlined'
						onPressIn={() => onChangeMode('date')}
						left={
							<TextInput.Icon
								icon={() => <Ionicons name='calendar-outline' size={24} color={theme.colors.outline} />}
							/>
						}
					/>
					{errors.datetime ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.datetime?.message}
						</HelperText>
					) : null}

					<TextInput
						style={global.input}
						label={labelTime}
						error={errors.datetime}
						value={new Date(item?.datetime).toLocaleTimeString('pt-BR', {
							hour: '2-digit',
							minute: '2-digit',
						})}
						maxLength={5}
						mode='outlined'
						onPressIn={() => onChangeMode('time')}
						left={
							<TextInput.Icon
								icon={() => <Ionicons name='time-outline' size={24} color={theme.colors.outline} />}
							/>
						}
					/>
					{errors.datetime ? (
						<HelperText type='error' style={[global.input, { marginVertical: 0, paddingVertical: 0 }]}>
							{errors.datetime?.message}
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
						// loading={true}
						disabled={isSwitchOn ? false : true}
						onPress={handleSubmit(onSubmit)}
					>
						Atualizar Objeto
					</Button>

					<View style={{ marginBottom: 32 }} />
				</View>
			</ScrollView>
			{/* <View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB icon='content-save-outline' onPress={handleSubmit(onSubmit)} />
			</View> */}
		</>
	);
}
