import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from '../images/chestnut.png';

const NavbarFunctional = () => {
	const [activeItem, setActiveItem] = useState('');

	// Highlights the clicked item on navbar
	const handleItemClick = (event, { name }) => setActiveItem(name);

	return (
		<Menu color='green' stackable inverted attached='top'>
			<Menu.Item as={Link} exact to='/'>
				<img src={logo} alt='Chestnut Logo' />
			</Menu.Item>
			<Menu.Item
				exact
				to='/'
				name='Home'
				active={activeItem === 'Home'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				exact
				to='/'
				name='Application'
				active={activeItem === 'Application'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				exact
				to='/'
				name='Keys'
				active={activeItem === 'Keys'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				exact
				to='/'
				name='Users'
				active={activeItem === 'Users'}
				onClick={handleItemClick}
			></Menu.Item>

			<Menu.Menu position='right'>
				<Menu.Item
					as={Link}
					exact
					to='/Login'
					name='Login'
					active={activeItem === 'Login'}
					onClick={handleItemClick}
					position='right'
				></Menu.Item>
				<Menu.Item
					as={Link}
					exact
					to='/Login'
					name='Register'
					active={activeItem === 'Register'}
					onClick={handleItemClick}
				></Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default NavbarFunctional;
