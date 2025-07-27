import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { buttonStyles } from './styles';

const Button = ({ title }: { title: string }) => {
  const styles = buttonStyles();
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.txtStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
