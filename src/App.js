import React from 'react';
import Calculator from './containers/Calculator/Calculator';
import { GlobalStyle } from './style/GlobalStyle';

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Calculator />
		</>
	);
};

export default App;
