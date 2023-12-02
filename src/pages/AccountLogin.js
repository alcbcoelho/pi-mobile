import { useState } from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchemaValidation } from '../helpers/loginSchemaValidation';
import LinearGradientView from '../components/LinearGradientView';

// Components
import TextInputController2, {
	colorUnauthScreensError,
	colorUnauthScreensBG,
} from '../components/TextInputController2';

// Hooks
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

// Styles
import { global, styleUnauthenticatedScreens } from '../styles/global';
import { Alert } from 'react-native';

export default function AccountLogin({ navigation }) {
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();
	const { getUserData } = useUser();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(loginSchemaValidation) });

	const onSignIn = async (data) => {
		const result = await login(data);
		if (result) {
			await getUserData();
			navigation.navigate('AuthenticatedRoutes', { screen: 'MyObjects' });
		} else {
			Alert.alert('Erro ao fazer login!');
		}
	};

	const toggleShowPassword = () => setShowPassword((previous) => !previous);

	const setIconColor = (name) => (errors[name] ? colorUnauthScreensError : 'white');

	return (
		<LinearGradientView>
			<View style={{ flex: 1 }}>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					showsVerticalScrollIndicator={false}
				>
					<Image style={styleUnauthenticatedScreens.logo} source={require('../../assets/logo.png')} />

					<TextInputController2
						style={[global.input, { backgroundColor: colorUnauthScreensBG, width: '100%' }]}
						theme={{ colors: { onSurfaceVariant: '#fff', error: colorUnauthScreensError } }}
						name={'email'}
						label={'Email'}
						placeholder={'Insira seu email'}
						control={control}
						error={errors.email}
						keyboardType={'email-address'}
						leftIcon={<Ionicons name='mail-outline' size={24} color={setIconColor('email')} />}
					/>

					<TextInputController2
						style={[global.input, { backgroundColor: colorUnauthScreensBG, width: '100%' }]}
						theme={{ colors: { onSurfaceVariant: '#fff', error: colorUnauthScreensError } }}
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
						loading={isSubmitting}
						onPress={handleSubmit(onSignIn)}
					>
						Entrar
					</Button>

					<View style={global.loginLinks}>
						<Pressable onPress={() => navigation.navigate('AccountRecover')}>
							<Text
								style={[
									styleUnauthenticatedScreens.whiteText,
									styleUnauthenticatedScreens.underlinedText,
								]}
							>
								Recuperar conta
							</Text>
						</Pressable>
						<Pressable onPress={() => navigation.navigate('AccountRegister')}>
							<Text
								style={[
									styleUnauthenticatedScreens.whiteText,
									styleUnauthenticatedScreens.underlinedText,
								]}
							>
								Criar conta
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</View>
		</LinearGradientView>
	);
}
