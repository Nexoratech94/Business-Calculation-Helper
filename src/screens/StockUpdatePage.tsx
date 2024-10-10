import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTotalStock } from '../redux/slices/businessSlice';

const StockUpdatePage: React.FC = () => {
  const [stock, setStock] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (stock) {
      dispatch(setTotalStock(parseInt(stock)));
      setStock('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Update</Text>
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Update Stock" onPress={handleSubmit} />
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

export default StockUpdatePage;
