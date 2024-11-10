import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState("");

  const handlePress = (value: any) => {
    if (value === "=") {
      try {
        setDisplay(eval(display).toLocaleString()); // Format result with commas
      } catch (error) {
        setDisplay("Error");
      }
    } else if (value === "C") {
      setDisplay("");
    } else if (value === "⌫") {
      setDisplay(display.slice(0, -1));
    } else if (value === "±") {
      setDisplay((prev) => (prev[0] === "-" ? prev.slice(1) : "-" + prev));
    } else if (value === "%") {
      try {
        setDisplay((eval(display) / 100).toString());
      } catch {
        setDisplay("Error");
      }
    } else if (value === "√") {
      try {
        setDisplay(Math.sqrt(eval(display)).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    ["C", "√", "%", "⌫"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "±", "+"],
    ["="],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display || "0"}</Text>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonValue) => (
              <TouchableOpacity
                key={buttonValue}
                style={[
                  styles.button,
                  buttonValue === "="
                    ? styles.equalsButton
                    : buttonValue === "C"
                    ? styles.clearButton
                    : buttonValue.match(/[+\-*/√%]/)
                    ? styles.operatorButton
                    : styles.numberButton,
                ]}
                onPress={() => handlePress(buttonValue)}
              >
                <Text style={styles.buttonText}>{buttonValue}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  display: {
    fontSize: 40,
    paddingVertical: 20,
    paddingHorizontal: 10,
    color: '#1e1e2d',
    textAlign: 'right',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  buttons: {
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  numberButton: {
    backgroundColor: '#e0e0e0',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
  },
  equalsButton: {
    backgroundColor: '#34c759',
    width: '100%',
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 10,
  },
});
