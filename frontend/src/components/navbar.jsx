import React from 'react';

const Navbar = () => {
	const imgLink = 'https://www.vy.no/web-assets/favicons/favicon-512x512.png';

	const imgStyle = {
		width: '50px',
		height: '50px',
	};

	return (
		<div style={{ borderBottom: 'grey solid 2px' }}>
			<img style={imgStyle} src={imgLink} alt="VY-logo"></img>
		</div>
	);
};

export default Navbar;
