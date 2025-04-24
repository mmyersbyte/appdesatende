import { StyleSheet } from 'react-native';

const CORES = {
  // Cores de fundo
  fundoPrincipal: '#1A1A1D', // Fundo principal
  fundoClaro: '#2A2A2D', // Fundo mais claro
  fundoMaisClaro: '#3A3A3D', // Fundo para modais

  // Cores principais
  corPrimaria: '#D84040', // Cor primária vermelha
  bordaPrincipal: '#6A1E55', // Cor das bordas

  // Cores de texto
  texto: '#ECDCBF', // Texto principal
  textoClaro: 'rgba(255, 255, 255, 0.9)', // Texto com 90% opacidade
  textoMaisClaro: 'rgba(255, 255, 255, 0.8)', // Texto com 80% opacidade
  textoSuave: 'rgba(255, 255, 255, 0.7)', // Texto com 70% opacidade
  textoPlaceholder: '#999', // Texto para placeholders

  // Cores de status
  statusPendente: '#ff6b6b', // Vermelho para pendente
  statusResolvido: '#4ecdc4', // Verde-água para resolvido

  // Cores de modal
  fundoModal: 'rgba(0, 0, 0, 0.7)', // Fundo do modal
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  /* PESQUISA EMPRESAS */
  searchSection: {
    marginBottom: 16,
  },
  labelPesquisa: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: CORES.corPrimaria,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.branco,
    borderColor: CORES.bordaPrincipal,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 7,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: CORES.fundoPrincipal,
  },
  /* BANNER PRINCIPAL */
  bannerContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerImagem: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  /* TEXTO EXPLICATIVO */
  textoExplicativo: {
    fontSize: 17,
    padding: 0,
    fontWeight: 'bold',
    color: CORES.textoMaisClaro,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },

  /* SEÇÃO DE EMPRESAS */
  empresasSection: {
    marginBottom: 20,
  },
  empresasSubtitulo: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: CORES.textoMaisClaro,
    marginBottom: 15,
  },
  empresasListContainer: {
    paddingRight: 8,
    paddingLeft: 2,
  },
  empresaItem: {
    marginRight: 12,
    alignItems: 'center',
    width: 80,
  },
  empresaImagemContainer: {
    position: 'relative',
    borderRadius: 200,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: CORES.fundoClaro,
    width: 80,
    height: 80,
  },
  empresaImagem: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoClaro,
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CORES.corPrimaria,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 10,
  },
  empresaNome: {
    fontSize: 14,
    fontWeight: '600',
    color: CORES.texto,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 4,
    height: 40,
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
    borderTopColor: CORES.texto,
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
    borderBottomColor: CORES.texto,
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
