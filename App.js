import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function App() {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    Alert.alert('Dia Selecionado', `Você selecionou a data: ${day.dateString}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PoC de Agendamento</Text>
      <Calendar
        // Marca a data selecionada
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'blue',
            selectedTextColor: 'white',
          },
        }}
        // Função chamada ao pressionar um dia
        onDayPress={onDayPress}
        style={styles.calendar}
        // Configurações de tema (opcional)
        theme={{
          todayTextColor: 'red',
          arrowColor: 'black',
        }}
      />
      <Text style={styles.selectedDateText}>
        {selectedDate ? `Data selecionada: ${selectedDate}` : 'Selecione uma data no calendário.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    width: '95%',
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});