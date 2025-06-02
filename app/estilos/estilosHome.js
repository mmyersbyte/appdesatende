import { StyleSheet } from 'react-native';

const CORES = {
  // Cores de fundo
  fundoPrincipal: '#1A1A1D', // Fundo principal
  fundoClaro: '#232326', // Fundo mais claro
  fundoMaisClaro: '#2A2A2D', // Fundo para modais

  // Cores principais
  corPrimaria: '#D84040', // Cor primária vermelha
  bordaPrincipal: '#6A1E55', // Cor das bordas

  // Cores de texto
  texto: '#ECDCBF', // Texto principal
  textoClaro: 'rgba(255, 255, 255, 0.95)', // Texto com 95% opacidade
  textoMaisClaro: 'rgba(255, 255, 255, 0.85)', // Texto com 85% opacidade
  textoSuave: 'rgba(255, 255, 255, 0.7)', // Texto com 70% opacidade
  textoPlaceholder: '#bbb', // Texto para placeholders

  // Cores de status
  statusPendente: '#ff6b6b', // Vermelho para pendente
  statusResolvido: '#4ecdc4', // Verde-água para resolvido

  // Cores de modal
  fundoModal: 'rgba(0, 0, 0, 0.7)', // Fundo do modal
  branco: '#fff',
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    paddingTop: 36,
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  /* PESQUISA EMPRESAS */
  searchSection: {
    marginBottom: 18,
  },
  labelPesquisa: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    color: CORES.corPrimaria,
    letterSpacing: 1.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.fundoMaisClaro,
    borderColor: CORES.bordaPrincipal,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: CORES.textoMaisClaro,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  /* BANNER PRINCIPAL */
  bannerContainer: {
    marginBottom: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerImagem: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    backgroundColor: CORES.fundoClaro,
  },
  /* TEXTO EXPLICATIVO */
  textoExplicativo: {
    fontSize: 16,
    fontWeight: '600',
    color: CORES.textoMaisClaro,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 18,
    marginHorizontal: 8,
  },

  /* SEÇÃO DE EMPRESAS */
  empresasSection: {
    marginBottom: 24,
  },
  empresasSubtitulo: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color: CORES.textoClaro,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  empresasListContainer: {
    paddingRight: 8,
    paddingLeft: 2,
  },
  empresaItem: {
    marginRight: 14,
    alignItems: 'center',
    width: 90,
    backgroundColor: CORES.fundoMaisClaro,
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 4,
  },
  empresaImagemContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: CORES.fundoClaro,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empresaImagem: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoClaro,
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: CORES.corPrimaria,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 6,
  },
  empresaNome: {
    fontSize: 14,
    fontWeight: '600',
    color: CORES.texto,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 2,
    height: 36,
  },

  /* FOOTER */
  footer: {
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: CORES.textoSuave,
    backgroundColor: CORES.fundoPrincipal,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: CORES.corPrimaria,
    paddingBottom: 4,
  },
  footerItemNaoSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
  },
  footerTexto: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default estilos;
