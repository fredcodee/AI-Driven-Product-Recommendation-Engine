import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import ProductListPage from './ProductListPage';

export type RootStackParamList = {
  Home: undefined;
  ProductList: { userId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="ProductList" 
          component={ProductListPage} 
          options={{ title: 'Recommended Products' }} 
        />
      </Stack.Navigator>
  );
};

export default App;

