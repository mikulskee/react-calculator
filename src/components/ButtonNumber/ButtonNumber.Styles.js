import styled from 'styled-components';

export const ButtonNumberWrapper = styled.button`
	cursor: pointer;
	border: none;
	width: ${({ size }) => (size === 'big' ? '50%' : '25%')};
	height: ${({ buttonWidth }) => `${buttonWidth}px`};
`;
