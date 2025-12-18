import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// context
import {AppwriteContext} from '../appwrite/AppwriteContext';

type UserObj = {
  name: string;
  email: string;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj | null>(null);
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const handleLogout = async () => {
    await appwrite.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    appwrite.getCurrentUser().then(response => {
      if (response) {
        setUserData({
          name: response.name,
          email: response.email,
        });
      }
    });
  }, [appwrite]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome 👋</Text>

        <Text style={styles.message}>
          Build Fast. Scale Big. All in one Place.
        </Text>

        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>Name: {userData.name}</Text>
            <Text style={styles.userText}>Email: {userData.email}</Text>
          </View>
        )}

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
  },
  userContainer: {
    marginBottom: 24,
  },
  userText: {
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#f02e65',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});
