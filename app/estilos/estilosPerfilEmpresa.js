import { StyleSheet } from 'react-native';

// PALETA DRACULA COMPLETA
// Cores oficiais do tema Dracula para uma interface dark consistente
// https://draculatheme.com/contribute

const COLORS = {
  // ========== CORES BASES DRACULA ==========

  // CORES PRINCIPAIS DRACULA
  background: '#282a36', // Fundo principal
  currentLine: '#44475a', // Linha atual/hover
  foreground: '#f8f8f2', // Texto principal
  comment: '#6272a4', // Comentários
  selection: '#44475a', // Seleção

  // CORES DE TEXTO DRACULA
  cyan: '#8be9fd', // Azul claro
  green: '#50fa7b', // Verde
  orange: '#ffb86c', // Laranja
  pink: '#ff79c6', // Rosa
  purple: '#bd93f9', // Roxo
  red: '#ff5555', // Vermelho
  yellow: '#f1fa8c', // Amarelo

  // CORES DE STATUS DRACULA
  success: '#50fa7b', // Verde para sucesso
  warning: '#ffb86c', // Laranja para avisos
  error: '#ff5555', // Vermelho para erros
  info: '#8be9fd', // Azul para informações

  // CORES ESPECIAIS
  white: '#f8f8f2', // Branco Dracula
  black: '#282a36', // Preto Dracula
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.foreground,
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
    color: COLORS.cyan, // Cyan para diferenciação
    marginBottom: 16, // Otimizado
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  /* ESTADOS DE CARREGAMENTO DRACULA */
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.selection,
    borderRadius: 16,
    marginHorizontal: 8,
    paddingVertical: 40,
  },
  carregandoTexto: {
    marginTop: 16,
    color: COLORS.foreground,
    fontSize: 16,
    fontWeight: '500',
  },
  semDadosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.selection,
    borderRadius: 16,
    marginHorizontal: 8,
    paddingVertical: 40,
  },
  semDadosTexto: {
    marginTop: 16,
    color: COLORS.foreground,
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
    backgroundColor: COLORS.selection,
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
    color: COLORS.foreground,
    flex: 1,
  },
  reclamacaoData: {
    fontSize: 12,
    color: COLORS.comment,
    fontWeight: '500',
    backgroundColor: COLORS.comment,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reclamacaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.cyan, // Cyan para títulos
    marginBottom: 8, // Aumentado
    lineHeight: 22,
  },
  reclamacaoDescricao: {
    fontSize: 14,
    color: COLORS.currentLine,
    marginBottom: 12, // Aumentado
    lineHeight: 20,
  },
  reclamacaoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8, // Separação visual
    borderTopWidth: 1,
    borderTopColor: COLORS.comment,
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
    backgroundColor: COLORS.selection,
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
    backgroundColor: COLORS.comment,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.purple,
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
    color: COLORS.foreground,
    marginBottom: 5,
  },
  descricaoEmpresa: {
    fontSize: 14,
    color: COLORS.comment,
  },

  /* FALSO FOOTER MINIMALISTA */
  falsoFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: COLORS.selection,
    borderTopWidth: 1,
    borderTopColor: COLORS.comment,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  falsoFooterTexto: {
    color: COLORS.comment,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default estilos;
