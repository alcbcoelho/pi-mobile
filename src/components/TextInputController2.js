import { Badge, HelperText, Text } from 'react-native-paper';
import { View } from 'react-native';
import TextInputController from './TextInputController';

import { global } from '../styles/global';

export const colorUnauthScreensError = 'rgb(147, 0, 10)';
export const colorUnauthScreensBG = '#AA866D';

export default function TextInputController2(props) {
	const size = 16;

	return (
		<>
			<TextInputController
				style={[
					global.input,
					{
						backgroundColor: /* props.error
              ? colorError
              :  */ colorUnauthScreensBG,
					},
				]}
				outlineColor={'white'}
				textColor={'white'}
				theme={{ colors: { onSurfaceVariant: '#fff', error: colorUnauthScreensError } }}
				{...props}
			/>
			{props.error && (
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View
						style={{
							height: size,
							width: size,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: colorUnauthScreensError /* "#fff" */,
							borderRadius: size,
						}}
					>
						<Text variant='labelSmall' style={{ color: colorUnauthScreensBG }}>
							!
						</Text>
					</View>
					<HelperText type='error' theme={{ colors: { error: colorUnauthScreensError /* "#fff" */ } }}>
						{props.error['message']}
					</HelperText>
				</View>
			)}
		</>
	);
}
