import { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, RadioButton, HelperText, TextInput, useTheme, Dialog, Portal, Snackbar } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { objectSchemaValidation } from '../helpers/objectSchemaValidation';
import endpoints from '../config/endpoints';
import * as ImagePicker from 'expo-image-picker';

// Services
import { updateItem, uploadItemPhotos } from '../services/objectService';

// Components
import TextInputController from '../components/TextInputController';
import AddImageButton from '../components/AddImageButton';
import PrimaryFAB from '../components/PrimaryFAB';

// Hooks
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';

// Styles
import { global } from '../styles/global';

export default function ObjectEdit({ navigation, route }) {
	const [radioValue, setRadioValue] = useState(item?.situation);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState('date');
	const [formatedDate, setFormatedDate] = useState('');
	const [formatedTime, setFormatedTime] = useState('');
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [files, setFiles] = useState(null);

	// const [dialogVisibility, setDialogVisibility] = useState(false);
	const [snackbarVisibility, setSnackbarVisibility] = useState();
	
	const [item, setItem] = useState();
	const { userItems, getUserItems } = useUser();
	const { userAuth } = useAuth();
	const theme = useTheme();
	
	const situation = radioValue === 'found' ? ['achado', 'achei'] : ['perdido', 'perdi'];
	const labelPlace = `Local em que foi ${situation[0]}`;
	const labelDate = `Data em que foi ${situation[0]}`;
	const labelTime = `Horário em que foi ${situation[0]}`;
	
	const controller = new AbortController();
	const defaultItemPhoto = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-photo.jpg`;
	
	const itemDate = `${item?.datetime?.slice(8, 10)}/${item?.datetime?.slice(5, 7)}/${item?.datetime?.slice(0, 4)}`;
	const itemTime = item?.datetime?.slice(11, 19);

	const {
		control,
		setValue,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: {
			// situation: item?.situation,
			// objectType: item?.objectType,
			// brand: item?.brand,
			// model: item?.model,
			// color: item?.color,
			// characteristics: item?.characteristics ? item.characteristics.join(', ') : '',
			// place: item?.place,
			// date: itemDateInStringFormat,
			// time: itemTimeInStringFormat,
			// info: item?.info,
		},
		values: {
			situation: item?.situation,
			objectType: item?.objectType,
			brand: item?.brand,
			model: item?.model,
			color: item?.color,
			characteristics: item?.characteristics ? item.characteristics.join(', ') : '',
			place: item?.place,
			date: itemDate,
			time: itemTime,
			info: item?.info,
		},
		resolver: yupResolver(objectSchemaValidation),
	});

	// Snackbar stuff
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
	//

	useEffect(() => {
		setItem(userItems.find((item) => item.id === route.params.objectId));

		return () => controller.abort();
	}, [route.params.objectId]);

	useEffect(() => {
		const preservedParams = {
			foundObject: route.params.foundObject,
			objectId: route.params.objectId,
		};

		navigation.setParams({ ...preservedParams, unsavedChanges: isDirty });
	}, [isDirty]);

	const onSubmit = async (data) => {
		try {
			const datetime = `${data.date.slice(-4)}-${data.date.slice(3, 5)}-${data.date.slice(0, 2)}T${data.time.slice(0, 6)}00.000Z`;
			const characteristics = data?.characteristics ? data.characteristics.split(',').map((item) => item.trim()) : [];
			const newData = { ...data, characteristics, datetime };
			console.log('Dados Formulário Objeto Edit:', newData);
	
			const photosFormData = new FormData();

			for (let i = 0; i < files?.length; i++) {
				photosFormData.append('photos', {
					uri: files[i]?.uri,
					type: 'image/jpeg',
					name: `${files[i]?.height}-${files[i]?.width}`,
				});
			}

			let resUpdate, resUpload;

			if (data)
				resUpdate = await updateItem(route.params.objectId, newData);
			if (files)
				resUpload = await uploadItemPhotos(route.params.objectId, photosFormData);

			console.log('ResUpdate:', resUpdate);
			console.log('ResUpload:', resUpload);
	
			if (resUpdate?.id !== '' || resUpload?.id !== '') {
				await getUserItems();
				// Alert.alert('Objeto atualizado com sucesso!');
				if (resUpload?.id !== '') setFiles(null);
				navigation.navigate('ObjectDetails', {
					foundObject: route.params.foundObject,
					objectId: route.params.objectId,
					actionOnObjectRecord: 'update'
				});
			} else {
				navigation.setParams({ errorDisplay: true });
				// Alert.alert('Erro ao editar o objeto!');
			}
		} catch (e) {
			console.error('Error ObjectEdit:', e);
		}
	};

	const hideDialog = () => setDialogVisibility(false);

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
	};

	const uploadObjectPhotos = async () => {
		try {
			const permitted = await ImagePicker.getMediaLibraryPermissionsAsync();
			if (permitted.granted) {
				const res = await ImagePicker.launchImageLibraryAsync({
					allowsMultipleSelection: true,
					selectionLimit: 4,
					aspect: [1, 1],
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					quality: 1,
				});
				if (!res.canceled) {
					await saveFiles(res.assets);
				}
			} else {
				throw Error('Acesso não permitido!');
			}
		} catch (e) {
			// TODO: Mostrar mensagem de ERRO
			console.error('Error ImagePiker:', e);
			setIsVisible(false);
		}
	};

	const saveFiles = async (selectedPhotos) => {
		try {
			setFiles(selectedPhotos);
			setIsVisible(false);
		} catch (e) {
			// TODO: Mostrar mensagem de ERRO
			console.error('Error ImagePiker:', e);
			setIsVisible(false);
		}
	};

	const removeObjectPhotos = async () => {
		try {
			saveFiles(null);
			// FIXME: utilizar userServices pra apagar essa imagem
		} catch (e) {
			// TODO: Mostrar mensagem de ERRO
			console.error('Error ImagePiker:', e);
			setIsVisible(false);
		}
	};

	return (
		<>
			<Portal>
				<Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
					<Dialog.Title>Fotos do Objeto</Dialog.Title>
					<Dialog.Actions>
						<Button onPress={() => uploadObjectPhotos()}>Abrir Galeria</Button>
					</Dialog.Actions>
					<Dialog.Actions>
						<Button onPress={() => removeObjectPhotos()}>Remover Imagens</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal> 
			<Portal>
				<Snackbar
					style={{backgroundColor: theme.colors.error}}
					visible={snackbarVisibility}
				>
					<Text style={{ color: theme.colors.onError }}>Erro ao editar o objeto!</Text>
				</Snackbar>
			</Portal>
			{/* <Portal>
				<Dialog visible={dialogVisibility} onDismiss={hideDialog} style={[{ backgroundColor: theme.colors.background }, global.dialog]}>
					<Dialog.Title style={global.dialogTitle}>Erro</Dialog.Title>
					<Dialog.Content>
						<Text style={global.message}>Erro ao editar o objeto!</Text>
					</Dialog.Content>
					<Dialog.Actions style={global.dialogActions}>
						<Button onPress={hideDialog}>OK</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal> */}
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
						{files?.length
							? [1, 2, 3, 4].map((photo, index) => (
									<AddImageButton
										key={photo}
										image={files[index]?.uri}
										onPress={() => setIsVisible(true)}
									/>
							  ))
							: [1, 2, 3, 4].map((photo, index) => (
									<AddImageButton
										key={photo}
										image={item?.photos[index]}
										onPress={() => setIsVisible(true)}
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
						render={({ field: { value, onChange } }) => (
							<TextInput
								style={global.input}
								label={labelDate}
								error={errors.date}
								value={value}	//
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
						render={({ field: { value, onChange }}) => (
							<TextInput
								style={global.input}
								label={labelTime}
								error={errors.time}
								value={value}
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

					<View style={{ marginBottom: 32 }}>
						<Text>{` `}</Text>
					</View>
				</View>
			</ScrollView>
			<View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB icon='content-save-outline' onPress={handleSubmit(onSubmit)} />
			</View>
		</>
	);
}
