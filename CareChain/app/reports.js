import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReportsScreen() {
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Reports</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {/* Risk Assessment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Assessment</Text>
          <View style={styles.reportCard}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskTitle}>Overall Health Risk</Text>
              <View style={[styles.riskBadge, styles.lowRiskBadge]}>
                <Text style={styles.riskBadgeText}>LOW RISK</Text>
              </View>
            </View>
            
            <Text style={styles.riskDescription}>
              Based on your health data, vitals, and medical history, you have a low risk of developing serious health conditions in the near future.
            </Text>
            
            <View style={styles.riskFactorsContainer}>
              <Text style={styles.riskFactorsTitle}>Key Health Factors:</Text>
              
              <View style={styles.riskFactor}>
                <View style={styles.riskFactorIconContainer}>
                  <Ionicons name="heart-outline" size={20} color="#4a6da7" />
                </View>
                <View style={styles.riskFactorContent}>
                  <Text style={styles.riskFactorName}>Blood Pressure</Text>
                  <Text style={styles.riskFactorValue}>120/80 mmHg (Normal)</Text>
                </View>
              </View>
              
              <View style={styles.riskFactor}>
                <View style={styles.riskFactorIconContainer}>
                  <Ionicons name="water-outline" size={20} color="#4a6da7" />
                </View>
                <View style={styles.riskFactorContent}>
                  <Text style={styles.riskFactorName}>Cholesterol</Text>
                  <Text style={styles.riskFactorValue}>Total: 180 mg/dL (Normal)</Text>
                </View>
              </View>
              
              <View style={styles.riskFactor}>
                <View style={styles.riskFactorIconContainer}>
                  <Ionicons name="fitness-outline" size={20} color="#4a6da7" />
                </View>
                <View style={styles.riskFactorContent}>
                  <Text style={styles.riskFactorName}>Physical Activity</Text>
                  <Text style={styles.riskFactorValue}>Regular (30+ min, 5 days/week)</Text>
                </View>
              </View>
              
              <View style={styles.riskFactor}>
                <View style={styles.riskFactorIconContainer}>
                  <Ionicons name="restaurant-outline" size={20} color="#4a6da7" />
                </View>
                <View style={styles.riskFactorContent}>
                  <Text style={styles.riskFactorName}>Diet</Text>
                  <Text style={styles.riskFactorValue}>Balanced, low in saturated fat</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity style={styles.viewFullReportButton}>
              <Text style={styles.viewFullReportText}>View Full Report</Text>
              <Ionicons name="document-text-outline" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Readmission Risk Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hospital Readmission Risk</Text>
          <View style={styles.reportCard}>
            <View style={styles.riskHeader}>
              <Text style={styles.riskTitle}>Readmission Probability</Text>
              <View style={[styles.riskBadge, styles.lowRiskBadge]}>
                <Text style={styles.riskBadgeText}>LOW RISK</Text>
              </View>
            </View>
            
            <Text style={styles.riskDescription}>
              Your risk of hospital readmission in the next 30 days is low based on your current health status and care plan adherence.
            </Text>
            
            <View style={styles.readmissionFactors}>
              <Text style={styles.readmissionFactorsTitle}>Contributing Factors:</Text>
              
              <View style={styles.factorItem}>
                <Ionicons name="checkmark-circle" size={16} color="#2a9d2a" />
                <Text style={styles.factorText}>Medication adherence (95%)</Text>
              </View>
              
              <View style={styles.factorItem}>
                <Ionicons name="checkmark-circle" size={16} color="#2a9d2a" />
                <Text style={styles.factorText}>Regular follow-up appointments</Text>
              </View>
              
              <View style={styles.factorItem}>
                <Ionicons name="checkmark-circle" size={16} color="#2a9d2a" />
                <Text style={styles.factorText}>Well-controlled chronic conditions</Text>
              </View>
              
              <View style={styles.factorItem}>
                <Ionicons name="checkmark-circle" size={16} color="#2a9d2a" />
                <Text style={styles.factorText}>Healthy lifestyle habits</Text>
              </View>
            </View>
            
            <Text style={styles.preventiveTitle}>Preventive Suggestions:</Text>
            <View style={styles.preventiveItem}>
              <Ionicons name="information-circle-outline" size={20} color="#4a6da7" />
              <Text style={styles.preventiveText}>Continue taking medications as prescribed</Text>
            </View>
            <View style={styles.preventiveItem}>
              <Ionicons name="information-circle-outline" size={20} color="#4a6da7" />
              <Text style={styles.preventiveText}>Maintain your healthy diet and exercise routine</Text>
            </View>
            <View style={styles.preventiveItem}>
              <Ionicons name="information-circle-outline" size={20} color="#4a6da7" />
              <Text style={styles.preventiveText}>Report any new symptoms promptly to your doctor</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  riskBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  lowRiskBadge: {
    backgroundColor: '#e7f7e7',
  },
  mediumRiskBadge: {
    backgroundColor: '#fff4e4',
  },
  highRiskBadge: {
    backgroundColor: '#ffe4e4',
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2a9d2a',
  },
  riskDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 20,
  },
  riskFactorsContainer: {
    marginBottom: 20,
  },
  riskFactorsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  riskFactor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskFactorIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f4fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  riskFactorContent: {
    flex: 1,
  },
  riskFactorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 2,
  },
  riskFactorValue: {
    fontSize: 13,
    color: '#666',
  },
  viewFullReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a6da7',
    paddingVertical: 12,
    borderRadius: 10,
  },
  viewFullReportText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  readmissionFactors: {
    marginBottom: 20,
  },
  readmissionFactorsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  factorText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  preventiveTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  preventiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  preventiveText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    flex: 1,
  },
});