import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function EmpresaItem({
  item,
  imageLoaded,
  onImageLoad,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      style={({ pressed }) => [styles.empresaItem, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.empresaImagemContainer}>
        {!imageLoaded && (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>{item.nome.charAt(0)}</Text>
            <ActivityIndicator
              size='small'
              color='#ba68c8'
              style={styles.loadingIndicator}
            />
          </View>
        )}
        <Image
          source={{ uri: item.imagem }}
          style={[styles.empresaImagem, !imageLoaded && { opacity: 0 }]}
          onLoad={onImageLoad}
          onError={onImageLoad}
        />
      </View>
      <Text
        style={styles.empresaNome}
        numberOfLines={2}
        ellipsizeMode='tail'
      >
        {item.nome}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  empresaItem: {
    marginRight: 14,
    alignItems: 'center',
    width: 90,
    backgroundColor: '#2A2A2D',
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
    backgroundColor: '#232326',
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
    backgroundColor: '#232326',
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  placeholderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D84040',
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 6,
  },
  empresaNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ECDCBF',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 2,
    height: 36,
  },
});
