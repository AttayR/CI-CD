import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
//Snackbar
import Snackbar from 'react-native-snackbar';

//context Api
import {AppwriteContext} from '../appwrite/AppwriteContext';

//Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../routes/AuthStack';

type SignupScreensProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup = ({navigation}: SignupScreensProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
      console.log('Validation Error: All fields are required');
    } else if (password !== repeatPassword) {
      setError('Passwords do not match');
      console.log('Validation Error: Passwords do not match');
    } else {
      const user = {
        email,
        password,
        name,
      };

      console.log('Signup Request Data:', user); // Log request data

      appwrite
        .createAccount(user)
        .then((response: any) => {
          if (response) {
            console.log('Signup Success:', response);
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Signup Success',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          console.error('Signup Error:', err);
          setError(err.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Name */}
        <TextInput
          value={name}
          onChangeText={text => {
            setError('');
            setName(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
        />

        {/* Email */}
        <TextInput
          value={email}
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Repeat Password */}
        <TextInput
          value={repeatPassword}
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repear Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {/* SignUp button */}
        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
        {/* Login Navigation  */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}>
          <Text>
            Already have an account?{' '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginLabel: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
