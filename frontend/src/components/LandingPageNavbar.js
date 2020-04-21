import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from '../images/chestnut.png';

const NavbarFunctional = () => {
	const [activeItem, setActiveItem] = useState('Home');

	// Highlights the clicked item on navbar
	const handleItemClick = (event, { name }) => setActiveItem(name);

	return (
		<Menu color='green' stackable inverted attached='top'>
			<Menu.Item as={Link} exact to='/' name='Home' onClick={handleItemClick}>
				<img src={logo} alt='Chestnut Logo' />
			</Menu.Item>
			<Menu.Item
				as={Link}
				exact
				to='/'
				name='Home'
				active={activeItem === 'Home'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				as={Link}
				exact
				to='/application'
				name='Application Page'
				active={activeItem === 'Application Page'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				as={Link}
				exact
				to='/keys'
				name='My Keys'
				active={activeItem === 'My Keys'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				as={Link}
				exact
				to='/users'
				name='Search Users'
				active={activeItem === 'Search Users'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				as={Link}
				exact
				to='/settings'
				name='Account Settings'
				active={activeItem === 'Account Settings'}
				onClick={handleItemClick}
			></Menu.Item>
			<Menu.Item
				as={Link}
				exact
				to='/admin'
				name='Admin Page'
				active={activeItem === 'Admin Page'}
				onClick={handleItemClick}
			></Menu.Item>

			<Menu.Menu position='right'>
				<Menu.Item
					as={Link}
					exact
					to='/login'
					name='Login'
					active={activeItem === 'Login'}
					onClick={handleItemClick}
					position='right'
				></Menu.Item>
				<Menu.Item
					as={Link}
					exact
					to='/signup'
					name='Register'
					active={activeItem === 'Signup'}
					onClick={handleItemClick}
				></Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default NavbarFunctional;
