import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { List, Item, Segment, Input } from 'semantic-ui-react';
import { AuthContext } from '../context/auth-context';

const UsersList = () => {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({
		search: '',
	});
	const [loadedUser, setLoadedUsers] = useState({ users: [] });
	let search = '';

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			const response = await Axios.get('http://localhost:8080/api/users/', {
				headers: {
					Authorization: auth.token,
				},
			});

			setLoadedUsers(response.data);
			setIsLoading(false);
		};

		fetchUsers();
	}, [auth.token]);

	const handleChange = (event) => {
		setState({ search: event.target.value });
		search = event.target.value;
		console.log(event.target.value);
	};

	return (
		<div>
			<Segment style={{ margin: '2.5rem' }}>
				<List as='ul' divided relaxed>
					<List.Item>
						<h1>List of users</h1>
						<div>
							<Input icon='search' onChange={handleChange} />
						</div>
					</List.Item>
				</List>
			</Segment>
		</div>
	);
};

export default UsersList;
