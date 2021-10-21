import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ant, RaceStatus } from '../models';
import { generateAntWinLikelihoodCalculator, promisifiedGenerateFunction } from '../utils';

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.28,
    shadowRadius: 3.0,
    elevation: 3,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 18,
    padding: 8
  },
  detailContainer: {
    paddingHorizontal: 12
  },
  detail: {
    fontSize: 14,
    color: 'gray'
  }
});

type Props = {
  ant: Ant;
  updateChances: (ant: Ant, chances: number) => void;
  raceStatus: RaceStatus;
}

const AntCard = (props: Props) => {
  const { ant, updateChances, raceStatus } = props;
  const [likelihood, setLikelihood] = useState(0);
  const [chances, setChances] = useState('stretching...');

  useEffect(() => {
    if (raceStatus === RaceStatus.inProgress) {
      setChances('running...');
      const getLikelihood = async () => {
        const chances = await promisifiedGenerateFunction();
        setLikelihood(chances);
        updateChances(ant, chances);
      }
      getLikelihood();
    }
  }, [ant, raceStatus, updateChances]);

  return (
    <View style={styles.container}>
      <Text style={[styles.name, { color: ant.color.toLowerCase() }]}>{ant.name}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detail}>color: {ant.color}</Text>
        <Text style={styles.detail}>length: {ant.length}</Text>
        <Text style={styles.detail}>weight: {ant.weight}</Text>
        <Text style={styles.detail}>{likelihood > 0 ? likelihood : chances}</Text>
      </View>
    </View>
  )

};

export default AntCard;
