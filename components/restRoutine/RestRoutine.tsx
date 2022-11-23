import React from 'react';
import { Block, Text } from '..';
import { useTheme } from '../../hooks';
import { IRestRoutine } from '../../screens/TrainingSession/RestRoutineScreen';

const RestRoutine = (props: IRestRoutine) => {
    // hooks from app
    const { colors, sizes } = useTheme();

    return (
        <Block marginBottom={sizes.sm} padding={sizes.padding} card>
            <Text h5 bold>
                {props.nombre}
            </Text>
            <Text p>{props.descripcion}</Text>
        </Block>
    );
};

export default RestRoutine;
