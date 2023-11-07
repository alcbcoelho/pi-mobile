// import { useState } from 'react';
import { View, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaValidation } from './userSchemaValidation';

// Components
import TextInputController from '../../components/TextInputController';
import LinearGradientView from '../../components/LinearGradientView';

// Styles
import { global, styleUnauthenticatedScreens } from '../../styles/global';

export default function AccountRegister({ navigation }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const toggleShowPassword = () => setShowPassword(previous => !previous);
	const toggleShowPassword2 = () => setShowPassword2(previous => !previous);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(userSchemaValidation) });

	const onSignUp = (data) => {
		console.log('Dados Formulário Usuário:', data);
		navigation.navigate('AuthenticatedRoutes', { screen: 'Home' });
	};

	return (
		<ScrollView
			contentContainerStyle={global.scrollviewContainer}
			showsVerticalScrollIndicator={false}
			horizontal={false}
		>
			<LinearGradientView>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : ''}
					keyboardVerticalOffset={0}
					style={{ flex: 1 }}
				>
					<View style={global.pageContainer}>
						<Text style={[global.title, styleUnauthenticatedScreens.whiteText]}>Cadastre-se</Text>
						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'cpf'}
							label={'CPF'}
							placeholder={'Seu CPF'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.cpf}
							keyboardType={'numeric'}
							leftIcon={<AntDesign name='idcard' size={24} color='white' />}
							theme={{ colors: { onSurfaceVariant: '#fff' }}}
						/>
						{errors.cpf ? <HelperText type='error'>{errors.cpf.message}</HelperText> : null}

						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'firstName'}
							label={'Nome'}
							placeholder={'Seu nome'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.firstName}
							leftIcon={<AntDesign name='idcard' size={24} color='white' />}
							theme={{ colors: { onSurfaceVariant: '#fff' }}}
						/>
						{errors.firstName ? <HelperText type='error'>{errors.firstName.message}</HelperText> : null}

						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'lastName'}
							label={'Sobrenome'}
							placeholder={'Seu sobrenome'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.lastName}
							leftIcon={<AntDesign name='idcard' size={24} color='white' />}
							theme={{ colors: { onSurfaceVariant: '#fff' }}}
						/>
						{errors.lastName ? <HelperText type='error'>{errors.lastName.message}</HelperText> : null}

						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'phone'}
							label={'Telefone'}
							placeholder={'Seu número de telefone'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.phone}
							keyboardType={'phone-pad'}
							leftIcon={<SimpleLineIcons name='phone' size={24} color='white' />}
							theme={{ colors: { onSurfaceVariant: '#fff' }}}
						/>
						{errors.phone ? <HelperText type='error'>{errors.phone.message}</HelperText> : null}

						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'email'}
							label={'Email'}
							placeholder={'Seu endereço de email'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.email}
							keyboardType={'email-address'}
							leftIcon={<Ionicons name='mail-outline' size={24} color='white' />}
							theme={{ colors: { onSurfaceVariant: '#fff' }}}
						/>
						{errors.email ? <HelperText type='error'>{errors.email.message}</HelperText> : null}

						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'password'}
							label={'Senha'}
							placeholder={'Uma senha forte'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.password}
							secureTextEntry={!showPassword}
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

						<TextInputController
							style={[global.input, { backgroundColor: '#AA866D' }]}
							name={'confirm'}
							label={'Confirmar senha'}
							placeholder={'Confirme a senha anterior'} // Qual placeholder?
							control={control}
							outlineColor={'white'}
							textColor={'white'}
							error={errors.confirm}
							secureTextEntry={!showPassword2}
							leftIcon={<Ionicons name='lock-closed-outline' size={24} color='white' />}
							rightIcon={
								showPassword2 ? (
									<Ionicons
										name='eye-outline'
										size={24}
										color='white'
										onPress={toggleShowPassword2}
									/>
								) : (
									<Ionicons
										name='eye-off-outline'
										size={24}
										color='white'
										onPress={toggleShowPassword2}
									/>
								)
							}
							theme={{ colors: { onSurfaceVariant: '#fff' }}}
						/>
						{errors.confirm ? <HelperText type='error'>{errors.confirm.message}</HelperText> : null}

						<Button
							style={{
								// width: '30%',
								marginVertical: 32,
							}}
							buttonColor='white'
							textColor='#946d51'
							mode='contained'
							// loading={{}}
							onPress={handleSubmit(onSignUp)}
						>
							Criar Conta
						</Button>

						<View style={[global.loginLinks, { flexDirection: 'row' }]}>
							<Pressable onPress={() => navigation.navigate('AccountRecover')}>
								<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>Recuperar conta</Text>
							</Pressable>
							<Pressable onPress={() => navigation.navigate('AccountLogin')}>
								<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>Fazer login</Text>
							</Pressable>
						</View>
					</View>
				</KeyboardAvoidingView>
			</LinearGradientView>
		</ScrollView>
	);
}
