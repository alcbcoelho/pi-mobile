import { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchemaValidation } from './loginSchemaValidation';
import LinearGradientView from '../../components/LinearGradientView';
// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global, styleUnauthenticatedScreens } from '../../styles/global';

export default function AccountLogin({ navigation }) {
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(loginSchemaValidation) });

	const onSignIn = (data) => {
		console.log('Dados Formulário Login:', data);
		navigation.navigate('AuthenticatedRoutes', { disableBackActionOnHeader: true }/* , { screen: 'Home' } */);
	};

	const toggleShowPassword = () => setShowPassword(previous => !previous);

	return (
		<LinearGradientView>
			<Image style={styleUnauthenticatedScreens.logo} source={require('../../../assets/logo.png')} />

			<TextInputController
				style={[global.input, styleUnauthenticatedScreens.input]}
				name={'email'}
				label={'Email'}
				placeholder={'Insira seu email'}
				control={control}
				error={errors.email}
				outlineColor={'white'}
				textColor={'white'}
				keyboardType={'email-address'}
				leftIcon={<Ionicons name='mail-outline' size={24}color='white' />}
				theme={{ colors: { onSurfaceVariant: '#fff' }}}
			/>
			{errors.email ? <HelperText type='error'>{errors.email.message}</HelperText> : null}

			<TextInputController
				style={[global.input, styleUnauthenticatedScreens.input]}
				name={'password'}
				label={'Senha'}
				placeholder={'Insira sua senha'}
				control={control}
				error={errors.password}
				outlineColor={'white'}
				textColor={'white'}
				secureTextEntry={!showPassword}
				keyboardType={'default'}
				leftIcon={<Ionicons name='lock-closed-outline' size={24} color='white' />}
				rightIcon={
					showPassword ? (
						<Ionicons
							name='eye-outline'
							size={24}
							color='white'
							onPress={toggleShowPassword}
						/>
					) : (
						<Ionicons
							name='eye-off-outline'
							size={24}
							color='white'
							onPress={toggleShowPassword}
						/>
					)
				}
				theme={{ colors: { onSurfaceVariant: '#fff' }}}
			/>
			{errors.password ? <HelperText type='error'>{errors.password.message}</HelperText> : null}

			<Button
				style={global.button}
				buttonColor='white'
				textColor='#946d51'
				mode='contained'
				// loading={true}
				onPress={handleSubmit(onSignIn)}
			>
				Entrar
			</Button>

			<View style={global.loginLinks}>
				<Pressable onPress={() => navigation.navigate('AccountRecover')}>
					<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>Recuperar conta</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('AccountRegister')}>
					<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>Criar conta</Text>
				</Pressable>
			</View>
		</LinearGradientView>
	);
}