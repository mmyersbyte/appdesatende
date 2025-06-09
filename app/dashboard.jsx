import { useState } from 'react';
import estilos from './estilos/estilosPerfilEmpresa';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalRespostaReclamacao from './components/ModalRespostaReclamacao';
import { responderReclamacao } from './api/reclamacao';
import { useReclamacoesRecebidas } from './hooks/useReclamacoesRecebidas';
import LogoutButton from './components/LogoutButton';

export default function PerfilEmpresaScreen() {
  // Usa o hook customizado para buscar reclamações recebidas
  const {
    reclamacoes,
    carregando: carregandoReclamacoes,
    refresh,
  } = useReclamacoesRecebidas();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [reclamacaoSelecionada, setReclamacaoSelecionada] = useState(null);
  const [respostaReclamacao, setRespostaReclamacao] = useState('');

  // Estado de loading para envio de resposta
  const [enviandoResposta, setEnviandoResposta] = useState(false);

  // Função para abrir o modal de resposta
  const abrirModalResposta = (reclamacao) => {
    // Verifica se a reclamação já foi respondida
    if (reclamacao.status !== 'aberta') {
      return; // Não abre o modal se já foi respondida
    }

    setReclamacaoSelecionada(reclamacao);
    setRespostaReclamacao('');
    setModalVisivel(true);
  };

  // ✅ MELHORADO: Função para enviar resposta com loading
  const enviarResposta = async () => {
    if (!respostaReclamacao.trim()) {
      alert('Por favor, digite uma resposta para a reclamação.');
      return;
    }

    try {
      setEnviandoResposta(true); // ✅ Inicia loading

      await responderReclamacao(reclamacaoSelecionada._id, respostaReclamacao);
      await refresh(); // Atualiza a lista após responder

      // ✅ Feedback de sucesso
      alert('✅ Resposta enviada com sucesso!');

      setModalVisivel(false);
      setReclamacaoSelecionada(null);
      setRespostaReclamacao('');
    } catch (erro) {
      alert(
        erro?.response?.data?.msg || 'Erro ao enviar resposta. Tente novamente.'
      );
      console.error('Erro ao responder reclamação:', erro);
    } finally {
      setEnviandoResposta(false); // ✅ Finaliza loading
    }
  };

  // Renderiza cada item da lista de reclamações
  const renderReclamacao = ({ item }) => {
    const jaRespondida = item.status !== 'aberta';

    return (
      <Pressable
        style={[
          estilos.reclamacaoItem,
          {
            borderLeftColor: item.status === 'aberta' ? '#ff5555' : '#50fa7b',
            opacity: jaRespondida ? 0.6 : 1,
          },
        ]}
        onPress={() => !jaRespondida && abrirModalResposta(item)}
        disabled={jaRespondida}
        activeOpacity={jaRespondida ? 1 : 0.7}
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
      <View
        style={[
          estilos.cabecalho,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
          },
        ]}
      >
        <View>
          <Text style={estilos.labelPlataforma}>DESATENDE</Text>
          <Text style={estilos.labelPainel}>Painel Administrativo</Text>
        </View>
        <LogoutButton />
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
        enviandoResposta={enviandoResposta} // ✅ Passa estado de loading
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
