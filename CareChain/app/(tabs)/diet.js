import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function DietPlanScreen() {
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

  return (
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
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Customize Diet Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});