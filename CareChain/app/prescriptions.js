import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrescriptionsScreen() {
  const router = useRouter();
  
  // Mock prescription data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      instructions: 'Take once daily with water',
      date: 'April 5, 2025',
      doctor: 'Dr. Emily Chen',
      refills: 2,
      reminderEnabled: true,
    },
    {
      id: '2',
      name: 'Atorvastatin',
      dosage: '20mg',
      instructions: 'Take once daily in the evening',
      date: 'March 22, 2025',
      doctor: 'Dr. Emily Chen',
      refills: 5,
      reminderEnabled: true,
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '500mg',
      instructions: 'Take twice daily with meals',
      date: 'March 10, 2025',
      doctor: 'Dr. James Wilson',
      refills: 3,
      reminderEnabled: false,
    },
    {
      id: '4',
      name: 'Levothyroxine',
      dosage: '75mcg',
      instructions: 'Take once daily on empty stomach',
      date: 'February 15, 2025',
      doctor: 'Dr. Maria Lopez',
      refills: 6,
      reminderEnabled: true,
    },
  ]);

  const toggleReminder = (id) => {
    setPrescriptions(prescriptions.map(prescription => 
      prescription.id === id 
        ? {...prescription, reminderEnabled: !prescription.reminderEnabled} 
        : prescription
    ));
  };

  const renderPrescriptionItem = ({ item }) => (
    <View style={styles.prescriptionCard}>
      <View style={styles.cardHeader}>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{item.name} {item.dosage}</Text>
          <Text style={styles.medicationDetails}>{item.instructions}</Text>
        </View>
        <View style={styles.pillIconContainer}>
          <Ionicons name="medical" size={24} color="#4a6da7" />
        </View>
      </View>

      <View style={styles.prescriptionDetails}>
        <Text style={styles.detailLabel}>Prescribed:</Text>
        <Text style={styles.detailValue}>{item.date}</Text>
      </View>
      
      <View style={styles.prescriptionDetails}>
        <Text style={styles.detailLabel}>Doctor:</Text>
        <Text style={styles.detailValue}>{item.doctor}</Text>
      </View>
      
      <View style={styles.prescriptionDetails}>
        <Text style={styles.detailLabel}>Refills:</Text>
        <Text style={styles.detailValue}>{item.refills} remaining</Text>
      </View>
      
      <View style={styles.cardActions}>
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>Pill Reminder</Text>
          <Switch
            value={item.reminderEnabled}
            onValueChange={() => toggleReminder(item.id)}
            trackColor={{ false: "#d1d1d1", true: "#a7c1e6" }}
            thumbColor={item.reminderEnabled ? "#4a6da7" : "#f4f3f4"}
          />
        </View>
        
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>View Details</Text>
          <Ionicons name="document-text-outline" size={16} color="#4a6da7" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Prescriptions</Text>
        <View style={styles.placeholder} />
      </View>
      
      <FlatList
        data={prescriptions}
        renderItem={renderPrescriptionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.prescriptionsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  prescriptionsList: {
    padding: 20,
  },
  prescriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
  },
  pillIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  prescriptionDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderText: {
    fontSize: 14,
    color: '#555',
    marginRight: 10,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4fa',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  downloadText: {
    fontSize: 14,
    color: '#4a6da7',
    fontWeight: 'bold',
    marginRight: 5,
  },
});