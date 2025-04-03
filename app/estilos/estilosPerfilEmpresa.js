import { StyleSheet } from 'react-native';

// Color variables organized in a structured object
const COLORS = {
  // Primary colors
  background: '#1A1A1D',
  backgroundLight: '#2A2A2D',
  backgroundLighter: '#3A3A3D', //modal
  primary: '#D84040', // Purple color used throughout the app
  border: '#6A1E55',

  // Text colors
  text: '#ECDCBF', // Beige/cream color for text
  textLight: 'rgba(255, 255, 255, 0.9)', // 90% opacity white
  textLighter: 'rgba(255, 255, 255, 0.8)', // 80% opacity white
  textLightest: 'rgba(255, 255, 255, 0.7)', // 70% opacity white
  placeholder: '#999',

  // Status colors
  pending: '#ff6b6b', // Red for pending status
  resolved: '#4ecdc4', // Teal for resolved status

  // Modal
  modalOverlay: 'rgba(0, 0, 0, 0.7)',
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.primary,
  },
  labelPainel: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.text,
    marginTop: 5,
  },

  /* PERFIL DA EMPRESA */
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: COLORS.backgroundLight,
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
    backgroundColor: COLORS.backgroundLighter,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
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
    color: COLORS.text,
    marginBottom: 5,
  },
  descricaoEmpresa: {
    fontSize: 14,
    color: COLORS.textLighter,
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

    color: COLORS.primary,
    marginBottom: 15,
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carregandoTexto: {
    marginTop: 10,
    color: COLORS.text,
    fontSize: 16,
  },
  semDadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semDadosTexto: {
    marginTop: 15,
    color: COLORS.text,
    fontSize: 16,
  },
  reclamacoesListContainer: {
    paddingBottom: 80, // Espaço para não sobrepor o footer
  },
  reclamacaoItem: {
    backgroundColor: COLORS.backgroundLight,
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
    color: COLORS.text,
  },
  reclamacaoData: {
    fontSize: 12,
    color: COLORS.textLightest,
  },
  reclamacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  reclamacaoDescricao: {
    fontSize: 14,
    color: COLORS.textLight,
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
    backgroundColor: COLORS.modalOverlay,
  },
  modalContent: {
    backgroundColor: COLORS.backgroundLight,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
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
    color: COLORS.text,
  },
  reclamacaoDetalheData: {
    fontSize: 12,
    color: COLORS.textLightest,
    marginBottom: 10,
  },
  reclamacaoDetalheTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  reclamacaoDetalheDescricao: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  respostaContainer: {
    marginBottom: 20,
  },
  respostaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  respostaInput: {
    backgroundColor: COLORS.backgroundLighter,
    borderRadius: 8,
    padding: 12,
    color: COLORS.text,
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
    backgroundColor: COLORS.backgroundLighter,
    marginRight: 5,
  },
  botaoEnviar: {
    backgroundColor: COLORS.primary,
    marginLeft: 5,
  },
  textoBotaoCancelar: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  textoBotaoEnviar: {
    color: COLORS.text,
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
    borderTopColor: COLORS.text,
    backgroundColor: COLORS.background,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.text,
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
