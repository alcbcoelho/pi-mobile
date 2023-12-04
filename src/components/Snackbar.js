// NÃO USAR. IMPLEMENTAR O SNACKBAR DO PAPER NA RAÇA MESMO

import { useRoute, useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Portal, Snackbar as Snackbar_ } from "react-native-paper";

export default function Snackbar(props) {
    const [visibility, setVisibility] = useState(false);
    const { params } = useRoute();
    const controller = new AbortController();

    useEffect(() => {
        let snackbarTime;
		if (props.params/* params?.createdAccount */) {
			setVisibility(true);

			snackbarTime = setTimeout(() => {
				// const paramName = {props.params}
				setVisibility(false);
				// params[props.params] = false;
				props.params = false;
				console.log(params);
			}, 3000);
		}

		return () => {
			controller.abort();
			clearTimeout(snackbarTime);
		};
    }, [props.params])

    return (
        <Portal>
            <Snackbar_ visible={visibility} {...props}>
				{props.children}
			</Snackbar_>
        </Portal>
    )
}