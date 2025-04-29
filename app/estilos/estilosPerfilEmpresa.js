import { StyleSheet } from 'react-native';

// Variáveis de cores organizadas em um objeto estruturado
const CORES = {
  // Cores de fundo
  fundoPrincipal: '#1A1A1D', // Fundo principal escuro
  fundoClaro: '#2A2A2D', // Fundo mais claro para cards
  fundoMaisClaro: '#3A3A3D', // Fundo para modais

  // Cores principais
  corPrimaria: '#D84040', // Vermelho usado no app
  bordaPrincipal: '#6A1E55', // Cor para bordas principais

  // Cores de text
  textoPrincipal: '#ECDCBF', // Texto em tom bege/creme
  textoClaro: 'rgba(255, 255, 255, 0.9)', // Texto branco 90% opacidade
  textoMaisClaro: 'rgba(255, 255, 255, 0.8)', // Texto branco 80% opacidade
  textoSuave: 'rgba(255, 255, 255, 0.7)', // Texto branco 70% opacidade
  textoPlaceholder: '#999', // Texto para placeholders

  // Cores de status
  statusPendente: '#ff6b6b', // Vermelho para pendentes
  statusResolvido: '#4ecdc4', // Verde-água para resolvidos

  // Cores de modal
  fundoModal: 'rgba(0, 0, 0, 0.7)', // Sobreposição escura para modal
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },

  /* CABEÇALHO */
  cabecalho: {
    marginBottom: 20,
  },
  labelPlataforma: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: CORES.corPrimaria,
  },
  labelPainel: {
    fontSize: 18,
    textAlign: 'center',
    color: CORES.textoPrincipal,
    marginTop: 5,
  },

  /* PERFIL DA EMPRESA */
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: CORES.fundoClaro,
    borderRadius: 10,
  },
  logoContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
  },
  logoEmpresa: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoMaisClaro,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CORES.corPrimaria,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 10,
  },
  infoEmpresa: {
    flex: 1,
  },
  nomeEmpresa: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 5,
  },
  descricaoEmpresa: {
    fontSize: 14,
    color: CORES.textoMaisClaro,
  },

  /* PAINEL DE RECLAMAÇÕES */
  painelContainer: {
    flex: 1,
    marginBottom: 10,
  },
  painelTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: CORES.corPrimaria,
    marginBottom: 15,
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carregandoTexto: {
    marginTop: 10,
    color: CORES.textoPrincipal,
    fontSize: 16,
  },
  semDadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semDadosTexto: {
    marginTop: 15,
    color: CORES.textoPrincipal,
    fontSize: 16,
  },
  reclamacoesListContainer: {
    paddingBottom: 80, // Espaço para não sobrepor o footer
  },
  reclamacaoItem: {
    backgroundColor: CORES.fundoClaro,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  reclamacaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reclamacaoUsuario: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  reclamacaoData: {
    fontSize: 12,
    color: CORES.textoSuave,
  },
  reclamacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 5,
  },
  reclamacaoDescricao: {
    fontSize: 14,
    color: CORES.textoClaro,
    marginBottom: 10,
  },
  reclamacaoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reclamacaoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  /* MODAL DE RESPOSTA */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: CORES.fundoModal,
  },
  modalContent: {
    backgroundColor: CORES.fundoClaro,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: CORES.corPrimaria,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  modalScrollView: {
    padding: 15,
  },
  reclamacaoDetalhes: {
    marginBottom: 20,
  },
  reclamacaoDetalheUsuario: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  reclamacaoDetalheData: {
    fontSize: 12,
    color: CORES.textoSuave,
    marginBottom: 10,
  },
  reclamacaoDetalheTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 5,
  },
  reclamacaoDetalheDescricao: {
    fontSize: 14,
    color: CORES.textoPrincipal,
    lineHeight: 20,
  },
  respostaContainer: {
    marginBottom: 20,
  },
  respostaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 10,
  },
  respostaInput: {
    backgroundColor: CORES.fundoMaisClaro,
    borderRadius: 8,
    padding: 12,
    color: CORES.textoPrincipal,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  modalBotao: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: CORES.fundoMaisClaro,
    marginRight: 5,
  },
  botaoEnviar: {
    backgroundColor: CORES.corPrimaria,
    marginLeft: 5,
  },
  textoBotaoCancelar: {
    color: CORES.textoPrincipal,
    fontWeight: 'bold',
  },
  textoBotaoEnviar: {
    color: CORES.textoPrincipal,
    fontWeight: 'bold',
  },

  /* FOOTER */
  footer: {
    justifyContent: 'space-around',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '110%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: CORES.textoPrincipal,
    backgroundColor: CORES.fundoPrincipal,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: CORES.textoPrincipal,
    paddingBottom: 4,
  },
  footerItemNaoSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
  },
  footerTexto: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default estilos;
