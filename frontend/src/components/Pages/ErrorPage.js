import React from 'react';

function ErrorPage({ match }) {
	console.log(match);

	return <div>Could not find: {match.params.queryParam}</div>;
}

export default ErrorPage;
