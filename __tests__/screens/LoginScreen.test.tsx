import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../../screens/LoginScreen';

describe('<LoginScreen />', () => {
    it('renders without crashing', () => {
        shallow(<LoginScreen />);
    });

    it('has 2 child', () => {
        const tree: any = renderer.create(<LoginScreen />).toJSON();
        expect(tree?.children?.length).toBe(2);
    });

    //   it('renders correctly', () => {
    //     const tree = renderer.create(<AppTest />).toJSON();
    //     expect(tree).toMatchSnapshot();
    //   });
});
