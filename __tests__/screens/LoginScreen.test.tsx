// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../../screens/LoginScreen';

describe('<LoginScreen />', async () => {
    // expect(AsyncStorage.getItem).toBeCalledWith('isDark');
    it('has 2 child', () => {
        const tree: any = renderer.create(<LoginScreen />).toJSON();
        expect(tree?.children?.length).toBe(2);
    });
    it('App renders without crashing', () => {
        const rendered = renderer.create(<LoginScreen />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('App test against snapshot', () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

