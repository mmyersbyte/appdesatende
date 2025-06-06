import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Rodape from './components/Rodape';
import { useMinhasReclamacoes } from './hooks/useMinhasReclamacoes';
import ReclamacaoItem from './components/ReclamacaoItem';
import HeaderTitulo from './components/HeaderTitulo';

// 🎨 PALETA DRACULA
const CORES = {
  fundoPrincipal: '#282a36', // Dracula background
  corPrimaria: '#8be9fd', // Dracula cyan
  textoSuave: '#6272a4', // Dracula comment
};

export default function PerfilScreen() {
  const router = useRouter();

  /**
   * 🔄 HOOK: Gerenciamento de reclamações
   * Inclui função de refresh para atualizar lista após avaliações
   */
  const { reclamacoes, carregando, refresh } = useMinhasReclamacoes();

  return (
    <View style={{ flex: 1, backgroundColor: CORES.fundoPrincipal }}>
      <HeaderTitulo titulo='Minhas Reclamações' />
      {carregando ? (
        <ActivityIndicator
          size='large'
          color={CORES.corPrimaria}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={reclamacoes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ReclamacaoItem
              item={item}
              onAtualizarReclamacoes={refresh} // 🌟 Callback para atualizar lista
            />
          )}
          contentContainerStyle={{
            paddingBottom: 90, // espaço para o rodapé
            paddingTop: 10,
            paddingHorizontal: 8,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: 'center',
                marginTop: 20,
                color: CORES.textoSuave,
              }}
            >
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
