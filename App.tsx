import React, { Component } from 'react';
import { ReduxState } from './js/reducers';
import { Store } from 'redux';
import configureStore from './js/configureStore';
import { Provider } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { transitionConfig } from './js/navigators/screens';
import { createAppContainer, NavigationContainerComponent } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NavigationService from './js/navigators/NavigationService';
import { StartScreen } from './js/components/StartScreen';

const RootNavigator = createAppContainer(createStackNavigator(
    {
        StartScreen: {
            screen: StartScreen,
        },
    },
    {
        initialRouteName: 'StartScreen',
        headerMode:
            'none',
        cardStyle:
            {
                backgroundColor: Colors.white,
            }
        ,
        mode: 'modal',
        transitionConfig,
    },
));


class App extends Component<{}> {


    store: Store<ReduxState>;

    constructor(props: {}) {
        super(props);
        // @ts-ignore
        this.store = configureStore();
    }


    navigationServiceRefSet = (navigator: NavigationContainerComponent) => {
        NavigationService.setTopLevelNavigator(navigator);
    };

    render() {
        return (
            <>
                <Provider store={this.store}>
                    <RootNavigator ref={this.navigationServiceRefSet}/>
                </Provider>
            </>
        );
    }
}

// @ts-ignore
export default App;
