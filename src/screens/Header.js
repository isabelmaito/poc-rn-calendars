import React, { useState } from "react";
import {View,Text,Image,TouchableOpacity,StyleSheet,useWindowDimensions,TextInput,} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  if (!isWeb) {
    return (
      <View style={styles.mobileHeader}>
        <Image
          source={require("../../assets/delbicos.png")}
          style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
      </View>
    );
  }

  return (
    <View>
      {/* Topo com Logo, Menu, Localização, Usuário */}
      <View style={styles.webHeader}>
        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../../assets/delbicos.png")}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Menu */}
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.menuItem}>Página Inicial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Categorias")}>
            <Text style={styles.menuItem}>Categorias</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Ajuda")}>
            <Text style={styles.menuItem}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Parceiro")}>
            <Text style={styles.menuItem}>Portal do parceiro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Agendamentos")}>
            <Text style={styles.menuItem}>Meus Agendamentos</Text>
          </TouchableOpacity>
        </View>

        {/* Localização + Usuário */}
        <View style={styles.rightSection}>
          <Text style={{ fontSize: 13, color: "gray" }}>Estou em:</Text>
          <TouchableOpacity style={styles.locationBox}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Sorocaba, São Paulo
            </Text>
          </TouchableOpacity>
          <View style={styles.userCircle}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>DW</Text>
          </View>
        </View>
      </View>

      {/* Barra Azul de busca */}
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Olá! Como podemos te ajudar hoje?</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="buscar"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={{ color: "gray" }}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mobileHeader: {
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  webHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: "contain",
  },
  menu: {
    flexDirection: "row",
    gap: 30, 
    position: "absolute", 
    left: "50%", 
    transform: [{ translateX: -200 }],
  },
  menuItem: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  locationBox: {
    backgroundColor: "orange",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  userCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },

  
  searchBar: {
    backgroundColor: "#1E3A8A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 20, 
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    width: 350,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  searchButton: {
    backgroundColor: "#fff", 
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});