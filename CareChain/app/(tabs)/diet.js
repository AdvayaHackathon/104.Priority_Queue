import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DietPlanScreen() {
  // State for API response and loading status
  const [modalVisible, setModalVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data - in a real app, this would come from an API or database
  const mealPlan = [
    {
      id: '1',
      title: 'Breakfast',
      time: '7:30 AM',
      foods: [
        { name: 'Oatmeal with berries', calories: 320, protein: '10g' },
        { name: 'Greek yogurt', calories: 150, protein: '15g' },
        { name: 'Green tea', calories: 0, protein: '0g' }
      ]
    },
    {
      id: '2',
      title: 'Lunch',
      time: '12:30 PM',
      foods: [
        { name: 'Grilled chicken salad', calories: 450, protein: '35g' },
        { name: 'Whole grain bread', calories: 120, protein: '4g' },
        { name: 'Apple', calories: 95, protein: '0g' }
      ]
    },
    {
      id: '3',
      title: 'Dinner',
      time: '7:00 PM',
      foods: [
        { name: 'Salmon fillet', calories: 350, protein: '40g' },
        { name: 'Steamed vegetables', calories: 120, protein: '5g' },
        { name: 'Brown rice', calories: 220, protein: '5g' }
      ]
    },
    {
      id: '4',
      title: 'Snacks',
      time: 'Throughout day',
      foods: [
        { name: 'Almonds (1oz)', calories: 160, protein: '6g' },
        { name: 'Banana', calories: 105, protein: '1g' },
        { name: 'Protein shake', calories: 150, protein: '25g' }
      ]
    }
  ];

  // Function to call the API when the button is pressed
  const customizeDietPlan = async () => {
    console.log('Button pressed!');
    setIsLoading(true);
    
    // Set a timeout to prevent infinite loading
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), 10000)
    );
    
    try {
      console.log('Fetching from API...');
      
      // Try different IP addresses - localhost for emulators, your local IP for physical devices
      let apiUrl = 'https://flat-pianos-pump.loca.lt/api/hello';
      console.log('Trying URL:', apiUrl);
      
      // Race between the fetch and the timeout
      const response = await Promise.race([
        fetch(apiUrl),
        timeoutPromise
      ]);
      
      console.log('Response received:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data received:', data);
      setApiResponse(data.message);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching from API:', error);
      
      // Show the message anyway even if API fails (for demo purposes)
      setApiResponse('Hello from CareChain! (Demo Mode)');
      setModalVisible(true);
      
      Alert.alert(
        'Connection Issue',
        'Could not connect to the server. Showing demo content instead.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Diet Plan</Text>
        <Text style={styles.subheader}>Daily Nutrition Plan</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2240</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>146g</Text>
            <Text style={styles.statLabel}>Protein</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>58g</Text>
            <Text style={styles.statLabel}>Fat</Text>
          </View>
        </View>
        
        <ScrollView style={styles.mealList}>
          {mealPlan.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealTitle}>{meal.title}</Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
              </View>
              
              {meal.foods.map((food, index) => (
                <View key={index} style={styles.foodItem}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodInfo}>{food.calories} cal | {food.protein} protein</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={customizeDietPlan}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Customize Diet Plan</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal popup to show API response */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Message from Server</Text>
            <Text style={styles.modalText}>{apiResponse}</Text>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a6da7',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  mealList: {
    flex: 1,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mealTime: {
    fontSize: 14,
    color: '#666',
  },
  foodItem: {
    marginVertical: 8,
  },
  foodName: {
    fontSize: 16,
    color: '#333',
  },
  foodInfo: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4a6da7',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
  },
  closeButton: {
    backgroundColor: '#4a6da7',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});