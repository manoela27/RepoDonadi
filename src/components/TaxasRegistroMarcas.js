import React, { useState } from 'react';
import { TextInput, Button, Card, Text, StyleSheet, Alert } from 'react-native-paper';

const TaxasRegistroMarcas = ({ calcularTotalTaxas }) => {
  const [novaTaxaRegistro, setNovaTaxaRegistro] = useState('');

  const adicionarTaxaRegistro = () => {
    const valorTaxa = parseFloat(novaTaxaRegistro);
    if (isNaN(valorTaxa)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    calcularTotalTaxas(valorTaxa);
    Alert.alert('Sucesso', 'Taxa de registro adicionada com sucesso!');
    setNovaTaxaRegistro('');
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Somar Taxas de Registro" />
      <Card.Content>
        <TextInput
          style={styles.input}
          placeholder="Valor da Taxa de Registro"
          keyboardType="numeric"
          value={novaTaxaRegistro}
          onChangeText={setNovaTaxaRegistro}
        />
        <Button title="Adicionar Taxa de Registro" onPress={adicionarTaxaRegistro} />
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

export default TaxasRegistroMarcas;