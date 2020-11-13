import React from 'react';
import { CalculatorScreenWrapper, UpperWrapper, ResultWrapper } from './CalculatorScreen.Style';

const CalculatorScreen = (props) => {
	const { number, equation } = props;
	return (
		<CalculatorScreenWrapper>
			<UpperWrapper>{equation}</UpperWrapper>
			<ResultWrapper>{number}</ResultWrapper>
		</CalculatorScreenWrapper>
	);
};

export default CalculatorScreen;
