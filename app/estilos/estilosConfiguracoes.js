import { StyleSheet } from 'react-native';

const CORES = {
  // Cores de fundo
  fundoPrincipal: '#1A1A1D', // Fundo principal da tela
  fundoSecundario: '#2A2A2D', // Fundo secundário para elementos

  // Cores principais
  corPrimaria: '#D84040', // Vermelho principal
  corSecundaria: '#ba68c8', // Roxo para elementos secundários

  // Cores de texto
  textoPrincipal: '#ECDCBF', // Texto principal em tom bege
  textoEscuro: '#1A1A1D', // Texto escuro para contraste
  textoClaro: 'white', // Texto em branco

  // Cores de borda
  bordaPrincipal: '#6A1E55', // Borda principal
  bordaBranca: 'white', // Borda em branco

  // Cores de status
  corSucesso: '#27ae60', // Verde para feedback positivo

  // Cores utilitárias
  cinzaEscuro: '#555', // Cinza para elementos inativos

  // Overlay
  overlayDark: 'rgba(0, 0, 0, 0.4)',
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 24,
    textAlign: 'center',
  },
  secaoFotoPerfil: {
    marginBottom: 24,
  },
  labelFotoPerfil: {
    fontSize: 18,
    color: CORES.textoPrincipal,
    marginBottom: 8,
  },
  botaoAlterarFoto: {
    alignItems: 'center',
  },
  containerFotoPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoSecundario,
  },
  fotoPerfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayFotoPerfil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: CORES.overlayDark,
    borderRadius: 75,
  },
  iconeCamera: {
    position: 'absolute',
  },
  secaoBio: {
    marginBottom: 24,
  },
  labelBio: {
    fontSize: 18,
    color: CORES.textoPrincipal,
    marginBottom: 8,
  },
  inputBio: {
    backgroundColor: CORES.textoPrincipal,
    borderRadius: 8,
    padding: 12,
    color: CORES.textoEscuro,
    textAlignVertical: 'top',
  },
  botaoSalvar: {
    backgroundColor: CORES.corPrimaria,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  textoBotaoSalvar: {
    color: CORES.textoPrincipal,
    fontSize: 18,
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
    borderTopColor: CORES.bordaBranca,
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
    borderBottomColor: CORES.corSecundaria,
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
