import { StyleSheet } from 'react-native';

// Cores principais para reutilização
const corPlaceholder = '#999';
const corPrimaria = '#ba68c8';
const corFundo = '#1A1A1D';
const corBorda = '#6A1E55';
const corTexto = 'white';
const corPendente = '#ff6b6b';
const corRespondido = '#4ecdc4';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundo,
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
    color: corPrimaria,
  },
  labelPainel: {
    fontSize: 18,
    textAlign: 'center',
    color: corTexto,
    marginTop: 5,
  },

  /* PERFIL DA EMPRESA */
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#2A2A2D',
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
    backgroundColor: '#3A3A3D',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: corPrimaria,
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
    color: corTexto,
    marginBottom: 5,
  },
  descricaoEmpresa: {
    fontSize: 14,
    color: corTexto,
    opacity: 0.8,
  },

  /* PAINEL DE RECLAMAÇÕES */
  painelContainer: {
    flex: 1,
    marginBottom: 10,
  },
  painelTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: corPrimaria,
    marginBottom: 15,
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carregandoTexto: {
    marginTop: 10,
    color: corTexto,
    fontSize: 16,
  },
  semDadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  semDadosTexto: {
    marginTop: 15,
    color: corTexto,
    fontSize: 16,
  },
  reclamacoesListContainer: {
    paddingBottom: 80, // Espaço para não sobrepor o footer
  },
  reclamacaoItem: {
    backgroundColor: '#2A2A2D',
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
    color: corTexto,
  },
  reclamacaoData: {
    fontSize: 12,
    color: corTexto,
    opacity: 0.7,
  },
  reclamacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: corTexto,
    marginBottom: 5,
  },
  reclamacaoDescricao: {
    fontSize: 14,
    color: corTexto,
    opacity: 0.9,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#2A2A2D',
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: corPrimaria,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    color: corTexto,
  },
  reclamacaoDetalheData: {
    fontSize: 12,
    color: corTexto,
    opacity: 0.7,
    marginBottom: 10,
  },
  reclamacaoDetalheTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: corTexto,
    marginBottom: 5,
  },
  reclamacaoDetalheDescricao: {
    fontSize: 14,
    color: corTexto,
    lineHeight: 20,
  },
  respostaContainer: {
    marginBottom: 20,
  },
  respostaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: corTexto,
    marginBottom: 10,
  },
  respostaInput: {
    backgroundColor: '#3A3A3D',
    borderRadius: 8,
    padding: 12,
    color: corTexto,
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
    backgroundColor: '#3A3A3D',
    marginRight: 5,
  },
  botaoEnviar: {
    backgroundColor: corPrimaria,
    marginLeft: 5,
  },
  textoBotaoCancelar: {
    color: corTexto,
    fontWeight: 'bold',
  },
  textoBotaoEnviar: {
    color: '#fff',
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
    borderTopColor: corTexto,
    backgroundColor: corFundo,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: corTexto,
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
