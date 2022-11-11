import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Block, Button, Text } from '../../components';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import {
    TrainingDetailScreenRouteProop,
    TrainingSessionScreenNavigationProp,
} from '../../navigation/types/trainingSessionStackNavigatorParamList';
import usePlansEndpoint from '../../services/api/usePlansEndpoint';

export interface ITrainingSessionDetailProps {
    id: string;
    name?: string;
    description?: string;
    duration?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    week?: number;
    day?: number;
}

export default function TrainingDetailScreen() {
    // hooks for screen
    const [trainingDetail, setTrainingDetail] = useState<ITrainingSessionDetailProps>();
    const [error, setError] = useState<string>();

    // hooks from app
    const navigation = useNavigation<TrainingSessionScreenNavigationProp>();
    const route = useRoute<TrainingDetailScreenRouteProop>();
    const { trainingId, day } = route.params;
    const { sizes } = useTheme();
    const { handleLoading } = useData();
    const { loadTrainingDetail } = usePlansEndpoint();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        setTrainingDetail(undefined);
        handleLoading(true);

        loadTrainingDetail(trainingId, day, true)
            .then((data: ITrainingSessionDetailProps) => setTrainingDetail(data))
            .catch((error: string) => setError(error))
            .finally(() => handleLoading(false));
    }, []);

    return (
        <>
            {!trainingDetail ? null : (
                <Block padding={sizes.padding}>
                    {/* title */}
                    <Block flex={0} align="center">
                        <Text h3 center>
                            {t('training.detail.label.day', { day: trainingDetail?.day })} -{' '}
                            {i18n.toTime('date.formats.short', Date.now())}
                        </Text>
                    </Block>
                    {/* subtitle */}
                    <Block flex={0} align="center">
                        <Text h4 primary>
                            {trainingDetail?.name}
                        </Text>
                    </Block>
                    {/* content */}
                    <Block flex={0}>
                        <Text p>{trainingDetail?.description}</Text>
                        <IconRow
                            name="clock-o"
                            text={t('training.detail.label.duration', {
                                duration: trainingDetail?.duration,
                            })}
                        />
                        <IconRow name="wifi" text={trainingDetail?.level} />
                    </Block>
                    {/* Button */}
                    <Block flex={0} paddingVertical={sizes.padding}>
                        <Button
                            primary
                            onPress={() => {
                                navigation.navigate('TrainingWatcher', {
                                    session: trainingDetail,
                                });
                            }}
                        >
                            <Text
                                white
                                bold
                                transform="uppercase"
                                paddingHorizontal={sizes.padding}
                            >
                                {t('training.detail.btn.start')}
                            </Text>
                        </Button>
                    </Block>
                </Block>
            )}
        </>
    );
}
