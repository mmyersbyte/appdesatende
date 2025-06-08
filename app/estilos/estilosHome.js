import { StyleSheet } from 'react-native';

const CORES = {
  fundoPrincipal: '#282a36', // Dracula background
  fundoClaro: '#44475a', // Dracula current line

  corPrimaria: '#8be9fd', // Dracula cyan - título principal
  bordaPrincipal: '#bd93f9', // Dracula purple - bordas especiais

  texto: '#f8f8f2', // Dracula foreground
  textoClaro: 'rgba(248, 248, 242, 0.95)', // Dracula foreground 95%
  textoMaisClaro: 'rgba(248, 248, 242, 0.85)', // Dracula foreground 85%
  textoSuave: 'rgba(255, 255, 255, 0.7)', // Texto suave
  textoPlaceholder: '#6272a4', // Dracula comment para placeholders
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    paddingTop: 32,
    paddingHorizontal: 12,
    paddingBottom: 70,
  },
  /* PESQUISA EMPRESAS - OTIMIZADA */
  searchSection: {
    marginBottom: 12,
  },
  labelPesquisa: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
    color: CORES.corPrimaria,
    letterSpacing: 1.2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CORES.fundoClaro,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
    color: CORES.textoPlaceholder,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: CORES.texto,
    fontSize: 15,
    backgroundColor: 'transparent',
    fontWeight: '500',
    letterSpacing: 0.3,
    paddingLeft: 4,
  },
  /* BANNER PRINCIPAL - OTIMIZADO PARA PROXIMIDADE */
  bannerContainer: {
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerImagem: {
    width: '100%',
    height: 200,
    borderRadius: 18,
  },
  textoExplicativo: {
    fontSize: 14,
    fontWeight: '600',
    color: CORES.textoMaisClaro,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 12,
    paddingHorizontal: 8,
  },

  empresasSection: {
    marginBottom: 20,
    flex: 1,
  },
  empresasSubtitulo: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: CORES.textoClaro,
    marginBottom: 14,
    letterSpacing: 0.3,
    paddingHorizontal: 4,
  },
  empresasListContainer: {
    paddingRight: 12,
    paddingLeft: 4,
    paddingBottom: 8,
  },
});

export default estilos;
