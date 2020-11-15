import React from 'react';
import { CalculatorScreenWrapper, UpperWrapper, ResultWrapper } from './CalculatorScreen.Style';

const CalculatorScreen = (props) => {
	const { number, upperEquation } = props;
	return (
		<CalculatorScreenWrapper>
			<UpperWrapper>{upperEquation}</UpperWrapper>
			<ResultWrapper>{number}</ResultWrapper>
		</CalculatorScreenWrapper>
	);
};

export default CalculatorScreen;
