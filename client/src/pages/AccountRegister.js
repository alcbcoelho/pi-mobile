// import { useState } from 'react';
import { View, Pressable, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaValidation } from '../helpers/userSchemaValidation';

// Components
import TextInputController from '../components/TextInputController';

// Styles
import { global } from '../styles/global';

export default function AccountRegister({ navigation }) {
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
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : ''}
				keyboardVerticalOffset={0}
				style={{ flex: 1 }}
			>
				<View style={global.pageContainer}>
					<Text style={global.title}>Cadastre-se</Text>
					<TextInputController
						name={'cpf'}
						label={'CPF'}
						placeholder={'Seu CPF'} // Qual placeholder?
						control={control}
						error={errors.cpf}
						keyboardType={'numeric'}
						leftIcon={<AntDesign name='idcard' size={24} color='black' />}
					/>
					{errors.cpf ? <HelperText type='error'>{errors.cpf.message}</HelperText> : null}

					<TextInputController
						name={'firstName'}
						label={'Nome'}
						placeholder={'Seu nome'} // Qual placeholder?
						control={control}
						error={errors.firstName}
						leftIcon={<AntDesign name='idcard' size={24} color='black' />}
					/>
					{errors.firstName ? <HelperText type='error'>{errors.firstName.message}</HelperText> : null}

					<TextInputController
						name={'lastName'}
						label={'Sobrenome'}
						placeholder={'Seu sobrenome'} // Qual placeholder?
						control={control}
						error={errors.lastName}
						leftIcon={<AntDesign name='idcard' size={24} color='black' />}
					/>
					{errors.lastName ? <HelperText type='error'>{errors.lastName.message}</HelperText> : null}

					<TextInputController
						name={'phone'}
						label={'Telefone'}
						placeholder={'Seu número de telefone'} // Qual placeholder?
						control={control}
						error={errors.phone}
						keyboardType={'phone-pad'}
						leftIcon={<MaterialIcons name='phone' size={24} color='black' />}
					/>
					{errors.phone ? <HelperText type='error'>{errors.phone.message}</HelperText> : null}

					<TextInputController
						name={'email'}
						label={'Email'}
						placeholder={'Seu endereço de email'} // Qual placeholder?
						control={control}
						error={errors.email}
						keyboardType={'email-address'}
						leftIcon={<MaterialIcons name='email' size={24} color='black' />}
					/>
					{errors.email ? <HelperText type='error'>{errors.email.message}</HelperText> : null}

					<TextInputController
						name={'password'}
						label={'Senha'}
						placeholder={'Uma senha forte'} // Qual placeholder?
						control={control}
						error={errors.password}
						secureTextEntry={true}
						leftIcon={<MaterialIcons name='lock' size={24} color='black' />}
					/>
					{errors.password ? <HelperText type='error'>{errors.password.message}</HelperText> : null}

					<TextInputController
						name={'confirm'}
						label={'Confirmar senha'}
						placeholder={'Confirme a senha anterior'} // Qual placeholder?
						control={control}
						error={errors.confirm}
						secureTextEntry={true}
						leftIcon={<MaterialIcons name='lock-outline' size={24} color='black' />}
					/>
					{errors.confirm ? <HelperText type='error'>{errors.confirm.message}</HelperText> : null}

					<Button
						style={{
							// width: '30%',
							marginVertical: 24,
						}}
						mode='contained'
						// loading={{}}
						onPress={handleSubmit(onSignUp)}
					>
						Criar Conta
					</Button>

					<View style={[global.loginLinks, { flexDirection: 'row' }]}>
						<Pressable onPress={() => navigation.navigate('AccountRecover')}>
							<Text>Recuperar conta</Text>
						</Pressable>
						<Pressable onPress={() => navigation.navigate('AccountLogin')}>
							<Text>Fazer login</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
}
