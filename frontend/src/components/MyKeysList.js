import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { List, Button, Tab } from 'semantic-ui-react';
import { AuthContext } from '../context/auth-context';
import { useLocation } from 'react-router-dom';

import moment from 'moment';

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
	let location = useLocation();

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
	}, []);

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

	const listPanes = [
		{
			menuItem: 'My keypairs',
			render: () => (
				<Tab.Pane>
					<List as='ul' divided relaxed>
						{!isLoading &&
							loadedKeys.map((item) => (
								<List.Item as='a' key={item.KeypairID}>
									<List.Icon name='key' size='large' verticalAlign='middle' />
									<List.Content>
										<List.Header>{item.Name}</List.Header>
										{location.pathname === '/keys' && (
											<Button
												floated='right'
												size='small'
												compact
												negative
												onClick={() => deleteKey(item.KeypairID)}
											>
												Delete
											</Button>
										)}
										<List.Description>Length: {item.Length}</List.Description>
										<List.Description>
											{/*API request date is in UTC, so converting to local time*/}
											Date:{' '}
											{moment(item.createdAt)
												.local()
												.format('DD/MM/YYYY, HH:MM')}
										</List.Description>
									</List.Content>
								</List.Item>
							))}
					</List>
				</Tab.Pane>
			),
		},
		{
			menuItem: 'User Public Keys',
			render: () => <Tab.Pane>Saved User Keys</Tab.Pane>,
		},
	];

	return <Tab panes={listPanes} />;
};

export default MyKeysList;
