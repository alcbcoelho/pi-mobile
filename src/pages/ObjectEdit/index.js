import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, RadioButton, Button, HelperText, Switch, TextInput, useTheme } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { objectSchemaValidation } from './objectSchemaValidation';

// Components
import TextInputController from '../../components/TextInputController';

// Styles
import { global } from '../../styles/global';

export default function ObjectEdit() {
	return (
		<Text>Edit screen</Text>
	)
}
