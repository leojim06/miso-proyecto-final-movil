import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/style/styles';
import { Block, Text, Image } from '../../components';
import CustomModal, { ICustomPanel } from '../../components/modals/CustomModal';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import { SportProfileScreenNavigationProp } from '../../navigation/types/progressEventStackNavigatorParamList';
import useUserEndpoint from '../../services/api/useUserEndpoint';

export interface ISportProfile {
    id: string;
    foto?: string;
    nombre?: string;
    edad?: number;
    sexo?: string;
    peso?: number;
    estatura?: number;
    vo2max?: number;
}

export default function SportProfileScreen() {
    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [sportProfileDetail, setSportProfileDetail] = useState<ISportProfile>();

    // hooks from app
    const navigation = useNavigation<SportProfileScreenNavigationProp>();
    const { t } = useTranslation();
    const { sizes, assets } = useTheme();
    const { user, handleLoading } = useData();
    const { loadSportProfile } = useUserEndpoint();

    useEffect(() => {
        setSportProfileDetail(undefined);
        handleLoading(true);

        loadSportProfile(user.userId, true)
            .then((data: ISportProfile) => setSportProfileDetail(data))
            .catch((error: string) => {
                setModal({
                    isVisible: true,
                    title: t('sportProfile.modal.errorTitle'),
                    message: error,
                    type: 'error',
                    confirmButtonTitle: t('sportProfile.modal.errorButton'),
                    onConfirmPress: () => {
                        setModal({ ...modal, isVisible: false });
                        navigation.pop();
                    },
                });
            })
            .finally(() => handleLoading(false));
    }, []);

    return (
        <>
            <CustomModal {...modal} />
            {!sportProfileDetail ? null : (
                <Block safe padding={sizes.padding} flex={1}>
                    {/* tiele */}
                    <Block flex={0} align="center" paddingBottom={sizes.s}>
                        <Text h3 center>
                            {t('sportProfile.label.title')}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block flex={1} align="center">
                        <Block
                            flex={0}
                            paddingVertical={sizes.padding}
                            style={styles.avatar_container}
                        >
                            {sportProfileDetail?.foto ? (
                                <Image
                                    source={{ uri: sportProfileDetail?.foto }}
                                    style={styles.avatar_background}
                                />
                            ) : (
                                <Image
                                    source={assets.avatarPlaceholder}
                                    style={styles.avatar_background}
                                />
                            )}
                        </Block>
                    </Block>
                    {/* Content */}
                    <Block>
                        <IconRow text={sportProfileDetail?.nombre} />
                        <IconRow
                            text={t('sportProfile.label.age', {
                                age: sportProfileDetail?.edad,
                            })}
                        />
                        <IconRow text={sportProfileDetail?.sexo} />
                        <IconRow
                            text={t('sportProfile.label.weight', {
                                weight: sportProfileDetail?.peso,
                            })}
                        />
                        <IconRow
                            text={t('sportProfile.label.height', {
                                height: sportProfileDetail?.estatura,
                            })}
                        />
                    </Block>
                </Block>
            )}
        </>
    );
}
