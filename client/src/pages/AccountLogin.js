import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchemaValidation } from './loginSchemaValidation';

// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global } from '../../styles/global';

export default function AccountLogin({ navigation }) {
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(loginSchemaValidation) });

	const onSignIn = (data) => {
		console.log('Dados Formulário Login:', data);
		navigation.navigate('AuthenticatedRoutes', { screen: 'Home' });
	};

	const toggleShowPassword = () => setShowPassword(!showPassword);

	return (
		<View style={global.pageContainer}>
			<Text style={global.title}>Santo Pulinho</Text>

			<TextInputController
				name={'email'}
				label={'Email'}
				placeholder={'Insira seu email'}
				control={control}
				error={errors.email}
				keyboardType={'email-address'}
				leftIcon={<MaterialCommunityIcons name='email-outline' size={24} color='black' />}
			/>
			{errors.email ? <HelperText type='error'>{errors.email.message}</HelperText> : null}

			<TextInputController
				name={'password'}
				label={'Senha'}
				placeholder={'Insira seu senha'}
				control={control}
				error={errors.password}
				secureTextEntry={!showPassword}
				keyboardType={'default'}
				leftIcon={<MaterialCommunityIcons name='lock-outline' size={24} color='black' />}
				rightIcon={
					showPassword ? (
						<MaterialCommunityIcons
							name='eye-outline'
							size={24}
							color='black'
							onPress={toggleShowPassword}
						/>
					) : (
						<MaterialCommunityIcons
							name='eye-off-outline'
							size={24}
							color='black'
							onPress={toggleShowPassword}
						/>
					)
				}
			/>
			{errors.password ? <HelperText type='error'>{errors.password.message}</HelperText> : null}

			<Button
				style={global.button}
				mode='contained'
				// loading={true}
				onPress={handleSubmit(onSignIn)}
			>
				Entrar
			</Button>

			<View style={global.loginLinks}>
				<Pressable onPress={() => navigation.navigate('AccountRecover')}>
					<Text>Recuperar conta</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('AccountRegister')}>
					<Text>Criar conta</Text>
				</Pressable>
			</View>
		</View>
	);
}