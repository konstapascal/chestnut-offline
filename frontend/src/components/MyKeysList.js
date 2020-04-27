import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { List, Button } from 'semantic-ui-react';
import { AuthContext } from '../context/auth-context';

const MyKeysList = () => {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [loadedKeys, setLoadedKeys] = useState([]);

	useEffect(() => {
		const fetchMyKeys = async () => {
			setIsLoading(true);
			const response = await Axios.get(
				'http://localhost:8080/api/keys/users/me',
				{
					headers: {
						Authorization: auth.token,
					},
				}
			)
				.then((response) => {
					console.log(response.data);
					setLoadedKeys(response.data.keypairs);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		};
		fetchMyKeys();
	}, [Axios.get]);

	return (
		<List as='ul' divided relaxed>
			{!isLoading &&
				loadedKeys.map((item) => (
					<List.Item as='a'>
						<List.Icon name='key' size='large' verticalAlign='middle' />
						<List.Content>
							<List.Header>{item.Name}</List.Header>
							<Button floated='right' size='small' compact negative>
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
