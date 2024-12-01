import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function TransactionDetailsScreen({route}: {route: any}) {
  const {transactionId, amount, transactionType, description, type, date} =
    route.params;

  const addition = transactionType === 'addition';

  const handleReport = () => {
    Alert.alert('Report', 'This transaction has been reported.');
  };

  const handleShare = () => {
    Alert.alert('Share', 'This transaction has been shared.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailsContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text
            style={[
              styles.amount,
              addition ? styles.creditAmount : styles.debitAmount,
            ]}>
            {addition ? '+ ' : '- '}RM {amount}
          </Text>
        </View>

        {/* Details Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text style={styles.value}>{transactionId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{type}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{description}</Text>
          </View>
        </View>
      </View>

      {/* Button Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 16,
  },
  creditAmount: {
    color: 'green',
  },
  debitAmount: {
    color: 'red',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    paddingHorizontal: 16,
  },
  reportButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  shareButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransactionDetailsScreen;
