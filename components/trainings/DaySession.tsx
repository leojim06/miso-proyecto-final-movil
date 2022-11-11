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
            color={props.completo ? colors.success : props.activo ? colors.tertiary : colors.light}
        >
            <TouchableOpacity
                disabled={!props.activo}
                onPress={() =>
                    navigation.navigate('TrainingDetailScreen', {
                        trainingId: props.id,
                    })
                }
            >
                <Text semibold>
                    {t('plans.detail.label.day', { day: props.dia }) +
                        ' ' +
                        addTrainingDays(props.dia)}
                </Text>
                <Text p paddingLeft={sizes.sm}>
                    {props.ejercicio}
                </Text>
            </TouchableOpacity>
        </Block>
    );
};
export default DaySession;
