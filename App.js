//imports que serão usados
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions, Alert } from "react-native";
import { Calendar } from "react-native-calendars";

//cores que serão usadas
const COLORS = {
  bg: "#DDE6F0",
  orange: "#FC8200",
  blue: "#005A93",
  beige: "#EED8C7",
  textDark: "#000000",
  white: "#FFFFFF",
};

//categorias de prestadores de serviços
const CATEGORIES = [
  "Chaveiro", "Eletricista",
  "Encanador", "Gás & Água",
  "Limpeza pós Obra", "Marido de Aluguel",
  "Marceneiro", "Pedreiro",
  "Pintor", "Vidraceiro",
];

// Componente principal da tela
export default function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { width } = useWindowDimensions();

// tela do app
  const isWide = width >= 900;

  //função para o botão continuar
  function handleContinue() {
    if (!selectedCategory || !selectedDate) {
      Alert.alert("Quase lá!", "Selecione uma categoria e uma data.");
      return;
    }
    Alert.alert("Resumo", `Categoria: ${selectedCategory}\nData: ${selectedDate}`);
  }

  // renderização 
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.sectionTitle}>Reformas & Reparos</Text>
      <View style={[styles.contentRow, { flexDirection: isWide ? "row" : "column" }]}>
        <View style={[styles.leftCol, { marginRight: isWide ? 16 : 0 }]}>
          <View style={styles.grid}>
            {CATEGORIES.map((label) => {
              const active = selectedCategory === label;
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.catButton, active && styles.catButtonActive]}
                  onPress={() => setSelectedCategory(label)}
                  activeOpacity={0.9}
                >
                  <Text style={[styles.catText, active && styles.catTextActive]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

       {/*condição para exibir em tela larga (divide a tela em duas colunas*/}
        {isWide && <View style={styles.divider} />} 

       
        <View style={styles.rightCol}>
          <Text style={styles.question}>Qual Data?</Text>

          <View style={styles.calendarCard}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={
                selectedDate
                  ? { [selectedDate]: { selected: true, selectedColor: COLORS.blue } }
                  : {}
              }
              theme={{
                backgroundColor: COLORS.orange,
                calendarBackground: COLORS.orange,
                textSectionTitleColor: COLORS.white,
                monthTextColor: COLORS.white,
                dayTextColor: COLORS.white,
                todayTextColor: COLORS.white,
                arrowColor: COLORS.white,
              }}
              hideExtraDays={false}
              enableSwipeMonths
            />
          </View>

          <TouchableOpacity style={styles.cta} onPress={handleContinue} activeOpacity={0.9}>
            <Text style={styles.ctaText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    marginBottom: 12,
  },
  contentRow: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 1,
    alignSelf: "stretch",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  catButton: {
    backgroundColor: COLORS.beige,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    margin: 6,
    minWidth: "42%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  catButtonActive: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.blue,
  },
  catText: {
    color: COLORS.orange,
    fontWeight: "700",
    textAlign: "center",
  },
  catTextActive: {
    color: COLORS.white,
  },
  divider: {
    width: 1.5,
    backgroundColor: "#B8C3CF",
    alignSelf: "stretch",
    marginHorizontal: 8,
  },
  question: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "left",
    marginVertical: 10,
  },
  calendarCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.orange,
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cta: {
    backgroundColor: COLORS.blue,
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 18,
    alignSelf: "center",
    minWidth: 220,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
