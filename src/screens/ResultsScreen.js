import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";

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

const MOCK = {
  Eletricista: [
    {
      id: "el-1",
      name: "Jefferson Santos",
      service: "Serviços de Eletricista",
      price: 250,
      rating: 4.8,
      reviews: 42,
      image: "https://picsum.photos/seed/el1/240/240",
      availableHours: ["09:30", "11:00", "13:30", "15:30", "16:00"],
      location: "Jardim Paraíso, Votorantim",
      distance: "6 km",
    },
    {
      id: "el-2",
      name: "Carla Ribeiro",
      service: "Serviços de Eletricista",
      price: 220,
      rating: 4.7,
      reviews: 31,
      image: "https://picsum.photos/seed/el2/240/240",
      availableHours: ["09:00", "13:00", "14:00", "15:30"],
      location: "Sorocaba, São Paulo",
      distance: "8 km",
    },
    {
      id: "el-3",
      name: "Bruno Andrade",
      service: "Serviços de Eletricista",
      price: 200,
      rating: 4.6,
      reviews: 21,
      image: "https://picsum.photos/seed/el3/240/240",
      availableHours: ["08:30", "10:30", "13:30", "17:00"],
      location: "Centro, Sorocaba",
      distance: "5 km",
    },
    {
      id: "el-4",
      name: "Maria Lopes",
      service: "Serviços de Eletricista",
      price: 230,
      rating: 4.9,
      reviews: 55,
      image: "https://picsum.photos/seed/el4/240/240",
      availableHours: ["09:30", "12:00", "16:00"],
      location: "Vila Olímpia, Sorocaba",
      distance: "7 km",
    },
  ],
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

const ConfirmationModal = ({ visible, onClose, onConfirm, info }) => {
  if (!visible) return null;

  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.container}>
        <Text style={modalStyles.title}>Confirmação</Text>
        <Text style={modalStyles.message}>
          Foi marcado o {info.category} ({info.professionalName}) para o dia {formatDate(info.date)} às {info.hour}. Agradecemos pela preferência, DelBicos.
        </Text>
        <View style={modalStyles.buttonRow}>
          <TouchableOpacity style={modalStyles.buttonCancel} onPress={onClose}>
            <Text style={modalStyles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.buttonConfirm} onPress={onConfirm}>
            <Text style={modalStyles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function ResultsScreen({ route }) {
  const { category, date } = route.params;
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const columns = isWide ? 2 : 1;

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const professionals = MOCK[category] ?? [];

  function handleConfirm(prof, hour) {
    setModalInfo({
      category: category,
      professionalName: prof.name,
      date: date,
      hour: hour,
    });
    setShowModal(true);
  }

  function handleFinalConfirmation() {
    // Aqui você adiciona a lógica para finalizar o agendamento
    // Por exemplo, enviar os dados para um servidor
    setShowModal(false);
    alert("Seu agendamento foi confirmado!");
  }

  const Card = ({ item }) => (
    <View style={styles.card}>
      {/* CONTEÚDO ESQUERDA */}
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.rating}>
          ★★★★★ <Text style={{ color: UI.dark, fontWeight: "400" }}>{item.rating} · {item.reviews} avaliações</Text>
        </Text>

        <Text style={styles.hoursLabel}>Horários disponíveis:</Text>
        <View style={styles.hoursRow}>
          {item.availableHours.map((h) => (
            <TouchableOpacity key={h} style={styles.hourBtn} onPress={() => handleConfirm(item, h)}>
              <Text style={styles.hourText}>{h}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.hourBtn, { paddingHorizontal: 10 }]}>
            <Text style={[styles.hourText, { fontWeight: "700" }]}>Ver +</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.distance} de distância</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{item.location}</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Text style={styles.profileBtnText}>Ver Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* IMAGEM DIREITA */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* TAG PREÇO */}
      <View style={styles.priceTag}>
        <Text style={styles.priceSmall}>A partir de</Text>
        <Text style={styles.priceValue}>R${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.brand}>DelBicos</Text>
      </View>

      <Text style={styles.headerLine}>
        {professionals.length} Resultados Encontrados
      </Text>

      <FlatList
        data={professionals}
        key={columns}
        numColumns={columns}
        renderItem={({ item }) => (
          <View style={{ flex: 1, padding: 6 }}>
            <Card item={item} />
          </View>
        )}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      <Text style={styles.footer}>© DelBicos · 2025 · Todos os direitos reservados.</Text>

      <ConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleFinalConfirmation}
        info={modalInfo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI.bg, paddingHorizontal: 10, paddingTop: 10 },
  topBar: { paddingVertical: 8, alignItems: "center" },
  brand: { fontSize: 22, fontWeight: "800", color: UI.blue },
  headerLine: { fontSize: 18, fontWeight: "700", color: UI.dark, marginVertical: 8, paddingHorizontal: 2 },
  card: {
    backgroundColor: UI.white,
    borderRadius: 12,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    position: "relative",
    minHeight: 130,
  },
  image: { width: 130, height: "100%", resizeMode: "cover" },
  name: { fontSize: 18, fontWeight: "800", color: UI.orange },
  service: { fontSize: 13, color: "#444", marginTop: 2, marginBottom: 6 },
  rating: { fontSize: 12, color: UI.dark, marginBottom: 8 },
  hoursLabel: { fontSize: 12, color: UI.dark, marginBottom: 6 },
  hoursRow: { flexDirection: "row", flexWrap: "wrap" },
  hourBtn: {
    backgroundColor: UI.bege,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  hourText: { color: UI.blue, fontWeight: "600" },
  footerRow: { flexDirection: "row", alignItems: "center", marginTop: 8, flexWrap: "wrap" },
  chip: { backgroundColor: UI.chip, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 10, marginRight: 6, marginBottom: 6 },
  chipText: { color: UI.dark, fontSize: 12 },
  profileBtn: {
    marginLeft: "auto",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: UI.orange,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  profileBtnText: { color: UI.orange, fontWeight: "700", fontSize: 12 },
  priceTag: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: UI.orange,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  priceSmall: { color: UI.white, fontSize: 10 },
  priceValue: { color: UI.white, fontWeight: "800", fontSize: 14 },
  footer: {
    textAlign: "center",
    color: "#4C5A6B",
    marginTop: 6,
    marginBottom: 8,
    fontSize: 12,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: UI.white,
    padding: 20,
    borderRadius: 12,
    maxWidth: 400,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: UI.blue,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonConfirm: {
    backgroundColor: UI.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonCancel: {
    backgroundColor: UI.bege,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: UI.white,
    fontWeight: '700',
  },
});