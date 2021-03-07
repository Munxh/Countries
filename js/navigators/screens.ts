import { Animated, Easing } from 'react-native';

export enum Screens {
    StartScreen = 'StartScreen',
}



export const transitionConfig = () => {
    // @ts-ignore
    return {
        transitionSpec: {
            duration: 350,
            easing: Easing.out(Easing.poly(2)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        // @ts-ignore
        screenInterpolator: sceneProps => {
            const { position, layout, scene, index, scenes } = sceneProps;

            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const width = layout.initWidth;

            // We can access our navigation params on the scene's 'route' property
            var thisSceneParams = scene.route.params || {};

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0],
            });

            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
                outputRange: [0, 1, 1],
            });

            const scale = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [3, 1, 1],
            });

            const slideFromRight = { transform: [{ translateX }] };
            const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] };
            const slideInFromBottom = { transform: [{ translateY }] };

            if (thisSceneParams.plain) return slideFromRight;
            else if (index > 1 && index < 2) return slideFromRight;
            else return scaleWithOpacity
        },
    }
};
