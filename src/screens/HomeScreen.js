import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

const UI = {
   bg: "#DDE6F0",
  orange: "#FC8200",
  blue: "#005A93",
  bege: "#E0E0E0",
  dark: "#000000",
  white: "#FFFFFF",
  chip: "#E8F0FB",
  divider: "#B8C3CF",
};

const CATEGORIES = [
  "Chaveiro",
  "Eletricista",
  "Encanador",
  "Gás & Água",
  "Limpeza pós Obra",
  "Marido de Aluguel",
  "Marceneiro",
  "Pedreiro",
  "Pintor",
  "Vidraceiro",
];

export default function HomeScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { width } = useWindowDimensions();
  const isWide = width >= 900; // duas colunas em telas largas

  function handleContinue() {
    if (!selectedCategory || !selectedDate) {
      Alert.alert("Quase lá!", "Selecione uma categoria e uma data.");
      return;
    }
    navigation.navigate("Results", {
      category: selectedCategory,
      date: selectedDate,
    });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 28 }}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>DelBicos</Text>
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionLeft}>Reformas & Reparos</Text>
        <Text style={styles.sectionRight}>Qual Data?</Text>
      </View>

      <View style={[styles.row, { flexDirection: isWide ? "row" : "column" }]}>
        {/* ESQUERDA: Categorias */}
        <View style={[styles.leftCol, { marginRight: isWide ? 16 : 0 }]}>
          <View style={styles.grid}>
            {CATEGORIES.map((label) => {
              const active = selectedCategory === label;
              return (
                <TouchableOpacity
                  key={label}
                  style={[styles.catBtn, active && styles.catBtnActive]}
                  onPress={() => setSelectedCategory(label)}
                  activeOpacity={0.9}
                >
                  <Text style={[styles.catText, active && styles.catTextActive]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Divisor (apenas em wide) */}
        {isWide && <View style={styles.divider} />}

        {/* DIREITA: Calendário + CTA */}
        <View style={styles.rightCol}>
          <View style={styles.calendarCard}>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={
                selectedDate
                  ? { [selectedDate]: { selected: true, selectedColor: UI.blue } }
                  : {}
              }
              theme={{
                backgroundColor: UI.orange,
                calendarBackground: UI.orange,
                textSectionTitleColor: UI.white,
                monthTextColor: UI.white,
                dayTextColor: UI.white,
                todayTextColor: UI.white,
                arrowColor: UI.white,
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

      <Text style={styles.footer}>© DelBicos · 2025 · Todos os direitos reservados.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI.bg, paddingHorizontal: 18, paddingTop: 10 },
  topBar: { paddingVertical: 8, alignItems: "center" },
  brand: { fontSize: 22, fontWeight: "800", color: UI.blue },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 6,
    marginBottom: 8,
  },
  sectionLeft: { fontSize: 18, fontWeight: "700", color: UI.dark },
  sectionRight: { fontSize: 18, fontWeight: "700", color: UI.dark },
  row: { alignItems: "stretch", justifyContent: "center" },
  leftCol: { flex: 1 },
  rightCol: { flex: 1 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  catBtn: {
    backgroundColor: UI.bege,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    margin: 6,
    minWidth: "42%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  catBtnActive: { borderColor: UI.blue, backgroundColor: "#005A93" },
  catText: { color: UI.orange, fontWeight: "700" },
  catTextActive: { color: UI.dark },
  divider: { width: 1.5, backgroundColor: UI.divider, marginHorizontal: 8 },
  calendarCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: UI.orange,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cta: {
    backgroundColor: UI.blue,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 16,
    alignSelf: "center",
    minWidth: 220,
  },
  ctaText: { color: UI.white, fontSize: 16, fontWeight: "700" },
  footer: {
    textAlign: "center",
    color: "#4C5A6B",
    marginTop: 20,
    marginBottom: 8,
    fontSize: 12,
  },
});
