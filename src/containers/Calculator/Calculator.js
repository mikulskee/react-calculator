import React from 'react';
import ButtonNumber from '../../components/ButtonNumber/ButtonNumber';
import { ButtonsWrapper, Wrapper } from './Calculator.Styles';
import { buttonContentData } from './Calculator.Data';

const Calculator = () => {
	return (
		<Wrapper>
			<ButtonsWrapper>
				{buttonContentData.map((item) => {
					return (
						<ButtonNumber key={item.id} size={item.size} id={item.content} color={item.color}>
							{item.content}
						</ButtonNumber>
					);
				})}
			</ButtonsWrapper>
		</Wrapper>
	);
};

export default Calculator;
