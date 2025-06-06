//Dashboard empresa

import { useState } from 'react';
import estilos from './estilos/estilosPerfilEmpresa';
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router';
import ModalRespostaReclamacao from './components/ModalRespostaReclamacao';
import {
  buscarReclamacoesRecebidas,
  responderReclamacao,
} from './api/reclamacao';
import { useReclamacoesRecebidas } from './hooks/useReclamacoesRecebidas';

export default function PerfilEmpresaScreen() {
  // Estados para informações da empresa
  const [nomeEmpresa, setNomeEmpresa] = useState('Empresa Exemplo LTDA');
  const [logoEmpresa, setLogoEmpresa] = useState(
    'https://via.placeholder.com/150'
  );
  const [descricaoEmpresa, setDescricaoEmpresa] = useState(
    'Empresa especializada em serviços de atendimento ao cliente.'
  );

  // Estado para controlar o carregamento da imagem do logo
  const [logoCarregado, setLogoCarregado] = useState(false);

  // Usa o hook customizado para buscar reclamações recebidas
  const {
    reclamacoes,
    carregando: carregandoReclamacoes,
    refresh,
  } = useReclamacoesRecebidas();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [reclamacaoSelecionada, setReclamacaoSelecionada] = useState(null);
  const [respostaReclamacao, setRespostaReclamacao] = useState('');

  // Hook para navegação entre telas
  const router = useRouter();

  // Função para abrir o modal de resposta
  const abrirModalResposta = (reclamacao) => {
    setReclamacaoSelecionada(reclamacao);

    /**
     * Define a resposta inicial baseada no status da reclamação
     * Se já foi respondida, carrega a resposta existente
     * Se não, inicia com string vazia
     */
    setRespostaReclamacao(reclamacao.resposta?.texto || '');
    setModalVisivel(true);
  };

  // Função para enviar resposta à reclamação
  const enviarResposta = async () => {
    if (!respostaReclamacao.trim()) {
      alert('Por favor, digite uma resposta para a reclamação.');
      return;
    }
    try {
      await responderReclamacao(reclamacaoSelecionada._id, respostaReclamacao);
      await refresh(); // Atualiza a lista após responder
      setModalVisivel(false);
      setReclamacaoSelecionada(null);
      setRespostaReclamacao('');
    } catch (erro) {
      alert(
        erro?.response?.data?.msg || 'Erro ao enviar resposta. Tente novamente.'
      );
      console.error('Erro ao responder reclamação:', erro);
    }
  };

  // Renderiza cada item da lista de reclamações
  const renderReclamacao = ({ item }) => {
    return (
      <Pressable
        style={[
          estilos.reclamacaoItem,
          {
            borderLeftColor: item.status === 'aberta' ? '#ff5555' : '#50fa7b',
          },
        ]}
        onPress={() => abrirModalResposta(item)}
        activeOpacity={0.7}
      >
        <View style={estilos.reclamacaoHeader}>
          <Text style={estilos.reclamacaoUsuario}>
            {item.user?.nome || 'Nome não informado'}
          </Text>
          <Text style={estilos.reclamacaoData}>
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : 'Data não informada'}
          </Text>
        </View>

        <Text style={estilos.reclamacaoTitulo}>{item.titulo}</Text>
        <Text
          style={estilos.reclamacaoDescricao}
          numberOfLines={2}
        >
          {item.descricao}
        </Text>

        <View style={estilos.reclamacaoFooter}>
          <Text
            style={[
              estilos.reclamacaoStatus,
              { color: item.status === 'aberta' ? '#ff5555' : '#50fa7b' },
            ]}
          >
            {item.status === 'aberta' ? 'Pendente' : 'Respondida'}
          </Text>

          <FontAwesome
            name={item.status === 'aberta' ? 'reply' : 'check-circle'}
            size={16}
            color={item.status === 'aberta' ? '#ff5555' : '#50fa7b'}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={estilos.container}>
      {/* Cabeçalho com nome da plataforma */}
      <View style={estilos.cabecalho}>
        <Text style={estilos.labelPlataforma}>DESATENDE</Text>
        <Text style={estilos.labelPainel}>Painel da Empresa</Text>
      </View>

      {/* Seção de perfil da empresa */}

      {/* Painel administrativo de reclamações */}
      <View style={estilos.painelContainer}>
        <Text style={estilos.painelTitulo}>Reclamações Recebidas</Text>

        {carregandoReclamacoes ? (
          <View style={estilos.carregandoContainer}>
            <ActivityIndicator
              size='large'
              color='#bd93f9'
            />
            <Text style={estilos.carregandoTexto}>
              Carregando reclamações...
            </Text>
          </View>
        ) : reclamacoes.length === 0 ? (
          <View style={estilos.semDadosContainer}>
            <FontAwesome
              name='smile-o'
              size={48}
              color='#50fa7b'
            />
            <Text style={estilos.semDadosTexto}>
              Nenhuma reclamação encontrada!
            </Text>
          </View>
        ) : (
          <FlatList
            data={reclamacoes}
            renderItem={renderReclamacao}
            keyExtractor={(item) => item._id}
            contentContainerStyle={estilos.reclamacoesListContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Modal para responder reclamação */}
      <ModalRespostaReclamacao
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        reclamacao={reclamacaoSelecionada}
        resposta={respostaReclamacao}
        setResposta={setRespostaReclamacao}
        onEnviar={enviarResposta}
      />

      {/* Falso Footer Minimalista */}
      <View style={estilos.falsoFooter}>
        <Text style={estilos.falsoFooterTexto}>
          Painel Administrativo • DESATENDE
        </Text>
      </View>
    </View>
  );
}
