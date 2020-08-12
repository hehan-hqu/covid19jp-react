import axios from 'axios';

export function getVirusDataOnTime() {
	return axios({
		method: 'get',
		url: 'https://data.covid19japan.com/summary/latest.json',
	});
}
