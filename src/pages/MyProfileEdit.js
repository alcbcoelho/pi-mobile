import { useState, useEffect } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { Button, HelperText, useTheme, Avatar, IconButton, Portal, Dialog } from 'react-native-paper';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import { userEditSchemaValidation } from '../helpers/userEditSchemaValidation';
import endpoints from '../config/endpoints';

// Components
import TextInputController from '../components/TextInputController';
import PrimaryFAB from '../components/PrimaryFAB';

// Hooks
import useUser from '../hooks/useUser';

// Styles
import { global } from '../styles/global';
import { updateUser, uploadUserAvatar } from '../services/userServices';

export default function MyProfileEdit({ route, navigation }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [file, setFile] = useState(null);

	const { userData, getUserData } = useUser();
	const theme = useTheme();

	const iconProperties = { size: 24, color: theme.colors.outline };
	const defaultUserAvatar = `${endpoints.BASE_URL}${endpoints.PUBLIC_URL}/default-avatar.jpg`;

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({
		resolver: yupResolver(userEditSchemaValidation),
		defaultValues: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			phone: userData?.phone,
			email: userData?.email,
		},
		values: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			phone: userData?.phone,
			email: userData?.email,
		},
	});

	useEffect(() => {
		navigation.setParams({ userId: route.params.id, unsavedChanges: isDirty });
	}, [isDirty]);

	useEffect(() => {
		setFile(null);
	}, []);

	const toggleShowPassword = () => setShowPassword((previous) => !previous);
	const toggleShowPassword2 = () => setShowPassword2((previous) => !previous);

	const uploadAvatarFile = async () => {
		try {
			const permitted = await ImagePicker.getMediaLibraryPermissionsAsync();
			if (permitted.granted) {
				const res = await ImagePicker.launchImageLibraryAsync({
					allowsEditing: true,
					aspect: [1, 1],
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					quality: 1,
				});
				if (!res.canceled) {
					await saveFile(res.assets[0]);
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

	const saveFile = async (selectedImage) => {
		try {
			// console.log(selectedImage);
			setFile(selectedImage);
			setIsVisible(false);
		} catch (e) {
			// TODO: Mostrar mensagem de ERRO
			console.error('Error ImagePiker:', e);
			setIsVisible(false);
		}
	};

	const removeAvatarFile = async () => {
		try {
			saveFile(null);
			// FIXME: utilizar userServices pra apagar essa imagem
		} catch (e) {
			// TODO: Mostrar mensagem de ERRO
			console.error('Error ImagePiker:', e);
			setIsVisible(false);
		}
	};

	const onSubmit = async (data) => {
		try {
			console.log('Dados Formulário Edição de Usuário:', data);

			const imageFormData = new FormData();
			imageFormData.append('avatar', {
				uri: file?.uri,
				type: 'image/jpeg',
				name: `${file?.height}-${file?.width}`,
			});

			let resUpdate, resUpload;
			if (data) resUpdate = await updateUser(data);
			if (file) resUpload = await uploadUserAvatar(imageFormData);

			console.log('ResUpdate:', resUpdate);
			console.log('ResUpload:', resUpload);

			if (resUpdate?.id !== '' || resUpload?.id !== '') {
				Alert.alert('Informações de usuário atualizadas com sucesso!');
				if (resUpload?.id !== '') setFile(null);
				await getUserData();
				navigation.navigate('MyProfile');
			} else {
				Alert.alert('Erro eo enviar informações do usuário!');
			}
		} catch (e) {
			console.error('Error ProfileEdit:', e);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Portal>
				<Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
					<Dialog.Title>Foto de Perfil</Dialog.Title>
					<Dialog.Actions>
						<Button onPress={() => uploadAvatarFile()}>Abrir Galeria</Button>
					</Dialog.Actions>
					<Dialog.Actions>
						<Button onPress={() => removeAvatarFile()}>Remover Imagem</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
				{file ? (
					<Avatar.Image
						size={192}
						style={{ marginVertical: 32 }}
						source={() => (
							<Image style={{ aspectRatio: 1 / 1, borderRadius: 256 }} source={{ uri: file?.uri }} />
						)}
					/>
				) : (
					<Avatar.Image
						size={192}
						style={{ marginVertical: 32 }}
						source={() => (
							<Image
								style={{ aspectRatio: 1 / 1, borderRadius: 256 }}
								source={{
									uri:
										userData?.avatar === 'default-avatar.jpg'
											? defaultUserAvatar
											: userData?.avatar,
								}}
							/>
						)}
					/>
				)}
				<IconButton
					icon='camera-plus-outline'
					iconColor='white'
					containerColor='#946D51'
					style={{ position: 'absolute', top: 185, right: 125 }}
					onPress={() => setIsVisible(true)}
				/>
				<TextInputController
					name={'firstName'}
					label={'Nome'}
					placeholder={'Seu nome'}
					control={control}
					error={errors.firstName}
					style={[global.input, { marginBottom: 0 }]}
					leftIcon={<AntDesign name='idcard' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.firstName?.message}</HelperText>

				<TextInputController
					name={'lastName'}
					label={'Sobrenome'}
					placeholder={'Seu sobrenome'}
					control={control}
					error={errors.lastName}
					style={[global.input, { marginBottom: 0 }]}
					leftIcon={<AntDesign name='idcard' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.lastName?.message}</HelperText>

				<TextInputController
					name={'phone'}
					label={'Telefone'}
					placeholder={'Seu número de telefone'}
					control={control}
					error={errors.phone}
					style={[global.input, { marginBottom: 0 }]}
					leftIcon={<SimpleLineIcons name='phone' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.phone?.message}</HelperText>

				<TextInputController
					name={'email'}
					label={'Email'}
					placeholder={'Seu endereço de email'}
					control={control}
					error={errors.email}
					style={[global.input, { marginBottom: 0 }]}
					leftIcon={<Ionicons name='mail-outline' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.email?.message}</HelperText>

				<TextInputController
					name={'password'}
					label={'Senha'}
					placeholder={'Uma senha forte'}
					control={control}
					error={errors.password}
					style={[global.input, { marginBottom: 0 }]}
					leftIcon={<Ionicons name='lock-closed-outline' {...iconProperties} />}
					secureTextEntry={!showPassword}
					rightIcon={
						showPassword ? (
							<Ionicons name='eye-outline' onPress={toggleShowPassword} {...iconProperties} />
						) : (
							<Ionicons name='eye-off-outline' onPress={toggleShowPassword} {...iconProperties} />
						)
					}
				/>
				<HelperText type='error'>{errors.password?.message}</HelperText>

				<TextInputController
					name={'confirm'}
					label={'Confirmar senha'}
					placeholder={'Confirme a senha anterior'}
					control={control}
					error={errors.confirm}
					style={[global.input, { marginBottom: 0 }]}
					leftIcon={<Ionicons name='lock-closed-outline' {...iconProperties} />}
					secureTextEntry={!showPassword2}
					rightIcon={
						showPassword2 ? (
							<Ionicons name='eye-outline' onPress={toggleShowPassword2} {...iconProperties} />
						) : (
							<Ionicons name='eye-off-outline' onPress={toggleShowPassword2} {...iconProperties} />
						)
					}
				/>
				<HelperText type='error' style={{ marginBottom: 40 }}>
					{errors.confirm?.message}
				</HelperText>

				<View style={{ marginBottom: 8 }}>
					<Text>{` `}</Text>
				</View>
			</ScrollView>
			<View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB icon='content-save-outline' onPress={handleSubmit(onSubmit)} />
			</View>
		</View>
	);
}
