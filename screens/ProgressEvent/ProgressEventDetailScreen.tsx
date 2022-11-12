import React from 'react';
import { Block, Text } from '../../components';
import { useTheme, useTranslation } from '../../hooks';

export default function ProgressEventDetailScreen() {
    // hooks for screen

    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();

    return (
        <Block>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h4 center>
                    Details
                </Text>
            </Block>
            <Block flex={1} marginBottom={sizes.xl}>
                <Text>Eventos</Text>
            </Block>
        </Block>
    );
}
