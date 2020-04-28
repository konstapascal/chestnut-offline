import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { List, Button } from 'semantic-ui-react';
import { AuthContext } from '../context/auth-context';

const MyKeysList = () => {
	const auth = useContext(AuthContext);
	const authHeader = {
		headers: {
			Authorization: auth.token,
		},
	};

	const [isLoading, setIsLoading] = useState(false);
	const [loadedKeys, setLoadedKeys] = useState([]);

	const getUrl = 'http://localhost:8080/api/keys/users/me';

	// GET my all keys request
	useEffect(() => {
		const fetchMyKeys = async () => {
			setIsLoading(true);
			await Axios.get(getUrl, authHeader)
				.then((response) => {
					setLoadedKeys(response.data.keypairs);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		};
		fetchMyKeys();
	}, [Axios.get]);

	// DELETE a key request
	function deleteKey(KeypairID) {
		const deleteUrl = 'http://localhost:8080/api/keys/' + KeypairID;

		setIsLoading(true);
		Axios.delete(deleteUrl, authHeader)
			.then(() => {
				return Axios.get(getUrl, authHeader);
			})
			.then((response) => {
				const updatedKeys = response.data.keypairs;
				setLoadedKeys(updatedKeys);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}

	return (
		<List as='ul' divided relaxed>
			{!isLoading &&
				loadedKeys.map((item) => (
					<List.Item as='a' key={item.KeypairID}>
						<List.Icon name='key' size='large' verticalAlign='middle' />
						<List.Content>
							<List.Header>{item.Name}</List.Header>
							<Button
								floated='right'
								size='small'
								compact
								negative
								onClick={() => deleteKey(item.KeypairID)}
							>
								Delete
							</Button>
							<List.Description>ID: {item.KeypairID}</List.Description>
							<List.Description>Type: {item.Type}</List.Description>
							<List.Description>Length: {item.Length}</List.Description>
						</List.Content>
					</List.Item>
				))}
		</List>
	);
};

export default MyKeysList;
