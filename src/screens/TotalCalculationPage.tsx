import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchTransactions, fetchDues } from '../redux/slices/businessSlice';

const TotalCalculationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.business.transactions);
  const dues = useSelector((state: RootState) => state.business.dues);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchDues());
  }, [dispatch]);

  const totalSales = transactions.reduce((total, item) => total + item.quantity, 0);
  const totalDues = dues.reduce((total, due) => total + due.amount, 0);
  const currentDate = new Date().toLocaleDateString();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Calculation</Text>
      <Text style={styles.text}>Date: {currentDate}</Text>
      <Text style={styles.text}>Total Sales: {totalSales}</Text>
      <Text style={styles.text}>Total Dues: {totalDues}</Text>
      <Text style={styles.text}>Remaining Cash: {totalSales - totalDues}</Text>
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

export default TotalCalculationPage;
