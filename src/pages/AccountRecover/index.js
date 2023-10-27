import { View, Pressable } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recoverSchemaValidation } from './recoverSchemaValidation';
import LinearGradientView from '../../components/LinearGradientView';

// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global, styleUnauthenticatedScreens } from '../../styles/global';

export default function AccountRecover({ navigation }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(recoverSchemaValidation) });

	const onSubmitRecover = (data) => {
		console.log('Dados Formulário Recover:', data);
		navigation.navigate('AccountLogin');
	};

	return (
		<LinearGradientView>
			<View style={{ marginBottom: 32, marginHorizontal: 16}}>
				<Text style={[global.message, styleUnauthenticatedScreens.whiteText]}>
					Insira o seu email de cadastro abaixo para que possamos lhe enviar uma nova senha:
				</Text>
			</View>

			<TextInputController
				style={[global.input, { backgroundColor: '#AA866D' }]}
				name={'email'}
				label={'Email'}
				placeholder={'Insira seu email'}
				outlineColor={'white'}
				textColor={'white'}
				control={control}
				error={errors.email}
				keyboardType={'email-address'}
				leftIcon={<Ionicons name='mail-outline' size={24} color='white' />}
			/>
			{errors.email ? <HelperText type='error'>{errors.email.message}</HelperText> : null}

			<Button
				style={global.button}
				buttonColor='white'
				textColor='#946d51'
				mode='contained'
				// loading={true}
				disabled={errors.email ? true : false}
				onPress={handleSubmit(onSubmitRecover)}
			>
				Solicitar nova senha
			</Button>

			<View style={global.loginLinks}>
				<Pressable onPress={() => navigation.navigate('AccountLogin')}>
					<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>Fazer login</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('AccountRegister')}>
					<Text style={[styleUnauthenticatedScreens.whiteText, styleUnauthenticatedScreens.underlinedText]}>Criar conta</Text>
				</Pressable>
			</View>
		</LinearGradientView>
	);
}
