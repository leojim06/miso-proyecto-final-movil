import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { TrainingSessionScreenNavigationProp } from '../../navigation/types/trainingSessionStackNavigatorParamList';
import { IDayTrainingSessionProps } from '../../screens/TrainingSession/TrainingSesion';
import Block from '../Block';
import Text from '../Text';

const DaySession = (props: IDayTrainingSessionProps) => {
    // hooks from app
    const navigation = useNavigation<TrainingSessionScreenNavigationProp>();
    const { sizes, colors } = useTheme();
    const { t } = useTranslation();

    const addTrainingDays = (days: number) => {
        var result = new Date();
        result.setDate(result.getDate() + days - 1);
        return result;
    };

    return (
        <Block
            card
            marginBottom={sizes.s}
            color={props.complete ? colors.success : props.active ? colors.tertiary : colors.light}
        >
            <TouchableOpacity
                disabled={!props.active}
                onPress={() =>
                    navigation.navigate('TrainingDetailScreen', {
                        trainingId: props.id,
                    })
                }
            >
                <Text semibold>
                    {t('plans.detail.label.day', { day: props.day }) +
                        ' ' +
                        addTrainingDays(props.day)}
                </Text>
                <Text p paddingLeft={sizes.sm}>
                    {props.exercise}
                </Text>
            </TouchableOpacity>
        </Block>
    );
};
export default DaySession;
