export function post(model, data) {
    return fetch(`http://127.0.0.1:8000/api/v1/${model}`, {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
            'Accept': 'application/json',
		},
        body: JSON.stringify(data)
    }).then((response) => response.json()); 
}