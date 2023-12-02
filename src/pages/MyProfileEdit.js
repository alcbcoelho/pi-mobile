import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Button, HelperText, useTheme, Avatar, IconButton } from 'react-native-paper';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaValidation } from '../helpers/userSchemaValidation';

// Components
import TextInputController from '../components/TextInputController';
import PrimaryFAB from '../components/PrimaryFAB';

// Hooks
import useUser from '../hooks/useUser';
import useAppTheme from '../hooks/useAppTheme';

// Styles
import { global } from '../styles/global';

export default function MyProfileEdit({ route, navigation }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const { userData } = useUser();
	const { themeType } = useAppTheme();
	const theme = useTheme();

	const iconProperties = { size: 24, color: theme.colors.outline };

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(userSchemaValidation),
		defaultValues: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			phone: userData?.phone,
			email: userData?.email,
			password: userData?.password,
		},
		values: {
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			phone: userData?.phone,
			email: userData?.email,
			password: userData?.password,
		},
	});

	const toggleShowPassword = () => setShowPassword((previous) => !previous);
	const toggleShowPassword2 = () => setShowPassword2((previous) => !previous);

	const onSubmit = () => {
		navigation.navigate('MyProfile');
	};

	// const onSignUp = async (data) => {
	// 	console.log('Dados Formulário Registro de Usuário:', data);
	// 	const result = await register(data);
	// 	if (result) {
	// 		Alert.alert('Sucesso ao cadastrar conta!');
	// 		navigation.navigate('AuthenticatedRoutes', { screen: 'MyObjects' });
	// 	} else {
	// 		Alert.alert();
	// 	}
	// };

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
				{userData?.avatar ? (
					<Avatar.Image
						size={192}
						style={{ marginVertical: 32 }}
						source={() => (
							<Image
								style={{ aspectRatio: 1 / 1, borderRadius: 256 }}
								source={{ uri: userData?.avatar }}
							/>
						)}
					/>
				) : (
					<Avatar.Icon
						size={192}
						icon={({ size, color }) => <Ionicons name='person' size={size} color={color} />} /* 'account' */
						style={{
							backgroundColor:
								themeType === 'light' ? 'rgba(147, 75, 0, 0.15)' : 'rgba(255, 183, 130, 0.15)',
							marginVertical: 32,
						}}
					/>
				)}
				<IconButton
					icon='camera-plus-outline'
					iconColor='white'
					containerColor='#946D51'
					style={{ position: 'absolute', top: 185, right: 125 }}
					onPress={() => alert('pick a profile photo')}
				/>
				<TextInputController
					name={'firstName'}
					label={'Nome'}
					placeholder={'Seu nome'}
					control={control}
					error={errors.firstName}
					// style={{}}
					leftIcon={<AntDesign name='idcard' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.firstName?.message}</HelperText>

				<TextInputController
					name={'lastName'}
					label={'Sobrenome'}
					placeholder={'Seu sobrenome'}
					control={control}
					error={errors.lastName}
					// style={{}}
					leftIcon={<AntDesign name='idcard' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.lastName?.message}</HelperText>

				<TextInputController
					name={'phone'}
					label={'Telefone'}
					placeholder={'Seu número de telefone'}
					control={control}
					error={errors.phone}
					// style={{}}
					leftIcon={<SimpleLineIcons name='phone' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.phone?.message}</HelperText>

				<TextInputController
					name={'email'}
					label={'Email'}
					placeholder={'Seu endereço de email'}
					control={control}
					error={errors.email}
					// style={{}}
					leftIcon={<Ionicons name='mail-outline' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.email?.message}</HelperText>

				<TextInputController
					name={'password'}
					label={'Senha'}
					placeholder={'Uma senha forte'}
					control={control}
					error={errors.password}
					// style={{}}
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
					// style={{}}
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

				<Button style={global.button} mode='contained' loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
					Atualizar Objeto
				</Button>
			</ScrollView>
			{/* <View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB icon='content-save-outline' onPress={handleSubmit(onSubmit)} />
			</View> */}
		</View>
	);
}
