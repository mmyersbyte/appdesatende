import { StyleSheet } from 'react-native';

const COLORS = {
  // Primary colors
  background: '#1A1A1D',
  primary: '#D84040',

  //texto
  textPrimary: 'white',
  textSecondary: '#999',

  cardBackground: 'rgba(255, 255, 255, 0.05)',
  borderLight: 'rgba(255, 255, 255, 0.1)',
  borderWhite: 'white',

  darkGray: '#333',
  darkGrayAlt: '#222',
  inputBackground: '#333',
  inputBorder: '#444',

  successBackground: 'rgba(39, 174, 96, 0.2)', // Green with opacity
  errorBackground: 'rgba(231, 76, 60, 0.2)', // Red with opacity
  errorBackgroundDarker: 'rgba(231, 76, 60, 0.8)', // Darker red with opacity

  // Modal
  modalOverlay: 'rgba(0, 0, 0, 0.7)',
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cabecalho: {
    position: 'relative',
    height: 200,
  },
  areaCapa: {
    height: 150,
    width: '100%',
    backgroundColor: COLORS.darkGray,
    overflow: 'hidden',
  },
  imagemCapa: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  containerFoto: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bordaFoto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.background,
    overflow: 'hidden',
    backgroundColor: COLORS.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fotoPerfil: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  placeholderFoto: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: COLORS.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEditarFoto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  infoUsuario: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  boasVindas: {
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nomeUsuario: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  conteudoPrincipal: {
    flex: 1,
    paddingHorizontal: 16,
  },
  secaoReclamacoes: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 80, // Espaço para o rodapé
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  itemReclamacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  infoReclamacao: {
    flex: 1,
  },
  tituloReclamacao: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  empresaReclamacao: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 2,
  },
  dataReclamacao: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statusReclamacao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 90,
    alignItems: 'center',
  },
  respondida: {
    backgroundColor: COLORS.successBackground,
  },
  naoRespondida: {
    backgroundColor: COLORS.errorBackground,
  },
  textoStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  semReclamacoes: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: 20,
  },
  botaoNovaReclamacao: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconeBotao: {
    marginRight: 8,
  },
  textoBotao: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  rodape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderWhite,
    paddingVertical: 12,
    justifyContent: 'space-around',
    backgroundColor: COLORS.background,
  },
  itemRodape: {
    flex: 1,
    alignItems: 'center',
  },
  itemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.borderWhite,
    paddingBottom: 4,
  },
  itemNaoSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
  },
  textoRodape: {
    fontSize: 12,
    marginTop: 2,
  },

  // Estilos do modal
  centrarModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.modalOverlay,
  },
  conteudoModal: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: COLORS.darkGrayAlt,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cabecalhoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  tituloModal: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoFechar: {
    padding: 5,
  },
  formulario: {
    padding: 20,
  },
  campoFormulario: {
    marginBottom: 16,
  },
  labelFormulario: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginBottom: 6,
  },
  inputFormulario: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    padding: 12,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  inputMultiline: {
    minHeight: 100,
  },
  botaoUploadImagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderStyle: 'dashed',
    padding: 20,
  },
  textoUploadImagem: {
    color: COLORS.primary,
    marginLeft: 10,
    fontSize: 16,
  },
  previewContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  previewImagem: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  botaoRemoverImagem: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.errorBackgroundDarker,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEnviar: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  sucessoContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSucesso: {
    color: COLORS.textPrimary,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default estilos;
