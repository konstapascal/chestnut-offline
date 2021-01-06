import React from 'react';
import { useLocation } from 'react-router-dom';

function ErrorPage() {
	const location = useLocation();

	return <div>Could not find: {location.pathname}</div>;
}

export default ErrorPage;
