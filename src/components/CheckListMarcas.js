import React, { useState } from 'react';
import { TextInput, Button, Card, Text, StyleSheet, Alert } from 'react-native-paper';

const ChecklistMarcas = ({ adicionarMarca }) => {
  const [novaMarca, setNovaMarca] = useState('');

  const adicionarNovaMarca = () => {
    const valorMarca = parseFloat(novaMarca);
    if (isNaN(valorMarca)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    adicionarMarca(valorMarca);
    Alert.alert('Sucesso', 'Marca adicionada com sucesso!');
    setNovaMarca('');
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Checklist de Marcas" />
      <Card.Content>
        <TextInput
          style={styles.input}
          placeholder="Valor da Marca"
          keyboardType="numeric"
          value={novaMarca}
          onChangeText={setNovaMarca}
        />
        <Button title="Adicionar Marca" onPress={adicionarNovaMarca} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default ChecklistMarcas;