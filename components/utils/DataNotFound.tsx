import React from 'react';
import { Block, Text } from '../';

const DataNotFound = ({ title, message }: { title: string; message?: string }) => {
    return (
        <Block card tertiary>
            <Text h5 bold>
                {title}
            </Text>
            {message && <Text p>{message}</Text>}
        </Block>
    );
};

export default DataNotFound;
