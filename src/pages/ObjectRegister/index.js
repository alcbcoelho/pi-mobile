import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, RadioButton, Button, HelperText, Switch, useTheme } from 'react-native-paper';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { schemaValidation } from './yupSchemaValidation';

// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global } from '../../styles/global';

const schemaValidation = yup.object({
	situation: yup.string().required('A situação do objeto é obrigatória!'),
	object: yup.string().required('O obejto é obrigatório!'),
	brand: yup.string().notRequired(),
	model: yup.string().notRequired(),
	color: yup.string().required('A cor predominante é obrigatória!'),
	characteristics: yup.string().notRequired(),
	place: yup.string().required('O local é obrigatório!'),
	date: yup.string().required('A data obrigatória!'),
	time: yup.string().required('O horário é obrigatório!'),
	info: yup.string().notRequired(),
});

export default function ObjectRegister() {
	const [radioValue, setRadioValue] = useState('found'); // setar um valor inicial?
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const theme = useTheme();

	const situation = radioValue === 'found' ? ['achado', 'achei'] : ['perdido', 'perdi'];
	const labelPlace = `Local em que foi ${situation[0]}`;
	const labelDate = `Data em que foi ${situation[0]}`;
	const labelTime = `Horário em que foi ${situation[0]}`;
	const labelAgreement = `Atesto que realmente ${situation[1]} este objeto, sob pena de perda da conta em caso de registro falso.`;

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'all', resolver: yupResolver(schemaValidation) });

	const onSubmit = (data) => console.log(data);

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

	return (
		<View style={global.pageContainer}>
			<ScrollView style={global.contentContainer} showsVerticalScrollIndicator={false} horizontal={false}>
				<Controller
					name={'situation'}
					control={control}
					render={({ field: { value, onChange } }) => (
						<RadioButton.Group
							onValueChange={(value) => {
								onChange(value);
								setRadioValue(value);
							}}
							value={value}
						>
							<View style={global.inputRow}>
								<RadioButton value='found' />
								<Text>Objeto Achado</Text>
							</View>
							<View style={global.inputRow}>
								<RadioButton value='lost' />
								<Text>Objeto Perdido</Text>
							</View>
						</RadioButton.Group>
					)}
				/>

				<TextInputController
					name={'object'}
					label={'Objeto'}
					placeholder={'Ex.: "Celular"'}
					control={control}
					error={errors.object}
					leftIcon={<MaterialIcons name='watch' size={24} color={theme.colors.error} />}
				/>
				<HelperText type='info'>Aquilo que seu objeto consiste.</HelperText>
				{errors.object ? (
					<HelperText type='error' visible={false}>
						{errors.object.message}
					</HelperText>
				) : null}

				<TextInputController
					name={'brand'}
					label={'Marca'}
					placeholder={'Ex.: "Apple"'}
					control={control}
					error={errors.brand}
					leftIcon={<Ionicons name='logo-apple' size={24} color={theme.colors.error} />}
				/>
				<HelperText type='info'>A marca do seu objeto, caso seja aplicável.</HelperText>
				{/* {errors.brand ? (
					<HelperText type='error' visible={false}>
						{errors.brand.message}
					</HelperText>
				) : null} */}

				<TextInputController
					name={'model'}
					label={'Modelo'}
					placeholder={'Ex.: "iPhone12"'}
					control={control}
					error={errors.model}
					leftIcon={<Ionicons name='logo-apple' size={24} color={theme.colors.error} />}
				/>
				<HelperText type='info'>O modelo do seu objeto, caso seja aplicável.</HelperText>
				{/* {errors.model ? (
					<HelperText type='error' visible={false}>
						{errors.model.message}
					</HelperText>
				) : null} */}

				<TextInputController
					name={'color'}
					label={'Cor predominante'}
					placeholder={'Ex.: "Branco"'}
					control={control}
					error={errors.color}
					leftIcon={<MaterialIcons name='format-paint' size={24} color={theme.colors.error} />}
				/>
				<HelperText type='info'>A cor predominante do seu objeto.</HelperText>
				{errors.color ? (
					<HelperText type='error' visible={false}>
						{errors.color.message}
					</HelperText>
				) : null}

				<TextInputController
					name={'characteristics'}
					label={'Outras características'}
					placeholder={'Ex.: "capinha vermelha, tela rachada"'}
					control={control}
					error={errors.characteristics}
					leftIcon={<MaterialIcons name='description' size={24} color={theme.colors.error} />}
				/>
				<HelperText type='info'>
					Detalhes descritivos adicionais que possam ajudar a especificar ainda mais o objeto em questão.{' '}
					<Text style={{ fontWeight: 'bold' }}>Separe cada característica com uma vírgula.</Text>
				</HelperText>
				{/* {errors.characteristics ? (
					<HelperText type='error' visible={false}>
						{errors.characteristics.message}
					</HelperText>
				) : null} */}

				<TextInputController
					name={'place'}
					label={labelPlace}
					control={control}
					error={errors.place}
					leftIcon={<MaterialIcons name='place' size={24} color={theme.colors.error} />}
				/>
				{errors.place ? (
					<HelperText type='error' visible={false}>
						{errors.place.message}
					</HelperText>
				) : null}

				<TextInputController
					name={'date'}
					label={labelDate}
					control={control}
					error={errors.date}
					leftIcon={<MaterialIcons name='date-range' size={24} color={theme.colors.error} />}
				/>
				{errors.date ? (
					<HelperText type='error' visible={false}>
						{errors.date.message}
					</HelperText>
				) : null}

				<TextInputController
					name={'time'}
					label={labelTime}
					control={control}
					error={errors.time}
					leftIcon={<MaterialIcons name='access-time' size={24} color={theme.colors.error} />}
				/>
				{errors.time ? (
					<HelperText type='error' visible={false}>
						{errors.time.message}
					</HelperText>
				) : null}

				<TextInputController
					name={'info'}
					label={'Informações complementares'}
					placeholder={'Ex.: "Achei no refeitório, ao lado dos microondas..."'}
					control={control}
					error={errors.info}
					leftIcon={<MaterialIcons name='info' size={24} color={theme.colors.error} />}
				/>
				<HelperText type='info'>
					Informações adicionais sobre o objeto que você ache importante ressaltar.
				</HelperText>
				{/* {errors.info ? (
					<HelperText type='error' visible={false}>
						{errors.info.message}
					</HelperText>
				) : null} */}

				<View style={global.inputRow}>
					<Text style={{ width: '80%' }}>{labelAgreement}</Text>
					<Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{ width: '20%' }} />
				</View>

				<Button mode='outlined' loading={false} onPress={handleSubmit(onSubmit)}>
					Adicionar Objeto
				</Button>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({});
