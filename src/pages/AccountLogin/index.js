import { useState, useContext } from 'react';
import { View, Image, Pressable } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchemaValidation } from './loginSchemaValidation';
import LinearGradientView from '../../components/LinearGradientView';

// Components
import TextInputController2, { colorUnauthScreensError } from '../../components/TextInputController2';

// Contexts
import { AuthContext } from '../../contexts/AuthContext';

// Styles
import { global, styleUnauthenticatedScreens } from '../../styles/global';

export default function AccountLogin({ navigation }) {
	const [showPassword, setShowPassword] = useState(false);

	const { login } = useContext(AuthContext);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(loginSchemaValidation) });

	const onSignIn = (data) => {
		console.log('Dados Formulário Login:', data);
		login(data.email === 'cleitin.hta@gmail.com' ? data.email : 'alcbcoelho@gmail.com'/* data.email */);
		navigation.navigate('AuthenticatedRoutes', { screen: 'MyObjects' });
	};

	const toggleShowPassword = () => setShowPassword(previous => !previous);

	const setIconColor = (name) => errors[name] ? colorUnauthScreensError : 'white';

	return (
		<LinearGradientView>
			<Image style={styleUnauthenticatedScreens.logo} source={require('../../../assets/logo.png')} />

			<TextInputController2
				name={'email'}
				label={'Email'}
				placeholder={'Insira seu email'}
				control={control}
				error={errors.email}
				keyboardType={'email-address'}
				leftIcon={<Ionicons name='mail-outline' size={24} color={setIconColor('email')} />}
			/>

			<TextInputController2
				name={'password'}
				label={'Password'}
				placeholder={'Insira sua senha'}
				control={control}
				error={errors.password}
				secureTextEntry={!showPassword}
				keyboardType={'default'}
				leftIcon={<Ionicons name='lock-closed-outline' size={24} color={setIconColor('password')} />}
				rightIcon={
					showPassword ? (
						<Ionicons
							name='eye-outline'
							size={24}
							color={setIconColor('password')}
							onPress={toggleShowPassword}
						/>
					) : (
						<Ionicons
							name='eye-off-outline'
							size={24}
							color={setIconColor('password')}
							onPress={toggleShowPassword}
						/>
					)
				}
			/>

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