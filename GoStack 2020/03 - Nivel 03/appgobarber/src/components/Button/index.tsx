import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, onPress }) => (
  <Container onPress={onPress}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
