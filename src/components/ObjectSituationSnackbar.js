import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";

export default function ObjectSituationSnackbar(props) {
    const [visibility, setVisibility] = useState();
    const { params } = useRoute();
    const controller = new AbortController();

    const defineSnackbarMessage = () => {
		let objectSituation;

		switch(params?.actionOnObjectRecord) {
			case "create":
				objectSituation = "cadastrado";
				break;
			case "update":
				objectSituation = "atualizado";
				break;
			case "delete":
				objectSituation = "apagado";
				break;
			default:
				objectSituation = "¯\_(ツ)_/¯";
		}

		return (objectSituation !== "¯\_(ツ)_/¯") ? `Objeto ${objectSituation} com sucesso!` : "";
	}

    useEffect(() => {
        let snackbarTime;
		if (params?.actionOnObjectRecord) {
			setVisibility(true);

			snackbarTime = setTimeout(() => {
				setVisibility(false);
				params.actionOnObjectRecord = undefined;
			}, 3000);
		}

		return () => {
			controller.abort();
			clearTimeout(snackbarTime);
		};
    }, [params])

    return (
        <Portal>
            <Snackbar visible={visibility} {...props}>{defineSnackbarMessage()}</Snackbar>
        </Portal>
    )
}