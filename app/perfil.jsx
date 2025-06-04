import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Rodape from './components/Rodape';
import { useMinhasReclamacoes } from './hooks/useMinhasReclamacoes';
import ReclamacaoItem from './components/ReclamacaoItem';
import HeaderTitulo from './components/HeaderTitulo';

export default function PerfilScreen() {
  const router = useRouter();
  const { reclamacoes, carregando } = useMinhasReclamacoes();

  return (
    <View style={{ flex: 1, backgroundColor: '#1A1A1D' }}>
      <HeaderTitulo titulo='Minhas Reclamações' />
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
          contentContainerStyle={{
            paddingBottom: 90, // espaço para o rodapé
            paddingTop: 10,
            paddingHorizontal: 8,
          }}
          showsVerticalScrollIndicator={false}
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
