import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';

import Rodape from './components/Rodape';
import { useMinhasReclamacoes } from './hooks/useMinhasReclamacoes';
import ReclamacaoItem from './components/ReclamacaoItem';

export default function PerfilScreen() {
  const router = useRouter();
  const { reclamacoes, carregando } = useMinhasReclamacoes();

  return (
    <View style={{ flex: 1, backgroundColor: '#1A1A1D' }}>
      {carregando ? (
        <ActivityIndicator
          size='large'
          color='#D84040'
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={reclamacoes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ReclamacaoItem item={item} />}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#bbb' }}>
              Nenhuma reclamação encontrada.
            </Text>
          }
        />
      )}
      <Rodape
        selecionado='perfil'
        navegar={(destino) => {
          if (destino === 'home') router.push('/home');
          if (destino === 'perfil') router.push('/perfil');
        }}
      />
    </View>
  );
}
