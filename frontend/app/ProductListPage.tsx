import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';
import axios from 'axios';

type ProductListPageProps = {
  route: RouteProp<RootStackParamList, 'ProductList'>;
};

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const dummyProducts: Product[] = [
  { id: '1', name: 'Product 1', description: 'Description for Product 1', image: 'https://via.placeholder.com/100', price: 19.99 },
  { id: '2', name: 'Product 2', description: 'Description for Product 2', image: 'https://via.placeholder.com/100', price: 29.99 },
  { id: '3', name: 'Product 3', description: 'Description for Product 3', image: 'https://via.placeholder.com/100', price: 39.99 },
  { id: '4', name: 'Product 4', description: 'Description for Product 4', image: 'https://via.placeholder.com/100', price: 49.99 },
  { id: '5', name: 'Product 5', description: 'Description for Product 5', image: 'https://via.placeholder.com/100', price: 59.99 },
];

const ProductListPage: React.FC<ProductListPageProps> = ({ route }) => {
  const { userId , userName} = route.params;
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   fetchRecommendedProducts();
  // }, []);

  useEffect(() => {
    // Simulating API call with dummy data
    setTimeout(() => {
      setRecommendedProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);


  const fetchRecommendedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(`http://localhost:8088/api/recommendations/${userId}`);
      setRecommendedProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recommended Products for {userName}</Text>
      <FlatList
        data={recommendedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductListPage;

