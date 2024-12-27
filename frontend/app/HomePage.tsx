import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';
import avatar from '@/assets/images/avatar.avif';

type HomePageProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

interface UserAvatar {
  id: number;
  image: string;
  amazonId: string;
  name: string;
}

const userAvatars: UserAvatar[] = [
  { id: 1, image: avatar, amazonId:"A1Z3YJF1S8Z1M3", name:'Alice'},
  { id: 2, image: avatar, amazonId:"ALDXDYEGKB27G ",name:'James'},
  { id: 3, image: avatar, amazonId:"A15LOGO6NBSI6B ",  name:'John'  },
  { id: 4, image: avatar, amazonId:"A23LX12CA3G4FG ", name:'Emily'},
  { id: 5, image: avatar, amazonId:"A3TV7QFYXAG130 ", name:'Michael'}
];

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Recommendation Engine</Text>
      <View style={styles.avatarContainer}>
        {userAvatars.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={() => navigation.navigate('ProductList', { userId: user.amazonId, userName:user.name })}
            style={styles.avatarWrapper}
          >
            <Text style={styles.userName}>{user.name}</Text>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
  },
});

export default HomePage;

