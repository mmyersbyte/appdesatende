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
});

export default estilos;
