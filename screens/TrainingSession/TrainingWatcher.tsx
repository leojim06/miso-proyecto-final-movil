import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Block, Button, Text } from '../../components';
import { useTheme } from '../../hooks';
import { useTimer } from '../../hooks/useTimer';

export default function TrainingWatcher() {
    const { start, stop, time, isRunning } = useTimer();
    const { assets, sizes } = useTheme();

    // useEffect(() => start(), []);

    return (
        <Block flex={1} center align="center" paddingTop={130} padding={sizes.padding}>
            <Text h1>{time}</Text>
            <Block>
                <Button
                    onPress={() => {
                        isRunning ? stop() : start();
                    }}
                >
                    {isRunning ? (
                        <Image source={assets.error} />
                    ) : (
                        <Image source={assets.success} />
                    )}
                </Button>
                <Block justify="flex-end" paddingBottom={sizes.padding}>
                    <Button primary>
                        <Text white bold transform="uppercase">
                            Finalizar sesión
                        </Text>
                    </Button>
                </Block>
            </Block>
        </Block>
    );
}
