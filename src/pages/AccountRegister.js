import { useState } from 'react';
import { Alert, View, Pressable, ScrollView } from 'react-native';
import { Text, Button, Dialog, useTheme, Portal } from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchemaValidation } from '../helpers/registerSchemaValidation';

// Hooks
import useAuth from '../hooks/useAuth';

// Components
import TextInputController2, { colorUnauthScreensError } from '../components/TextInputController2';
import LinearGradientView from '../components/LinearGradientView';

// Styles
import { global, styleUnauthenticatedScreens } from '../styles/global';

export default function AccountRegister({ navigation }) {
	const [dialogVisibility, setDialogVisibility] = useState(false);
	const { register } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const theme = useTheme();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(registerSchemaValidation) });

	const toggleShowPassword = () => setShowPassword((previous) => !previous);
	const toggleShowPassword2 = () => setShowPassword2((previous) => !previous);
	const setIconColor = (name) => (errors[name] ? colorUnauthScreensError : 'white');
	const hideDialog = () => setDialogVisibility(false);

	const onSignUp = async (data) => {
		console.log('Dados Formulário Registro de Usuário:', data);
		const result = await register(data);
		if (result) {
			navigation.navigate('AuthenticatedRoutes', { screen: 'MyObjects', params: { createdAccount: true }});
		} else {
			setDialogVisibility(true);
			// Alert.alert("Já há um usuário cadastrado com uma ou mais das credenciais especificadas.");
		}
	};

	return (
		<>
			<Portal>
				<Dialog visible={dialogVisibility} onDismiss={hideDialog} style={[{ backgroundColor: theme.colors.background }, global.dialog, { height: '31.25%' }]}>
					<Dialog.Title style={global.dialogTitle}>Erro ao cadastrar usuário</Dialog.Title>
					<Dialog.Content>
						<Text style={global.message}>Já há um usuário cadastrado com uma ou mais das credenciais especificadas.</Text>
					</Dialog.Content>
					<Dialog.Actions style={global.dialogActions}>
						<Button style={{ marginBottom: 16 }} onPress={hideDialog}>OK</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<LinearGradientView>
				<View style={{ flex: 1 }}>
					<ScrollView
						contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
						showsVerticalScrollIndicator={false}
					>
						<Text style={[global.title, styleUnauthenticatedScreens.whiteText]}>Cadastre-se</Text>

						<TextInputController2
							name={'cpf'}
							label={'CPF'}
							placeholder={'Seu CPF'}
							control={control}
							error={errors.cpf}
							keyboardType={'numeric'}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('cpf')} />}
						/>

						<TextInputController2
							name={'firstName'}
							label={'Nome'}
							placeholder={'Seu nome'}
							control={control}
							error={errors.firstName}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('firstName')} />}
						/>

						<TextInputController2
							name={'lastName'}
							label={'Sobrenome'}
							placeholder={'Seu sobrenome'}
							control={control}
							error={errors.lastName}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('lastName')} />}
						/>

						<TextInputController2
							name={'phone'}
							label={'Telefone'}
							placeholder={'Seu número de telefone'}
							control={control}
							maxLength={11}
							minLength={10}
							error={errors.phone}
							keyboardType={'phone-pad'}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('phone')} />}
						/>

						<TextInputController2
							name={'email'}
							label={'Email'}
							placeholder={'Seu endereço de email'}
							control={control}
							error={errors.email}
							keyboardType={'email-address'}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('email')} />}
						/>

						<TextInputController2
							name={'password'}
							label={'Senha'}
							placeholder={'Uma senha forte'}
							control={control}
							error={errors.password}
							secureTextEntry={!showPassword}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('password')} />}
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

						<TextInputController2
							name={'confirm'}
							label={'Confirmar senha'}
							placeholder={'Confirme a senha anterior'}
							control={control}
							error={errors.confirm}
							secureTextEntry={!showPassword2}
							leftIcon={<AntDesign name='idcard' size={24} color={setIconColor('confirm')} />}
							rightIcon={
								showPassword2 ? (
									<Ionicons
										name='eye-outline'
										size={24}
										color={setIconColor('confirm')}
										onPress={toggleShowPassword2}
									/>
								) : (
									<Ionicons
										name='eye-off-outline'
										size={24}
										color={setIconColor('confirm')}
										onPress={toggleShowPassword2}
									/>
								)
							}
						/>

						<Button
							style={{ marginVertical: 32 }}
							buttonColor='white'
							textColor='#946d51'
							mode='contained'
							loading={isSubmitting}
							onPress={handleSubmit(onSignUp)}
						>
							Criar Conta
						</Button>

						<View style={[global.loginLinks, { flexDirection: 'row', marginBottom: 32 }]}>
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
							<Pressable onPress={() => navigation.navigate('AccountLogin')}>
								<Text
									style={[
										styleUnauthenticatedScreens.whiteText,
										styleUnauthenticatedScreens.underlinedText,
									]}
								>
									Fazer login
								</Text>
							</Pressable>
						</View>
					</ScrollView>
				</View>
			</LinearGradientView>
		</>
	);
}
