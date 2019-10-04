export function postLoginRegistration(model, data) {
    return fetch(`http://127.0.0.1:8000/api/v1/${model}`, {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
            'Accept': 'application/json'
		},
        body: JSON.stringify(data)
    }).then((response) => response.json()); 
}

export function postNotificationCreate(model, data, token) {
    return fetch(`http://127.0.0.1:8000/api/v1/${model}`, {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${token}`
		},
        body: JSON.stringify(data)
    }).then((response) => response.json());
}

export function get(model, token) {
    return fetch(`http://127.0.0.1:8000/api/v1/${model}`, {
        method: 'GET',
        headers: {
			'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'JWT ' + token
        }
    }).then((response) => response.json());
}