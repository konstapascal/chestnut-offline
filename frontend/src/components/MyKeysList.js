import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import {
	Menu,
	List,
	Tab,
	Icon,
	Button,
	Modal,
	Header,
	Message,
} from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import KeysWarningTooltip from './Tooltips/KeysWarningTooltip';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import { SelectedKeyContext } from '../context/selected-key-context';

const MyKeysList = ({ refreshKeys }) => {
	const auth = useContext(AuthContext);
	const { selectedKey, setSelectedKey } = useContext(SelectedKeyContext);

	const [loadedKeys, setLoadedKeys] = useState([]);
	const [loadedPublicKeys, setLoadedPublicKeys] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [activeKey, setActiveKey] = useState(selectedKey.Name);

	const authHeader = {
		headers: {
			Authorization: auth.token,
		},
	};

	const handleDeleteModalOpen = (modalID) => setModalOpen(modalID);
	const handleDeleteModalClose = () => setModalOpen(false);

	const handleActiveKey = (ID, Name, publicKey, privateKey = '') => {
		setActiveKey(ID);
		setSelectedKey({
			ID: ID,
			Name: Name,
			PublicKey: publicKey,
			PrivateKey: privateKey,
		});
	};

	const getUrl = 'http://localhost:8080/api/keys/users/me';
	const location = useLocation();
	const history = useHistory();

	// GET all my keys request
	const fetchMyKeys = () => {
		Axios.get(getUrl, authHeader)
			.then((response) => {
				setLoadedKeys(response.data.keypairs);
			})
			.catch((err) => {
				setLoadedKeys([]);
				console.log(err.response.data);
			});
	};

	useEffect(() => {
		fetchMyKeys();
	}, [refreshKeys]);

	// Get saved public keys from localstorage
	useEffect(() => {
		const storageKeys = JSON.parse(localStorage.getItem('addedPublicKeys'));

		if (storageKeys === null) {
			// Make new local storage field if there isn't one
			return localStorage.setItem('addedPublicKeys', JSON.stringify([]));
		} else {
			// If there is local storage data, add it to state
			setLoadedPublicKeys(storageKeys);
		}
	}, []);

	// DELETE a key request
	const deleteKey = (KeypairID, KeypairName) => {
		const deleteUrl = 'http://localhost:8080/api/keys/' + KeypairID;

		// If the key being deleted is already selected by the user, unselect it.
		if (KeypairName === selectedKey.Name) {
			setSelectedKey({
				PublicKey: '',
				PrivateKey: '',
				Name: '',
			});
		}

		Axios.delete(deleteUrl, authHeader)
			.then(() => {
				return Axios.get(getUrl, authHeader);
			})
			.then((response) => {
				setLoadedKeys(response.data.keypairs);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	// Remove public key from list and local storage
	const removePublicKey = (KeypairID, KeypairName) => {
		// If the public key being removed is already selected, unselect it.
		if (KeypairName === selectedKey.Name) {
			setSelectedKey({
				PublicKey: '',
				PrivateKey: '',
				Name: '',
			});
		}

		const newLoadedPublicKeys = loadedPublicKeys.filter(
			(key) => key.ID !== KeypairID
		);

		setLoadedPublicKeys(newLoadedPublicKeys);
		localStorage.setItem(
			'addedPublicKeys',
			JSON.stringify(newLoadedPublicKeys)
		);
	};

	const toKeysPage = () => {
		setSelectedKey('');
		history.push('/keys');
	};

	const listPanes = [
		{
			menuItem: <Menu.Item>My Keypairs</Menu.Item>,
			render: () => (
				<Tab.Pane>
					<List divided relaxed>
						{loadedKeys.length === 0 && (
							<Message style={{ textAlign: 'center' }}>
								<Icon name='key' size='large' verticalAlign='middle' />
								No keypairs.
								{location.pathname === '/' && (
									<span>
										{' '}
										Click <Link onClick={() => toKeysPage()}>here</Link> to make
										one.
									</span>
								)}
							</Message>
						)}
						{loadedKeys.map((item) => (
							<List.Item
								key={item.KeypairID}
								style={
									selectedKey.ID === item.KeypairID
										? {
												background: '#c4edcd',
												padding: '.5rem',
												cursor: 'pointer',
										  }
										: { padding: '.5rem', cursor: 'pointer' }
								}
							>
								<List.Icon name='key' size='large' verticalAlign='middle' />
								<List.Content
									onClick={() =>
										handleActiveKey(
											item.KeypairID,
											item.Name,
											item.PublicKey,
											item.PrivateKey
										)
									}
								>
									<List.Header>{item.Name}</List.Header>
									<List.Description>Length: {item.Length}</List.Description>
									<List.Description>
										Created:{' '}
										{moment(item.createdAt)
											.local()
											.format('DD MMM YYYY, HH:mm')}
									</List.Description>
								</List.Content>

								{location.pathname === '/keys' && (
									<Modal
										trigger={
											<List.Icon
												name='trash alternate outline'
												size='large'
												floated='right'
												verticalAlign='middle'
												negative
												onClick={() => handleDeleteModalOpen(item.KeypairID)}
											/>
										}
										size='tiny'
										open={modalOpen === item.KeypairID}
										onClose={handleDeleteModalClose}
										closeIcon
									>
										<Header icon='delete' color='red' content='Delete key?' />
										<Modal.Content>
											<p>
												Are you sure you want to delete <b>{item.Name}</b>?
											</p>
										</Modal.Content>
										<Modal.Actions>
											<Button color='red' onClick={handleDeleteModalClose}>
												<Icon name='remove' /> No
											</Button>
											<Button
												color='green'
												onClick={() => deleteKey(item.KeypairID, item.Name)}
											>
												<Icon name='checkmark' />
												Yes
											</Button>
										</Modal.Actions>
									</Modal>
								)}
							</List.Item>
						))}
						{loadedKeys.length !== 0 && location.pathname === '/' && (
							<Message style={{ textAlign: 'center' }}>
								Click <Link onClick={() => toKeysPage()}>here</Link> create more
								keys.
							</Message>
						)}
					</List>
				</Tab.Pane>
			),
		},
		{
			menuItem: (
				<Menu.Item>
					<span>Imported Keys</span>
					<KeysWarningTooltip />
				</Menu.Item>
			),
			render: () => (
				<Tab.Pane>
					<List divided relaxed>
						{loadedPublicKeys.length === 0 && (
							<Message style={{ textAlign: 'center' }}>
								<Icon name='key' size='large' verticalAlign='middle' />
								Click <Link to='/users'>here</Link> to add public keys.
							</Message>
						)}
						{loadedPublicKeys.map((key) => (
							<List.Item
								key={key.ID}
								style={
									selectedKey.ID === key.ID
										? {
												background: '#c4edcd',
												padding: '.5rem',
												cursor: 'pointer',
										  }
										: { padding: '.5rem', cursor: 'pointer' }
								}
							>
								<List.Icon name='key' size='large' verticalAlign='middle' />
								<List.Content
									onClick={() =>
										handleActiveKey(key.ID, key.keyName, key.publicKey)
									}
								>
									<List.Header>{key.keyName}</List.Header>
									<List.Description>
										Owner: <b>{key.keyOwner}</b>
									</List.Description>
									<List.Description>Length: {key.keyLength}</List.Description>
								</List.Content>
								{location.pathname === '/keys' && (
									<List.Icon
										name='trash alternate outline'
										size='large'
										floated='right'
										size='large'
										verticalAlign='middle'
										negative
										onClick={() => removePublicKey(key.ID, key.keyName)}
									/>
								)}
							</List.Item>
						))}
						{loadedPublicKeys.length !== 0 && (
							<Message style={{ textAlign: 'center' }}>
								Click <Link to='/users'>here</Link> to add more public keys.
							</Message>
						)}
					</List>
				</Tab.Pane>
			),
		},
	];

	return (
		<Tab
			panes={listPanes}
			defaultActiveIndex={
				selectedKey.PublicKey && !selectedKey.PrivateKey ? 1 : 0
			}
		/>
	);
};

export default MyKeysList;
