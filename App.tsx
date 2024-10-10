import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { Ionicons } from 'react-native-vector-icons';

import { store } from './src/redux/store';
import LandingPage from './src/screens/LandingPage';
import DuesPage from './src/screens/DuesPage';
import StockUpdatePage from './src/screens/StockUpdatePage';
import TotalCalculationPage from './src/screens/TotalCalculationPage';
import DailyBuysSellsPage from './src/screens/DailyBuysSells';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = 'home-outline';
                  break;
                case 'Daily Buys & Sells':
                  iconName = 'cart-outline';
                  break;
                case 'Dues':
                  iconName = 'wallet-outline';
                  break;
                case 'Stock Update':
                  iconName = 'stats-chart-outline';
                  break;
                case 'Total Calculation':
                  iconName = 'calculator-outline';
                  break;
                default:
                  iconName = 'help-circle-outline';
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={LandingPage} />
          <Tab.Screen name="DailyBuysSells" component={DailyBuysSellsPage} />
          <Tab.Screen name="Dues" component={DuesPage} />
          <Tab.Screen name="StockUpdate" component={StockUpdatePage} />
          <Tab.Screen name="TotalCalculation" component={TotalCalculationPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;