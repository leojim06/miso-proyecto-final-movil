import React from 'react';
import { useTheme } from '../../hooks';
import Text from '../Text';
import ModalPanel from './ModalPanel';

export type InfoModalProps = {
    isVisible: boolean;
    text?: string;
    onCloseModal?: () => void;
};

const InformationModal = (props: InfoModalProps) => {
    const { colors } = useTheme();
    const { isVisible, text, onCloseModal } = props;

    return (
        <ModalPanel visible={isVisible} closeModal={onCloseModal}>
            <Text h5 color={colors.danger}>
                {text}
            </Text>
        </ModalPanel>
    );
};

export default InformationModal;
