import { NavigationActions, StackActions, NavigationContainerComponent } from 'react-navigation';

let navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent): void {
    navigator = navigatorRef;
}

function navigate<P extends {}>(routeName: string, params?: P): void {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

function pop(numberToPop?: number): void {
    const action = StackActions.pop({ n: numberToPop });
    navigator.dispatch(action);
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    pop
};
