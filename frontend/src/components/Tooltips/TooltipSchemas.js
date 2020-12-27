import React from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const BasicTooltip = props => {
	return (
		<Tippy
			animation='fade'
			arrow={false}
			delay={150}
			theme='light'
			{...props}
		/>
	);
};

const InfoTooltip = props => {
	return (
		<Tippy
			animation='fade'
			arrow={true}
			delay={150}
			theme='light'
			trigger='click'
			{...props}
		/>
	);
};

export { BasicTooltip, InfoTooltip };
