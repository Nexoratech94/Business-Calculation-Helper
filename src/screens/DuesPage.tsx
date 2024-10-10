import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addDueToDB,  } from '../redux/slices/businessSlice'; // Ensure you have an action for clearing dues

const DuesPage: React.FC = () => {
  const [buyerName, setBuyerName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [clearBuyerName, setClearBuyerName] = useState("");
  const [clearAmount, setClearAmount] = useState("");
  const [clearDate, setClearDate] = useState(new Date().toLocaleDateString());
  const [isDuesSection, setIsDuesSection] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddDue = () => {
    if (buyerName && amount && date) {
      dispatch(addDueToDB({ buyerName, amount: parseFloat(amount), date }));
      setBuyerName("");
      setAmount("");
      setDate(new Date().toLocaleDateString()); // Reset date to current date
    }
  };

  const handleClearDue = () => {
    if (clearBuyerName && clearAmount && clearDate) {
      dispatch(
        clearDueFromDB({
          buyerName: clearBuyerName,
          amount: parseFloat(clearAmount),
          date: clearDate,
        })
      );
      setClearBuyerName("");
      setClearAmount("");
      setClearDate(new Date().toLocaleDateString()); // Reset date to current date
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dues</Text>
      <View style={styles.buttonContainer}>
        <View style={{marginRight:8}}>
          <Button title="Dues" onPress={() => setIsDuesSection(true)} />
        </View>
        <Button title="Cleared" onPress={() => setIsDuesSection(false)} />
      </View>
      {isDuesSection ? (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Buyer Name"
            value={buyerName}
            onChangeText={setBuyerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={date}
            onChangeText={setDate}
          />
          <Button title="Add Due" onPress={handleAddDue} />
        </View>
      ) : (
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Buyer Name"
            value={clearBuyerName}
            onChangeText={setClearBuyerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={clearAmount}
            onChangeText={setClearAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={clearDate}
            onChangeText={setClearDate}
          />
          <Button title="Clear Due" onPress={handleClearDue} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  section: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default DuesPage;
function clearDueFromDB(arg0: { buyerName: string; amount: number; date: string; }): any {
  throw new Error("Function not implemented.");
}

