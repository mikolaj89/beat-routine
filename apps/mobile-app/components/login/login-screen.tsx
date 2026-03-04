import React from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, LoginFormData } from './login-form.utils';
import { styles } from './login-screen.style';
import { theme } from '../../utils/theme';
import { useAuth } from '../../providers/auth-provider';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
    // @ts-expect-error - zodResolver type inference issue with react-hook-form
    resolver: zodResolver(LoginFormSchema),
  });
  const { login, isLoginPending, loginError } = useAuth();

  const onSubmit = (data: LoginFormData) => {
    void login(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your credentials to sign in.</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            placeholderTextColor={theme.colors.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            placeholderTextColor={theme.colors.textMuted}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}
      <View style={styles.buttonWrap}>
        <Button
          mode="contained"
          onPress={handleSubmit(data => {
            void onSubmit(data);
          })}
          disabled={isLoginPending}
          style={{ width: '100%' }}
        >
          {isLoginPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </View>
      {isLoginPending && <ActivityIndicator style={styles.loading} />}
    </View>
  );
}
