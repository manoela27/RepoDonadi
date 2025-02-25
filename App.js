
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';
import EntradasNoCaixa from './src/components/EntradasNoCaixa';
import TaxasRegistroMarcas from './src/components/TaxasRegistroMarcas';
import CheckListMarcas from './src/components/CheckListMarcas';

export default function App() {
  const [entradas, setEntradas] = useState([]);
  const [taxasRegistro, setTaxasRegistro] = useState([]);
  const [marcasVerificadas, setMarcasVerificadas] = useState([]);
  const [marcas] = useState(['Marca A', 'Marca B', 'Marca C', 'Marca D']);

  const calcularEntradasNoCaixa = (novaEntrada) => {
    setEntradas((prev) => {
      const updatedEntradas = [...prev, novaEntrada];
      const total = updatedEntradas.reduce((acc, valor) => acc + valor, 0);
      Alert.alert(`Total no Caixa: R$ ${total}`);
      return updatedEntradas;
    });
  };

  const somarTaxasRegistroMarcas = (novaTaxa) => {
    setTaxasRegistro((prev) => {
      const updatedTaxas = [...prev, novaTaxa];
      const totalTaxas = updatedTaxas.reduce((acc, valor) => acc + valor, 0);
      Alert.alert(`Total de Taxas de Registro: R$ ${totalTaxas}`);
      return updatedTaxas;
    });
  };

  const handleCheckMarca = (marca) => {
    setMarcasVerificadas((prev) => {
      if (prev.includes(marca)) {
        return prev.filter((item) => item !== marca);
      }
      return [...prev, marca];
    });
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <EntradasNoCaixa calcularTotal={calcularEntradasNoCaixa} />
        <TaxasRegistroMarcas calcularTotalTaxas={somarTaxasRegistroMarcas} />
        <CheckListMarcas
          marcas={marcas}
          marcasVerificadas={marcasVerificadas}
          handleCheckMarca={handleCheckMarca}
        />
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
});
