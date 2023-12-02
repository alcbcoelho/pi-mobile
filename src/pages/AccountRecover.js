import { Alert, View, Pressable } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recoverSchemaValidation } from '../helpers/recoverSchemaValidation';
import LinearGradientView from '../components/LinearGradientView';

// Hooks
import useAuth from '../hooks/useAuth';

// Components
import TextInputController from '../components/TextInputController';
import TextInputController2, { colorUnauthScreensError } from '../components/TextInputController2';

// Styles
import { global, styleUnauthenticatedScreens } from '../styles/global';

export default function AccountRecover({ navigation }) {
	const { reset, authError } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(recoverSchemaValidation) });

	const onSubmitRecover = async (data) => {
		console.log('Dados Formulário Recover:', data);
		const result = await reset(data);
		if (result) {
			navigation.navigate('AuthenticatedRoutes', { screen: 'MyObjects' });
		} else {
			Alert.alert('Erro ao recuperar senha!');
			// Alert.alert(authError);
		}
	};

	return (
		<LinearGradientView>
			<View style={{ marginBottom: 32, marginHorizontal: 16 }}>
				<Text style={[global.message, styleUnauthenticatedScreens.whiteText]}>
					Insira o seu email de cadastro abaixo para que possamos lhe enviar uma nova senha:
				</Text>
			</View>

			<TextInputController2
				name={'email'}
				label={'Email'}
				placeholder={'Insira seu endereço de email'}
				control={control}
				error={errors.email}
				keyboardType={'email-address'}
				leftIcon={
					<Ionicons name='mail-outline' size={24} color={errors.email ? colorUnauthScreensError : 'white'} />
				}
			/>

			<Button
				style={global.button}
				buttonColor='white'
				textColor='#946d51'
				mode='contained'
				loading={isSubmitting}
				disabled={errors.email ? true : false}
				onPress={handleSubmit(onSubmitRecover)}
			>
				Solicitar nova senha
			</Button>

			<View style={global.loginLinks}>
				<Pressable onPress={() => navigation.navigate('AccountLogin')}>
					<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>
						Fazer login
					</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('AccountRegister')}>
					<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>
						Criar conta
					</Text>
				</Pressable>
			</View>
		</LinearGradientView>
	);
}
