//Dashboard empresa

import { useState, useEffect } from 'react';
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

  // Estados para o painel administrativo de reclamações
  const [reclamacoes, setReclamacoes] = useState([]);
  const [carregandoReclamacoes, setCarregandoReclamacoes] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [reclamacaoSelecionada, setReclamacaoSelecionada] = useState(null);
  const [respostaReclamacao, setRespostaReclamacao] = useState('');

  // Hook para navegação entre telas
  const router = useRouter();

  // Efeito para carregar as reclamações (simulando busca no banco de dados)
  useEffect(() => {
    // Funç para buscar reclamações do banco de dados
    const buscarReclamacoes = async () => {
      try {
        // Simulação de delay de rede
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Dados de exemplo - em produção, isso viria do banco de dados
        const reclamacoesExemplo = [
          {
            id: '1',
            usuario: 'João Silva',
            titulo: 'Atendimento demorado',
            descricao: 'Esperei mais de 40 minutos blablablablabla.',
            data: '15/03/2025',
            status: 'pendente',
            resposta: '',
          },
          {
            id: '2',
            usuario: 'Maria Oliveira',
            titulo: 'lorem lorem lorem',
            descricao: 'lorem lorem lorem',
            data: '22/02/2023',
            status: 'respondido',
            resposta: 'Oi maria estou respondendo ok.',
          },
          {
            id: '3',
            usuario: 'Carlos Mendes',
            titulo: 'Cobrança indevida',
            descricao: 'lorem lorem lorem',

            data: '05/03/2023',
            status: 'pendente',
            resposta: '',
          },
          {
            id: '4',
            usuario: 'Ana beatriz',
            titulo: 'Cancelamento não processado',
            descricao: 'lorem lorem lorem',

            data: '10/03/2023',
            status: 'pendente',
            resposta: '',
          },
          {
            id: '5',
            usuario: 'Roberto Alves',
            titulo: 'Propaganda enganosa',
            descricao: 'lorem lorem lorem',

            data: '01/03/2020',
            status: 'respondido',
            resposta: 'Oi maria estou respondendo ok.',
          },
        ];

        setReclamacoes(reclamacoesExemplo);
        setCarregandoReclamacoes(false);
      } catch (erro) {
        console.error('Erro ao buscar reclamações:', erro);
        setCarregandoReclamacoes(false);
      }
    };

    buscarReclamacoes();
  }, []);

  // Função para abrir o modal de resposta
  const abrirModalResposta = (reclamacao) => {
    setReclamacaoSelecionada(reclamacao);
    setRespostaReclamacao(reclamacao.resposta);
    setModalVisivel(true);
  };

  // Função para enviar resposta à reclamação
  const enviarResposta = () => {
    if (!respostaReclamacao.trim()) {
      alert('Por favor, digite uma resposta para a reclamação.');
      return;
    }

    // Atualiza a reclamação localmente
    const reclamacoesAtualizadas = reclamacoes.map((item) => {
      if (item.id === reclamacaoSelecionada.id) {
        return {
          ...item,
          resposta: respostaReclamacao,
          status: 'respondido',
        };
      }
      return item;
    });

    setReclamacoes(reclamacoesAtualizadas);

    // Em produção, aqui seria feita a chamada à API para atualizar no banco de dados
    // exemplo: await api.post('/reclamacoes/responder', { id: reclamacaoSelecionada.id, resposta: respostaReclamacao });

    setModalVisivel(false);
    setReclamacaoSelecionada(null);
    setRespostaReclamacao('');
  };

  // Renderiza cada item da lista de reclamações
  const renderReclamacao = ({ item }) => {
    return (
      <Pressable
        style={[
          estilos.reclamacaoItem,
          {
            borderLeftColor: item.status === 'pendente' ? '#ff6b6b' : '#4ecdc4',
          },
        ]}
        onPress={() => abrirModalResposta(item)}
        activeOpacity={0.7}
      >
        <View style={estilos.reclamacaoHeader}>
          <Text style={estilos.reclamacaoUsuario}>{item.usuario}</Text>
          <Text style={estilos.reclamacaoData}>{item.data}</Text>
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
              { color: item.status === 'pendente' ? '#ff6b6b' : '#4ecdc4' },
            ]}
          >
            {item.status === 'pendente' ? 'Pendente' : 'Respondido'}
          </Text>

          <FontAwesome
            name={item.status === 'pendente' ? 'reply' : 'check-circle'}
            size={16}
            color={item.status === 'pendente' ? '#ff6b6b' : '#4ecdc4'}
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
      <View style={estilos.perfilContainer}>
        <View style={estilos.logoContainer}>
          {!logoCarregado && (
            <View style={estilos.placeholderContainer}>
              <Text style={estilos.placeholderText}>
                {nomeEmpresa.charAt(0)}
              </Text>
              <ActivityIndicator
                size='small'
                color='#ba68c8'
                style={estilos.loadingIndicator}
              />
            </View>
          )}

          <Image
            source={{ uri: logoEmpresa }}
            style={[estilos.logoEmpresa, !logoCarregado && { opacity: 0 }]}
            onLoad={() => setLogoCarregado(true)}
            onError={() => setLogoCarregado(true)}
          />
        </View>

        <View style={estilos.infoEmpresa}>
          <Text style={estilos.nomeEmpresa}>{nomeEmpresa}</Text>
          <Text style={estilos.descricaoEmpresa}>{descricaoEmpresa}</Text>
        </View>
      </View>

      {/* Painel administrativo de reclamações */}
      <View style={estilos.painelContainer}>
        <Text style={estilos.painelTitulo}>Reclamações Recebidas</Text>

        {carregandoReclamacoes ? (
          <View style={estilos.carregandoContainer}>
            <ActivityIndicator
              size='large'
              color='#ba68c8'
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
              color='#ba68c8'
            />
            <Text style={estilos.semDadosTexto}>
              Nenhuma reclamação encontrada!
            </Text>
          </View>
        ) : (
          <FlatList
            data={reclamacoes}
            renderItem={renderReclamacao}
            keyExtractor={(item) => item.id}
            contentContainerStyle={estilos.reclamacoesListContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Modal para responder reclamação */}
      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <View style={estilos.modalHeader}>
              <Text style={estilos.modalTitulo}>Responder Reclamação</Text>
              <Pressable onPress={() => setModalVisivel(false)}>
                <FontAwesome
                  name='close'
                  size={24}
                  color='#fff'
                />
              </Pressable>
            </View>

            {reclamacaoSelecionada && (
              <ScrollView style={estilos.modalScrollView}>
                <View style={estilos.reclamacaoDetalhes}>
                  <Text style={estilos.reclamacaoDetalheUsuario}>
                    Cliente: {reclamacaoSelecionada.usuario}
                  </Text>
                  <Text style={estilos.reclamacaoDetalheData}>
                    Data: {reclamacaoSelecionada.data}
                  </Text>
                  <Text style={estilos.reclamacaoDetalheTitulo}>
                    {reclamacaoSelecionada.titulo}
                  </Text>
                  <Text style={estilos.reclamacaoDetalheDescricao}>
                    {reclamacaoSelecionada.descricao}
                  </Text>
                </View>

                <View style={estilos.respostaContainer}>
                  <Text style={estilos.respostaLabel}>Sua Resposta:</Text>
                  <TextInput
                    style={estilos.respostaInput}
                    multiline={true}
                    numberOfLines={5}
                    placeholder='Digite sua resposta para esta reclamação...'
                    placeholderTextColor='#999'
                    value={respostaReclamacao}
                    onChangeText={setRespostaReclamacao}
                  />
                </View>

                <View style={estilos.modalBotoes}>
                  <Pressable
                    style={[estilos.modalBotao, estilos.botaoCancelar]}
                    onPress={() => setModalVisivel(false)}
                  >
                    <Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    style={[estilos.modalBotao, estilos.botaoEnviar]}
                    onPress={enviarResposta}
                  >
                    <Text style={estilos.textoBotaoEnviar}>
                      Enviar Resposta
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={estilos.footer}>
        {/* Ícone Dashboard - selecionado */}
        <Pressable style={estilos.footerItem}>
          <View style={estilos.footerItemSelecionado}>
            <FontAwesome
              name='dashboard'
              size={24}
              color='#D84040'
            />
            <Text style={[estilos.footerTexto, { color: 'white' }]}>
              Dashboard
            </Text>
          </View>
        </Pressable>

        {/* Ícone Perfil - ao pressionar, navega com transição suave para a tela de Perfil */}
        <Pressable
          style={estilos.footerItem}
          onPress={() => {
            router.push('/confi');
          }}
        >
          <View style={estilos.footerItemNaoSelecionado}>
            <FontAwesome
              name='cog'
              size={24}
              color='#555'
            />
            <Text style={[estilos.footerTexto, { color: '#555' }]}>
              Configurações
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
