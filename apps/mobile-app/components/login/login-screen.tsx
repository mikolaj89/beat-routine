import React from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, LoginFormData } from './login-form.utils';
import { useLogin } from '@drum-scheduler/sdk';
import { API_BASE_URL } from '@drum-scheduler/config';
import { styles } from './login-screen.style';
import { theme } from '../../utils/theme';

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess: (user: any) => void }) {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
    // @ts-expect-error - zodResolver type inference issue with react-hook-form
    resolver: zodResolver(LoginFormSchema),
  });
  const { mutate: login, isPending, error } = useLogin(API_BASE_URL);

  const onSubmit = (data: LoginFormData) => {
    login(data);
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
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
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
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
      <View style={styles.buttonWrap}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={{ width: '100%' }}
        >
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </View>
      {isPending && <ActivityIndicator style={styles.loading} />}
    </View>
  );
}
