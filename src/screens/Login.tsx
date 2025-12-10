import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { AppwriteContext } from '../appwrite/AppwriteContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';

type LoginScreensProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({ navigation }: LoginScreensProps) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    const user = { email, password };
    appwrite
      .login(user)
      .then(response => {
        if (response) {
          setIsLoggedIn(true);
          Snackbar.show({
            text: 'Login Success',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      })
      .catch(err => {
        console.log(err);
        setError('Incorrect email or password');
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Email */}
        <TextInput
          value={email}
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholder="Email"
          placeholderTextColor="#AEAEAE"
          style={styles.input}
          keyboardType="email-address"
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholder="Password"
          placeholderTextColor="#AEAEAE"
          secureTextEntry
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Sign Up Button */}
        <Pressable onPress={handleLogin} style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>

        {/* Login Navigation */}
        <Pressable onPress={() => navigation.navigate('Signup')} style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLabel}>SignUp</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#333',
  },
  loginLabel: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
