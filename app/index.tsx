import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';

export default function Index() {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button title='Teste' onPress={() => console.log('teste')} />
      </View>
    </SafeAreaProvider>
  );
}
