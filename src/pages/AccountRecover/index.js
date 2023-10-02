import { View, Pressable } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recoverSchemaValidation } from './recoverSchemaValidation';

// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global } from '../../styles/global';

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
		<View style={global.pageContainer}>
			<View style={[global.button, { width: '80%' }]}>
				<Text style={global.message}>
					Insira abaixo o seu email de cadastro para que possamos te enviar uma nova senha
				</Text>
			</View>

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

			<Button
				style={global.button}
				mode='contained'
				// loading={true}
				disabled={errors.email ? true : false}
				onPress={handleSubmit(onSubmitRecover)}
			>
				Solicitar nova senha
			</Button>

			<View style={global.loginLinks}>
				<Pressable onPress={() => navigation.navigate('AccountLogin')}>
					<Text>Fazer login</Text>
				</Pressable>
				<Pressable onPress={() => navigation.navigate('AccountRegister')}>
					<Text>Criar conta</Text>
				</Pressable>
			</View>
		</View>
	);
}
