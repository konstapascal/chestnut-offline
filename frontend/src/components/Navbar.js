import React, { useState, useContext } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../images/chestnut.png';

const Navbar = () => {
	const [activeItem, setActiveItem] = useState('');

	// Highlights the clicked item on navbar
	const handleItemClick = name => setActiveItem(name);

	return (
		<Menu
			stackable
			inverted
			attached='top'
			style={{ backgroundColor: '#14872f' }}>
			<Menu.Item
				as={Link}
				to='/chestnut-offline'
				style={{ textAlign: 'center' }}>
				<img src={logo} alt='Chestnut Logo' />
			</Menu.Item>
			<Menu.Item
				as={NavLink}
				to='/chestnut-offline/application'
				exact
				name='Home'
				active={activeItem === 'Home'}
				onClick={handleItemClick}
				style={{ textAlign: 'center' }}>
				<Icon name='computer' style={{ marginRight: '.5rem' }} />
				Application
			</Menu.Item>
			<Menu.Item
				as={NavLink}
				to='/chestnut-offline/keys'
				name='Keys'
				active={activeItem === 'Keys'}
				onClick={handleItemClick}>
				<Icon name='key' style={{ marginRight: '.5rem' }} />
				Manage Keys
			</Menu.Item>
		</Menu>
	);
};

export default Navbar;
