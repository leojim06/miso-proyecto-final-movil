import React from 'react'
import { Text } from 'react-native'
// import { TitleText18 } from '../../StyledText'
// import ModalPanel from '../ModalPopupPanel/ModalPanel'
import CustomInfoOption from './CustomInfoOption'
import ModalPanel from './ModalPanel'

export interface MoreOptionsPanelProps {
    visible: boolean,
    title: string,
    options: MoreOptionsProps[],
    onClosePanel(): void
}

export interface MoreOptionsProps {
    icon: JSX.Element,
    actionIcon: JSX.Element,
    text: string,
    show:boolean,
    onPress: Function, // onPress(): void // callback: <T = unknown, R = unknown>(args?: T) => R;
}

const CustomMoreOptionsPopupPanel = (props: MoreOptionsPanelProps) => {
    return (
        <ModalPanel visible={props.visible} closeModal={() => props.onClosePanel()} >
            <Text style={{}}>{props.title}</Text>
            {
                props.options.map((item) => {
                    return (<CustomInfoOption key={item.text} item={item} />)
                })
            }
        </ModalPanel>
    )
}

export default CustomMoreOptionsPopupPanel
