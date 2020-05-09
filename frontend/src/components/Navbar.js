import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../images/chestnut.png';
import { AuthContext } from '../context/auth-context';

const Navbar = () => {
	const [activeItem, setActiveItem] = useState('');
	const auth = useContext(AuthContext);

	// Highlights the clicked item on navbar
	const handleItemClick = (name) => setActiveItem(name);

	return (
		<Menu color='green' stackable inverted attached='top'>
			<Menu.Item as={Link} exact to='/' onClick={handleItemClick}>
				<img src={logo} alt='Chestnut Logo' />
			</Menu.Item>
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/'
					name='Application Page'
					active={activeItem === 'Application Page'}
					onClick={handleItemClick}
				></Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/keys'
					name='My Keys'
					active={activeItem === 'My Keys'}
					onClick={handleItemClick}
				></Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/users'
					name='Search Users'
					active={activeItem === 'Search Users'}
					onClick={handleItemClick}
				></Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item
					as={NavLink}
					exact
					to='/settings'
					name='Account Settings'
					active={activeItem === 'Account Settings'}
					onClick={handleItemClick}
				></Menu.Item>
			)}
			{auth.isLoggedIn && auth.isAdmin && (
				<Menu.Item
					as={NavLink}
					exact
					to='/admin'
					name='Admin Page'
					active={activeItem === 'Admin Page'}
					onClick={handleItemClick}
				></Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item position='right'>
					<p>
						Logged in as <b>{auth.username}</b>
					</p>
				</Menu.Item>
			)}
			{auth.isLoggedIn && (
				<Menu.Item name='Logout' onClick={auth.logout}></Menu.Item>
			)}
		</Menu>
	);
};

export default Navbar;
