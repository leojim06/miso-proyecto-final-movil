import React from 'react';
import { Block, Text } from '..';
import { useTheme } from '../../hooks';
import { IRestRoutine } from '../../screens/TrainingSession/RestRoutineScreen';

const RestRoutine = (props: IRestRoutine) => {
    // hooks from app
    const { colors } = useTheme();

    return (
        <Block color={colors.card}>
            <Text h5 bold></Text>
            <Text p semibold>
                {props.nombre}
            </Text>
        </Block>
    );
};

export default RestRoutine;
