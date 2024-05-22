import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/react-query';
import {CartScreen, HomeScreen} from './src/screens';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
