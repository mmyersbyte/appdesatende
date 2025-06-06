import { StyleSheet } from 'react-native';

// 🧛‍♂️ PALETA DRACULA COMPLETA
const CORES = {
  // 🌙 CORES DE FUNDO DRACULA
  fundoPrincipal: '#282a36', // Dracula background
  fundoClaro: '#44475a', // Dracula current line
  fundoMaisClaro: '#6272a4', // Dracula comment
  fundoCard: '#3a3f58', // Dracula selection mais escuro

  // 🎨 CORES PRINCIPAIS DRACULA
  corPrimaria: '#bd93f9', // Dracula purple
  corSecundaria: '#8be9fd', // Dracula cyan
  corDestaque: '#50fa7b', // Dracula green
  corAlerta: '#ffb86c', // Dracula orange
  corErro: '#ff5555', // Dracula red

  // 🔤 CORES DE TEXTO DRACULA
  textoPrincipal: '#f8f8f2', // Dracula foreground
  textoClaro: 'rgba(248, 248, 242, 0.95)', // Dracula foreground 95%
  textoMaisClaro: 'rgba(248, 248, 242, 0.85)', // Dracula foreground 85%
  textoSuave: 'rgba(248, 248, 242, 0.7)', // Dracula foreground 70%
  textoPlaceholder: '#6272a4', // Dracula comment

  // 🎯 CORES DE STATUS DRACULA
  statusAberta: '#ff5555', // Dracula red para aberta
  statusRespondida: '#50fa7b', // Dracula green para respondida
  statusFechada: '#bd93f9', // Dracula purple para fechada

  // 🎭 CORES ESPECIAIS
  fundoModal: 'rgba(0, 0, 0, 0.8)', // Overlay escuro
  bordaAtiva: '#bd93f9', // Dracula purple para bordas ativas
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    paddingTop: 32, // Reduzido para melhor UX
    paddingHorizontal: 12, // Mais compacto
    paddingBottom: 70, // Espaço para footer
  },

  /* CABEÇALHO DRACULA UX */
  cabecalho: {
    marginBottom: 24, // Aumentado para melhor separação
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  labelPlataforma: {
    fontSize: 28, // Reduzido para melhor proporção
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D84040', // Mudado para a cor solicitada
    letterSpacing: 1.5,
  },
  labelPainel: {
    fontSize: 16, // Ligeiramente reduzido
    textAlign: 'center',
    color: CORES.textoMaisClaro,
    marginTop: 4, // Reduzido
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  /* PAINEL DE RECLAMAÇÕES UX MELHORADO */
  painelContainer: {
    flex: 1,
    marginBottom: 8, // Reduzido
  },
  painelTitulo: {
    fontSize: 18, // Reduzido para melhor hierarquia
    fontWeight: 'bold',
    textAlign: 'center',
    color: CORES.corSecundaria, // Cyan para diferenciação
    marginBottom: 16, // Otimizado
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  /* ESTADOS DE CARREGAMENTO DRACULA */
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoCard,
    borderRadius: 16,
    marginHorizontal: 8,
    paddingVertical: 40,
  },
  carregandoTexto: {
    marginTop: 16,
    color: CORES.textoPrincipal,
    fontSize: 16,
    fontWeight: '500',
  },
  semDadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoCard,
    borderRadius: 16,
    marginHorizontal: 8,
    paddingVertical: 40,
  },
  semDadosTexto: {
    marginTop: 16,
    color: CORES.textoPrincipal,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  /* LISTA DE RECLAMAÇÕES UX */
  reclamacoesListContainer: {
    paddingBottom: 20, // Reduzido
    paddingHorizontal: 4, // Pequeno padding lateral
  },

  /* ITEM DE RECLAMAÇÃO DRACULA */
  reclamacaoItem: {
    backgroundColor: CORES.fundoCard,
    borderRadius: 14, // Mais arredondado
    padding: 16, // Padding otimizado
    marginBottom: 12, // Espaçamento menor
    marginHorizontal: 4, // Pequena margem lateral
    borderLeftWidth: 5, // Borda mais espessa
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  reclamacaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Aumentado
    alignItems: 'center',
  },
  reclamacaoUsuario: {
    fontSize: 15, // Ligeiramente aumentado
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    flex: 1,
  },
  reclamacaoData: {
    fontSize: 12,
    color: CORES.textoSuave,
    fontWeight: '500',
    backgroundColor: CORES.fundoMaisClaro,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reclamacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CORES.corSecundaria, // Cyan para títulos
    marginBottom: 8, // Aumentado
    lineHeight: 22,
  },
  reclamacaoDescricao: {
    fontSize: 14,
    color: CORES.textoClaro,
    marginBottom: 12, // Aumentado
    lineHeight: 20,
  },
  reclamacaoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8, // Separação visual
    borderTopWidth: 1,
    borderTopColor: CORES.fundoMaisClaro,
  },
  reclamacaoStatus: {
    fontSize: 13, // Ligeiramente reduzido
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* PERFIL DA EMPRESA - MANTIDO PARA COMPATIBILIDADE */
  perfilContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: CORES.fundoCard,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
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

  /* FALSO FOOTER MINIMALISTA */
  falsoFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: CORES.fundoCard,
    borderTopWidth: 1,
    borderTopColor: CORES.fundoMaisClaro,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  falsoFooterTexto: {
    color: CORES.textoSuave,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default estilos;
