import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>CI / CD</Text>

      <Text style={styles.name}>Attay Rasool (OTA)</Text>

      <Text style={styles.paragraph}>
        This screen represents a simple overview of CI/CD (Continuous Integration
        and Continuous Deployment). CI/CD helps automate building, testing, and
        deploying applications, making development faster, more reliable, and
        less error-prone. By using pipelines, teams can ensure code quality and
        smooth delivery across environments.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default App;
