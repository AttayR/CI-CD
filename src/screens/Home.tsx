import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//react native elements
import {FAB} from '@rneui/themed';
//Snackbar
import Snackbar from 'react-native-snackbar';

//context Api
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Image} from '@rneui/base';

type UserObj = {
  name: String;
  email: String;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj>();
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };
  useEffect(() => {
    appwrite.getCurrentUser().then(response => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email,
        };
        console.log('user data in home screen:', user);

        setUserData(user);
      }
    });
  }, [appwrite]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in one Place.
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name:{userData.name}</Text>
            <Text style={styles.userDetails}>Email:{userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    // color: 'red'
  },
  userContainer: {
    // color: 'grey',
  },
  userDetails: {
    color: 'black',
  },
  message: {
    fontSize: 12,
  },
});
