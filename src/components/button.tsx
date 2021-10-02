import React from 'react';
import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { SHADOW, THEME_COLORS } from '../theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 8,
    height: 50,
    width: '90%',
    backgroundColor: THEME_COLORS.secondary,
    borderRadius: 8,
    ...SHADOW,
  },
  disabled: {
    backgroundColor: THEME_COLORS.disabled,
  },
  title: {
    fontSize: 24,
    color: THEME_COLORS.background,
    textAlign: 'center',
  },
});

type Props = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

const Button = (props: Props) => {
  const { title, disabled, onPress } = props;
  const buttonStyle = disabled ? [styles.container, styles.disabled] : styles.container;

  return (
    <Pressable
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;
