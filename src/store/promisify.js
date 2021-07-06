const promisify =
	(callbacker, ...params) =>
	(...args) =>
		new Promise((resolve, reject) => {
			try {
				callbacker(...args, resolve, ...params);
			} catch (err) {
				reject(err);
			}
		});

export default promisify;
