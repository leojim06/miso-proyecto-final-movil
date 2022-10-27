import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../components';
import CustomInfoOption from '../components/modals/CustomInfoOption';
import CustomInfoPanel from '../components/modals/CustomInfoPanel';
import TrainigPlan, { TrainingPlanProps } from '../components/plans/TrainigPlan';
import { useTheme, useTranslation } from '../hooks';

const plans: TrainingPlanProps[] = [
    {
        id: 1,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Beginner',
        duration: 10,
    },
    {
        id: 2,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Intermediate',
        duration: 10,
    },
    {
        id: 3,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Advanced',
        duration: 10,
    },
];

const plansNotFound: TrainingPlanProps[] = [];

export default function PlansScreen() {
    const [myPlans, setMyPlans] = useState(plansNotFound);
    const [isMyPlansLoading, setIsMyPlansLoading] = useState<boolean>(false);
    const [mySuggestedPlans, setMySuggestedPlans] = useState(plansNotFound);
    const [isMySuggestedPlansLoading, setIsMySuggestedPlansLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const { sizes } = useTheme();

    useEffect(() => {
        // try {
        // } catch (error) {
        //     setError(error);
        //     setModal(true);
        // } finally {
        //     handleLoading(false);
        // }
    }, []);

    return (
        <Block safe flex={1} margin={sizes.margin}>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3>{t('plans.label.title')}</Text>
            </Block>
            <Block flex={1} marginBottom={sizes.xl}>
                <Text h4>{t('plans.label.myPlans')}</Text>
                <FlatList
                    data={myPlans}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <TrainigPlan {...item} />}
                    ListEmptyComponent={
                        isMyPlansLoading ? (
                            <Text>Cargando</Text>
                        ) : (
                            <Text>{t('plans.warning.myPlansNotFound')}</Text>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
            <Block flex={1}>
                <Text h4>{t('plans.label.suggestedPlans')}</Text>
                <FlatList
                    data={mySuggestedPlans}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <TrainigPlan {...item} />}
                    ListEmptyComponent={
                        isMySuggestedPlansLoading ? (
                            <Text>Cargando</Text>
                        ) : (
                            <Text>{t('plans.warning.mySuggestedPlansNotFound')}</Text>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
            <CustomInfoPanel
                isVisible={false}
                type="warn"
                title={'Cierre de sesión'}
                confirmButtonTitle={'ACEPTAR'}
                onConfirPress={() => {
                    // showSpinner();
                }}
                cancelButtonTitle={'CANCELAR'}
                onCancelPress={() => {
                    // setShowErrorMessage(false);
                }}
                tempInfo={"temp info from screen"}
                message={'Ha seleccionado el cierre de sesión asdf  af as lsalaskdjlsdkfjslkfj asldfj asldf lasd lasdjf alsdkjf laskdjfl askdjf lksjd flkasjdf lkasjd flkajsdlf kjasdlfk jasldkfj a;lsdkf jasdjkf hn,asdjmn wkljur474as;lkf jalsdkjf alskjfalskdfj lasdkfj asldkj'}
            />
        </Block>
    );
}
