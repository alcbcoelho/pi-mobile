// Components
import { Image, ScrollView, View } from "react-native";
import { Text, HelperText, useTheme, Avatar, IconButton } from "react-native-paper";
import TextInputController from "../../components/TextInputController";
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import PrimaryFAB from "../../components/PrimaryFAB";

// Hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAppTheme from "../../hooks/useAppTheme";

// Styles
import { global } from "../../styles/global";

export default function MyProfileEdit({ navigation }) {
    const [user, setUser] = useState({
		id: 1,
		name: 'Cleiton Fernandes',
		email: 'cleitin.hta@gmail.com',
		phone: '+55 61 9 9251-3746',
		avatar: /* null */'https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg',
	});
    const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm();

    const theme = useTheme();
    const { themeType } = useAppTheme();

    const onSubmit = () => {
        navigation.navigate("MyProfile");
    }

    const toggleShowPassword = () => setShowPassword(previous => !previous);
    const toggleShowPassword2 = () => setShowPassword2(previous => !previous);

    const iconProperties = {
        size: 24,
        color: theme.colors.outline
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                {
                    user.avatar ?
                    <Avatar.Image
                        size={192}
                        style={{ marginVertical: 32 }}
                        source={() => <Image style={{ aspectRatio: 1 / 1, borderRadius: 256, }} source={{ uri: user.avatar }} />}
                    /> : 
                    <Avatar.Icon
                    size={192}
                    icon={({size, color}) => <Ionicons name='person' size={size} color={color} />}/* 'account' */
                    style={{
                        backgroundColor:
                        themeType === "light"
                          ? "rgba(147, 75, 0, 0.15)"
                          : "rgba(255, 183, 130, 0.15)",
                          marginVertical: 32
                        }}
                        />
                    }
                    <IconButton
                        icon='camera-plus-outline'
                        iconColor='white'
                        containerColor='#946D51'
                        style={{ position: 'absolute', top: 100 }}
                        onPress={() => alert('pick a profile photo')}
                    />
                <TextInputController
                    name='firstName'
                    label='Nome'
                    placeholder={'Seu nome'}
                    control={control}
                    error={errors.firstName}
                    leftIcon={<AntDesign name='idcard' {...iconProperties} />}
                />
                <HelperText type='error' visible={errors.firstName}>O nome é obrigatório!</HelperText>

                <TextInputController
                    name='lastName'
                    label='Sobrenome'
                    placeholder={'Seu sobrenome'}
                    control={control}
                    error={errors.lastName}
                    leftIcon={<AntDesign name='idcard' {...iconProperties} />}
                />
                <HelperText type='error' visible={errors.lastName}>O sobrenome é obrigatório!</HelperText>

                <TextInputController
                    name='phone'
                    label='Telefone'
                    placeholder={'Seu número de telefone'}
                    control={control}
                    error={errors.phone}
                    leftIcon={<SimpleLineIcons name='phone' {...iconProperties} />}
                />
                <HelperText type='error' visible={errors.phone}>O telefone é obrigatório!</HelperText>

                <TextInputController
                    name='email'
                    label='Email'
                    placeholder={'Seu endereço de email'}
                    control={control}
                    error={errors.email}
                    leftIcon={<Ionicons name='mail-outline' {...iconProperties} />}
                />
                <HelperText type='error' visible={errors.email}>O email é obrigatório!</HelperText>

                <TextInputController
                    name='password'
                    label='Senha'
                    placeholder={'Uma senha forte'}
                    control={control}
                    error={errors.password}
                    leftIcon={<Ionicons name='lock-closed-outline' {...iconProperties} />}
                    rightIcon={
                        showPassword ? (
                            <Ionicons
                                name='eye-outline'
                                onPress={toggleShowPassword}
                                {...iconProperties}
                            />
                        ) : (
                            <Ionicons
                                name='eye-off-outline'
                                onPress={toggleShowPassword}
                                {...iconProperties}
                            />
                        )
                    }
                    secureTextEntry={!showPassword}
                />
                <HelperText type='error' visible={errors.password}>A senha é obrigatória!</HelperText>

                <TextInputController
                    name='confirm'
                    label='Confirmar senha'
                    placeholder={'Confirme a senha anterior'}
                    control={control}
                    error={errors.confirm}
                    leftIcon={<Ionicons name='lock-closed-outline' {...iconProperties} />}
                    rightIcon={
                        showPassword2 ? (
                            <Ionicons
                                name='eye-outline'
                                onPress={toggleShowPassword2}
                                {...iconProperties}
                            />
                        ) : (
                            <Ionicons
                                name='eye-off-outline'
                                onPress={toggleShowPassword2}
                                {...iconProperties}
                            />
                        )
                    }
                    secureTextEntry={!showPassword2}
                />
                <HelperText type='error' visible={errors.confirm} style={{marginBottom: 40}}>A confirmação de senha é obrigatória!</HelperText>
            </ScrollView>
            <View style={[global.fabButton, { gap: 16 }]}>
                <PrimaryFAB icon='content-save-outline' onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
        // <Text>
        //     Profile edit screen
        // </Text>
    )
}