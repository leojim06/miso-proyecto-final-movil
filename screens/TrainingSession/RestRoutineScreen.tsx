import React from 'react';
import { Block, Text } from '../../components';
import { useTheme, useTranslation } from '../../hooks';

export default function RestRoutineScreen() {
    // hooks for screen
    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();

    return (
        <Block safe padding={sizes.padding}>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center>
                    {t('restRoutine.label.title')}
                </Text>
            </Block>
        </Block>
    );
}
