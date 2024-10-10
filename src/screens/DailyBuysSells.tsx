import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTransactionToDB } from '../redux/slices/businessSlice';

const DailyBuysSellsPage: React.FC = () => {
  const [buyerName, setBuyerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (buyerName && quantity && date) {
      dispatch(addTransactionToDB({ buyerName, quantity: parseInt(quantity), date }));
      setBuyerName('');
      setQuantity('');
      setDate('');
    }
  };
  const [date, setDate] = useState(new Date().toLocaleDateString());
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Buys & Sells</Text>
      <TextInput
        style={styles.input}
        placeholder="Buyer Name"
        value={buyerName}
        onChangeText={setBuyerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Transaction" onPress={handleSubmit} />
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
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default DailyBuysSellsPage;
