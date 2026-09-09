import { PaperProvider } from 'react-native-paper';
import Appbar from './diversos/appbar'; 

export default function App() {
  return (
    <PaperProvider>
     <Appbar/>
    </PaperProvider>
  );
}