import React from 'react';
import Calculator from './components/Calculator/Calculator';
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
