// Components
import { Image, ScrollView, View } from 'react-native';
import { Text, HelperText, useTheme, Avatar, IconButton } from 'react-native-paper';
import TextInputController from '../components/TextInputController';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import PrimaryFAB from '../components/PrimaryFAB';

import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaValidation } from '../helpers/userSchemaValidation';

// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAppTheme from '../hooks/useAppTheme';

// Styles
import { global } from '../styles/global';

// Data
import { userData } from '../mockup/UserData';

export default function MyProfileEdit({ route, navigation }) {
	const index = userData.findIndex((user) => user.id == route.params.userId);

	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userSchemaValidation),
		defaultValues: {
			firstName: userData[index]?.firstName,
			lastName: userData[index]?.lastName,
			phone: userData[index]?.phone,
			email: userData[index]?.email,
			password: userData[index]?.password,
		},
	});

	const theme = useTheme();
	const { themeType } = useAppTheme();

	const onSubmit = () => {
		navigation.navigate('MyProfile');
	};

	const toggleShowPassword = () => setShowPassword((previous) => !previous);
	const toggleShowPassword2 = () => setShowPassword2((previous) => !previous);

	const iconProperties = {
		size: 24,
		color: theme.colors.outline,
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
				{userData[index]?.avatar ? (
					<Avatar.Image
						size={192}
						style={{ marginVertical: 32 }}
						source={() => (
							<Image
								style={{ aspectRatio: 1 / 1, borderRadius: 256 }}
								source={{ uri: userData[index]?.avatar }}
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
					style={{ position: 'absolute', top: 100 }}
					onPress={() => alert('pick a profile photo')}
				/>
				<TextInputController
					name='firstName'
					label='Nome'
					placeholder={'Seu nome'}
					control={control}
					error={errors.firstName}
					leftIcon={<AntDesign name='idcard' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.firstName?.message}</HelperText>

				<TextInputController
					name='lastName'
					label='Sobrenome'
					placeholder={'Seu sobrenome'}
					control={control}
					error={errors.lastName}
					leftIcon={<AntDesign name='idcard' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.lastName?.message}</HelperText>

				<TextInputController
					name='phone'
					label='Telefone'
					placeholder={'Seu número de telefone'}
					control={control}
					error={errors.phone}
					leftIcon={<SimpleLineIcons name='phone' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.phone?.message}</HelperText>

				<TextInputController
					name='email'
					label='Email'
					placeholder={'Seu endereço de email'}
					control={control}
					error={errors.email}
					leftIcon={<Ionicons name='mail-outline' {...iconProperties} />}
				/>
				<HelperText type='error'>{errors.email?.message}</HelperText>

				<TextInputController
					name='password'
					label='Senha'
					placeholder={'Uma senha forte'}
					control={control}
					error={errors.password}
					leftIcon={<Ionicons name='lock-closed-outline' {...iconProperties} />}
					rightIcon={
						showPassword ? (
							<Ionicons name='eye-outline' onPress={toggleShowPassword} {...iconProperties} />
						) : (
							<Ionicons name='eye-off-outline' onPress={toggleShowPassword} {...iconProperties} />
						)
					}
					secureTextEntry={!showPassword}
				/>
				<HelperText type='error'>{errors.password?.message}</HelperText>

				<TextInputController
					name='confirm'
					label='Confirmar senha'
					placeholder={'Confirme a senha anterior'}
					control={control}
					error={errors.confirm}
					leftIcon={<Ionicons name='lock-closed-outline' {...iconProperties} />}
					rightIcon={
						showPassword2 ? (
							<Ionicons name='eye-outline' onPress={toggleShowPassword2} {...iconProperties} />
						) : (
							<Ionicons name='eye-off-outline' onPress={toggleShowPassword2} {...iconProperties} />
						)
					}
					secureTextEntry={!showPassword2}
				/>
				<HelperText type='error' style={{ marginBottom: 40 }}>
					{errors.confirm?.message}
				</HelperText>
			</ScrollView>
			<View style={[global.fabButton, { gap: 16 }]}>
				<PrimaryFAB icon='content-save-outline' onPress={handleSubmit(onSubmit)} />
			</View>
		</View>
		// <Text>
		//     Profile edit screen
		// </Text>
	);
}
