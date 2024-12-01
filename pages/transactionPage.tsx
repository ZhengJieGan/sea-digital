import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {format} from 'date-fns';
import {Transaction} from '../types/transactions';
import {generateRandomTransaction} from '../utils/generateRandomTransaction';
import {transactionsList} from '../data/transactions';

function TransactionScreen({navigation}: {navigation: any}) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [transactionsOriList, setTransactionsOriList] =
    useState<Transaction[]>(transactionsList);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      const newTransaction = generateRandomTransaction();
      setTransactionsOriList(prev => [...prev, newTransaction]);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transaction Screen</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {transactionsOriList
          ?.sort((a, b) => {
            return parseInt(b.transactionId) - parseInt(a.transactionId);
          })
          ?.map((transaction: Transaction, index: number) => {
            const formattedDate = format(
              new Date(transaction?.date),
              'yyyy-MM-dd HH:mm:ss',
            );
            const addition = transaction.transactionType === 'addition';

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TransactionDetails', {
                    transactionId: transaction.transactionId,
                    amount: transaction.amount,
                    transactionType: transaction.transactionType,
                    description: transaction.description,
                    type: transaction.type,
                    date: format(
                      new Date(transaction?.date),
                      'yyyy-MM-dd HH:mm:ss',
                    ),
                  })
                }
                key={index}
                style={styles.transactionCard}>
                <View style={styles.transactionHeader}>
                  {addition ? (
                    <Text style={styles.transactionAddAmount}>
                      + RM {transaction?.amount}
                    </Text>
                  ) : (
                    <Text style={styles.transactionDeductAmount}>
                      - RM {transaction?.amount}
                    </Text>
                  )}

                  <Text style={styles.transactionDate}>{formattedDate}</Text>
                </View>

                <View>
                  <Text style={styles.transactionDescription}>
                    {transaction?.description}
                  </Text>
                  <Text style={styles.transactionType}>
                    {transaction?.type}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  transactionAddAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  transactionDeductAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  transactionDate: {
    fontSize: 14,
    color: 'grey',
  },
  transactionDescription: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },
  transactionType: {
    fontSize: 14,
    color: '#888',
  },
});

export default TransactionScreen;
