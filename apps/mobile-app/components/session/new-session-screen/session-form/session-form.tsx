import React from 'react';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {  HelperText, Text, TextInput } from 'react-native-paper';
import { NewSessionFormData, newSessionSchema } from '../new-session-screen-helper';
import { styles } from './session-form.style';
import { Button } from '@/components/button';

export function SessionForm({
  isSubmitting,
  submitError,
  onSubmit,
}: {
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: (data: NewSessionFormData) => Promise<void>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSessionFormData>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(newSessionSchema),
  });

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Create practice session</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID="new-session-name-input"
            label="Name"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={Boolean(errors.name)}
            disabled={isSubmitting}
          />
        )}
      />
      <HelperText type="error" visible={Boolean(errors.name)}>
        {errors.name?.message}
      </HelperText>

      {submitError ? <Text style={styles.errorText}>{submitError}</Text> : null}

      <View style={styles.submitWrap}>

        <Button 
          testID="create-session-submit"
          type="Primary"
          label="Create Session"
          onPress={handleSubmit((formData) => {
            void onSubmit(formData);
          })}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
}
