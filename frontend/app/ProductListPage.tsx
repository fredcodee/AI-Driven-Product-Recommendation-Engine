import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
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
  rating: string;
  link:  string;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ route }) => {
  const { userId , userName} = route.params;
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRecommendedProducts();
  }, []);

  const fetchRecommendedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(`http://localhost:8088/api/recommendations/${userId}`);
      setRecommendedProducts(response.data.productDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (link: string) => {
    Linking.openURL(link).catch((err) => console.error('An error occurred', err));
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleProductPress(item.link)}>
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productRating}>{item.rating}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  productRating: {
    fontSize: 14,
    color: '#4DA1A9',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListPage;

