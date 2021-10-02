import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, ListRenderItem, SafeAreaView } from 'react-native';

import Button from '../components/button';
import AntCard from '../components/ant-card';

import { useQuery } from 'urql';
import { AntQuery } from '../queries';
import { getCompleteStatus, getResetAnts, sortAnts } from '../utils';
import { Ant, AntResponse, RaceStatus } from '../models';

const Main = () => {
  const [ants, setAnts] = useState<Ant[]>([]);
  const [shouldFetchAnts, setShouldFetchAnts] = useState(false);
  const [raceStatus, setRaceStatus] = useState(RaceStatus.notStarted);

  const [results] = useQuery<AntResponse>({
    query: AntQuery,
    pause: !shouldFetchAnts
  });
  const { data, fetching, error } = results;

  useEffect(() => {
    if (data && data.ants) {
      setAnts(data.ants);
    }
  }, [data, data?.ants, setAnts]);

  const onFetchAnts = () => {
    setShouldFetchAnts(true);
  }

  const onStartRace = useCallback(() => {
    setRaceStatus(RaceStatus.inProgress)
  }, [ants, setRaceStatus]);

  const renderItem: ListRenderItem<Ant> = useCallback(({ item }) => {
    return <AntCard ant={item} updateChances={updateChances} raceStatus={raceStatus} />;
  }, [raceStatus, ants]);

  const updateChances = useCallback((ant: Ant, chances: number) => {
    let antToSet = ants.filter(a => ant.name === a.name)[0];
    let otherAnts = ants.filter(a => ant.name !== a.name);

    if (antToSet) {
      antToSet.likelihood = chances;
      antToSet.complete = true;
      const sortedAnts = sortAnts([...otherAnts, antToSet]);
      setAnts(sortedAnts);
    }
  }, [ants, setAnts]);

  useEffect(() => {
    const isComplete = getCompleteStatus(ants);

    if (isComplete) {
      setRaceStatus(RaceStatus.finished);
    }
  }, [ants]);

  const onRestart = useCallback(() => {
    setRaceStatus(RaceStatus.notStarted);
    const newAnts = getResetAnts(ants);
    setAnts([]);
    // TODO: determine why the flat list is not updating if I setAnts with the new array
    setTimeout(() => {
      setAnts(newAnts);
    }, 1);
  }, [setRaceStatus, setShouldFetchAnts, setAnts, ants]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Race status: {raceStatus}</Text>
      {fetching ? <Text>Getting Ants...</Text> : null}
      {error ? <Text>{error.message}</Text> : null}
      <FlatList
        data={ants}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        style={styles.listStyle}
      />
      {!shouldFetchAnts && raceStatus === RaceStatus.notStarted ? <Button
        title={'Get Ants!'}
        disabled={!!error || fetching}
        onPress={onFetchAnts}
      /> : null}
      {shouldFetchAnts && raceStatus === RaceStatus.notStarted ? <Button
        title={'Start the Race!'}
        disabled={!!error || fetching}
        onPress={onStartRace}
      /> : null}
      {raceStatus === RaceStatus.finished ? <Button
        title={'Restart'}
        disabled={!!error || fetching}
        onPress={onRestart}
      /> : null}
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {
    width: '90%'
  },
  title: {
    fontSize: 24
  }
});


