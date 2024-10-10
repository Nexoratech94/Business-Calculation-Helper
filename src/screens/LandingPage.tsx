import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  DailyBuysSells: undefined;
  Dues: undefined;
  StockUpdate: undefined;
  TotalCalculation: undefined;
};

type LandingPageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type LandingPageRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: LandingPageNavigationProp;
  route: LandingPageRouteProp;
}

const LandingPage: React.FC<Props> = ({ navigation }) => {
  const { totalStock, totalCash } = useSelector((state: RootState) => state.business);
  const currentDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landing Page</Text>
      <Text style={styles.text}>Date: {currentDate}</Text>
      <Text style={styles.text}>Total Stock: {totalStock}</Text>
      <Text style={styles.text}>Total Cash: {totalCash}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default LandingPage;
