import React, { useState } from 'react';
import { TextInput, Button, Card, Text, StyleSheet, Alert } from 'react-native-paper';

const EntradasNoCaixa = ({ calcularTotal }) => {
  const [novaEntrada, setNovaEntrada] = useState('');

  const adicionarEntrada = () => {
    const valorEntrada = parseFloat(novaEntrada);
    if (isNaN(valorEntrada)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    calcularTotal(valorEntrada);
    Alert.alert('Sucesso', 'Entrada adicionada com sucesso!');
    setNovaEntrada('');
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Cálculo de Entradas no Caixa" />
      <Card.Content>
        <TextInput
          style={styles.input}
          placeholder="Valor da Entrada"
          keyboardType="numeric"
          value={novaEntrada}
          onChangeText={setNovaEntrada}
        />
        <Button title="Adicionar Entrada" onPress={adicionarEntrada} />
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

export default EntradasNoCaixa;