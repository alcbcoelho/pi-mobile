import axios from 'axios';
import endpoints from './endpoints';

export const api = axios.create({
	baseURL: endpoints.BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
	// withCredentials indica se as requisições de controle de acesso entre sites devem ou não ser feitas utilizando credenciais
	// essa propriedade é necessária para que possamos retornar o secure cookie como resposta das requisições
});
