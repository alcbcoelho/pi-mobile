import { useState, useContext, useEffect } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Text, Button, HelperText, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchemaValidation } from './loginSchemaValidation';
import { LinearGradient } from 'expo-linear-gradient';
import LinearGradientView from '../../components/LinearGradientView';
import { CommonActions } from '@react-navigation/native';

// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global, styleUnauthenticatedScreens } from '../../styles/global';

// Contexts
import { AppThemeContext } from '../../contexts/AppThemeContext';

export default function AccountLogin({ navigation }) {
	const [showPassword, setShowPassword] = useState(false);
	const [inputLabelColor, setInputLabelColor] = useState('#fff');

	const theme = useTheme();
	const { themeType } = useContext(AppThemeContext);
	
	useEffect(() => {
		navigation.addListener('focus', () => {
			setInputLabelColor('#fff')
		})
	}, [navigation]);	// https://stackoverflow.com/questions/69878853/how-do-i-reset-a-screens-state-to-its-initial-state-when-using-react-navigation#comment135883212_69891844

	useEffect(() => {
		theme.colors.onSurfaceVariant = inputLabelColor;
		console.log('executeii')	//
	}, [inputLabelColor]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(loginSchemaValidation) });

	const onSignIn = (data) => {
		setInputLabelColor(themeType === 'light' ? 'rgb(82, 68, 59)' : 'rgb(214, 195, 183)');
		console.log('Dados Formulário Login:', data);
		navigation.navigate('AuthenticatedRoutes', { disableBackActionOnHeader: true }/* , { screen: 'Home' } */);
	};

	const toggleShowPassword = () => setShowPassword(previous => !previous);

	return (
		<LinearGradientView>
			{/* <Text style={[global.title, styles.whiteText]}>Santo Pulinho</Text> */}
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