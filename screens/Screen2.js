import React, { useState } from "react";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import { View, FlatList, StyleSheet } from "react-native";
import {
  Text,
  Button,
  Card,
  Avatar,
  Chip,
  Searchbar,
  IconButton,
} from "react-native-paper";

// Mock data for categories and products
const categories = [
  { id: 1, name: "Smartphone", image: require("../assets/Data/smart.png") },
  { id: 2, name: "Ipad", image: require("../assets/Data/ipad.png") },
  { id: 3, name: "MacBook", image: require("../assets/Data/macbook.png") },
];

const products = {
  Smartphone: {
    bestSales: [
      { id: 1, name: "Smartphone A", price: "$899", rating: 4 },
      { id: 2, name: "Smartphone B", price: "$899", rating: 4 },
      { id: 3, name: "Smartphone C", price: "$789", rating: 3 },
      { id: 4, name: "Smartphone D", price: "$999", rating: 5 },
      { id: 5, name: "Smartphone E", price: "$599", rating: 4 },
    ],
    bestMatched: [
      { id: 6, name: "Smartphone F", price: "$799", rating: 4 },
      { id: 7, name: "Smartphone G", price: "$699", rating: 5 },
    ],
    popular: [
      { id: 8, name: "Smartphone H", price: "$799", rating: 4 },
      { id: 9, name: "Smartphone I", price: "$999", rating: 5 },
    ],
  },
  Ipad: {
    bestSales: [
      { id: 10, name: "Ipad A", price: "$1099", rating: 5 },
      { id: 11, name: "Ipad B", price: "$999", rating: 4 },
    ],
    bestMatched: [{ id: 12, name: "Ipad C", price: "$899", rating: 3 }],
    popular: [{ id: 13, name: "Ipad D", price: "$1199", rating: 5 }],
  },
  MacBook: {
    bestSales: [
      { id: 14, name: "MacBook A", price: "$1299", rating: 4 },
      { id: 15, name: "MacBook B", price: "$1399", rating: 5 },
    ],
    bestMatched: [{ id: 16, name: "MacBook C", price: "$1499", rating: 4 }],
    popular: [{ id: 17, name: "MacBook D", price: "$1599", rating: 5 }],
  },
};

const ElectronicsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Smartphone"); // Default category
  const [selectedTab, setSelectedTab] = useState("bestSales"); // Default tab
  const [showAll, setShowAll] = useState(false); // Show all products or only 4
  const [searchQuery, setSearchQuery] = useState("");

  const categoryProducts = products[selectedCategory][selectedTab];
  const displayedProducts = showAll
    ? categoryProducts
    : categoryProducts.slice(0, 4);

  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <View
        style={{ marginBottom: 16, flexDirection: "row", alignItems: "center" }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <IconButton
          icon="filter"
          mode="contained"
          onPress={() => console.log("Filter pressed")}
        />
      </View>
      {/* Category Chips */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          //   <Chip
          //     key={category.id}
          //     selected={category.name === selectedCategory}
          //     onPress={() => {
          //       setSelectedCategory(category.name);
          //       setSelectedTab("bestSales");
          //       setShowAll(false);
          //       console.log(`Category changed to: ${category.name}`);
          //     }}
          //     style={styles.chip}
          //   >
          //     {category.name}
          //   </Chip>
          <TouchableOpacity
            key={category.id}
            onPress={() => {
              setSelectedCategory(category.name);
              setSelectedTab("bestSales");
              setShowAll(false);
              console.log(`Category changed to: ${category.name}`);
            }}
            style={{
              borderWidth: 1,
              borderColor: category.name === selectedCategory ? "blue" : "gray",
            }}
          >
            <Image source={category.image} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs for Best Sales, Best Matched, Popular */}
      <View style={styles.tabsContainer}>
        {["bestSales", "bestMatched", "popular"].map((tab) => (
          <Button
            key={tab}
            mode={tab === selectedTab ? "contained" : "text"}
            onPress={() => {
              setSelectedTab(tab);
              setShowAll(false);
              console.log(`Tab changed to: ${tab}`);
            }}
            style={styles.tabButton}
          >
            {tab.charAt(0).toUpperCase() +
              tab.slice(1).replace(/([A-Z])/g, " $1")}
          </Button>
        ))}
      </View>

      {/* Product List */}
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            {/* <Card.Title
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              title={item.name}
              subtitle={item.price}
              left={(props) => <Avatar.Icon {...props} icon="cellphone" />}
            /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <Avatar.Icon icon="cellphone" size={30} />
              <View style={{}}>
                <Text>{item.name}</Text>
                <Text>{item.price}</Text>
              </View>
            </View>
            <Card.Content>
              <Text>Rating: {item.rating} stars</Text>
            </Card.Content>
          </Card>
        )}
      />

      {/* See All Button */}
      {categoryProducts.length > 4 && !showAll && (
        <Button
          mode="text"
          onPress={() => {
            setShowAll(true);
            console.log("Show all products");
          }}
          style={styles.seeAllButton}
        >
          See all
        </Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  chip: {
    marginHorizontal: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tabButton: {
    marginHorizontal: 4,
  },
  card: {
    marginBottom: 16,
  },
  seeAllButton: {
    alignSelf: "center",
    marginTop: 16,
  },
});

export default ElectronicsScreen;
