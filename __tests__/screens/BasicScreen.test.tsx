import React from 'react';
import renderer from 'react-test-renderer';

import BasicScreen from '../../screens/BasicScreen';

describe('<BasicScreen />', () => {
    it('has 1 child', () => {
        const tree: any = renderer.create(<BasicScreen />).toJSON();
        expect(tree?.children?.length).toBe(1);
    });
    it('App renders without crashing', () => {
        const rendered = renderer.create(<BasicScreen />).toJSON();
        expect(rendered).toBeTruthy();
    });
    it('App test against snapshot', () => {
        const tree = renderer.create(<BasicScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
