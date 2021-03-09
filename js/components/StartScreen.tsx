import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../reducers';
import { getCountries } from '../actions/countriesAction';

export const StartScreen = () => {

    const { countries } = useSelector((state: ReduxState) => state.countriesReducer);
    const [showCountries, setShowCountries] = useState<boolean>(false);
    const [showLanguages, setShowLanguages] = useState<boolean>(false);
    const [smallestCountry, setSmallestCountry] = useState<string>('');
    const [biggestCountry, setBiggestCountry] = useState<string>('');
    const [languagesState, setLanguagesState] = useState<Map<string, string[]>>(new Map());
    const [averagePopulation, setAveragePopulation] = useState<string>('');

    const dispatch = useDispatch();


    const renderCountries = () => {
        if (!countries) {
            return <></>
        } else {
            // @ts-ignore
            return (countries?.map((country, index) => { //this could easily be a functional component
                    return (
                        <View style={styles.card} key={index + country.population}>
                            <Text style={styles.header}>
                                {country.name}
                            </Text>
                            <Text>
                                Region: {country.region}
                            </Text>
                            <Text>
                                Area: {country.area}
                            </Text>
                            <Text>
                                Population: {(country.population / 1000000).toFixed(1)}
                            </Text>
                        </View>)
                },
            ));

        }
    }

    const renderLanguages = () => {
        if (languagesState == undefined) {
            return <></>
        } else {
            const objectsToRender = []; //since we cant return values from the for loop directly, we collect them in this array
            for (const [key, value] of languagesState.entries()) { //looping through each entry of the map
                objectsToRender.push(
                    <View style={styles.card} key={key}>
                        <Text style={styles.header}>
                            {key}
                        </Text>
                        {value.map((language, index) => {
                                return (
                                    <Text key={index}>
                                        Spoken by: {language}
                                    </Text>
                                )
                            },
                        )}
                    </View>
                )
            }
           return objectsToRender;
        }
    }

    useEffect(() => {
        dispatch(getCountries()); //calling an action to get the countries from the api
    }, []);


    useEffect(() => {
        //using one for-loop to calculate everything, to improve the run time, tried to avoid using nested loops for better runtime
        var total = 0;
        var smallestCountry: string = '';
        var biggestCountry: string = '';
        var languages: Map<string, string[]> = new Map();
        if (countries != undefined) {
            var smallestCountryValue = countries[0].area;
            var biggestCountryValue = countries[0].area;
            var total = 0;
            // @ts-ignore
            countries?.map(country => {
                country.languages.map(language => {
                    if (languages.get(language.name) != undefined) {
                        // @ts-ignore
                        languages.set(language.name, [...languages.get(language.name), country.name]);
                    } else {
                        languages.set(language.name, [country.name])
                    }
                });
                // @ts-ignore
                if (smallestCountryValue > country.area) {
                    smallestCountry = country.name;
                    smallestCountryValue = country.area
                }
                // @ts-ignore
                if (biggestCountryValue < country.area) {
                    biggestCountry = country.name;
                    biggestCountryValue = country.area
                }
                total += country.population
            });

        }
        setLanguagesState(languages);
        setSmallestCountry(smallestCountry);
        setBiggestCountry(biggestCountry);
        // @ts-ignore
        setAveragePopulation(numberFormatted(Math.ceil(total / countries?.length)))
    }, [countries]);

    const hideCountries = () => {
        setShowCountries(showCountries => !showCountries);
    }
    const hideLanguages = () => {
        setShowLanguages(showLanguages => !showLanguages);
    }

    const numberFormatted = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    //to improve performance, we should not render all countries in a scrollview. We should set a limit to how many are loaded, and then load more dynamically
    return (
        <ScrollView style={styles.container}>
            {<Text style={styles.headerTop}>Population average: {'\n'}{averagePopulation}</Text>}
            {<Text style={styles.headerTop}>Smallest country: {'\n'}{smallestCountry}</Text>}
            {<Text style={styles.headerTop}>Largest country: {'\n'}{biggestCountry}</Text>}
            {countries &&
            <TouchableOpacity onPress={hideCountries}>
                <Text style={styles.headerTop}>
                    Countries {showCountries ? '↓' : '→'}
                </Text>
            </TouchableOpacity>}
            {showCountries && renderCountries()}
            <TouchableOpacity onPress={hideLanguages}>
                <Text style={styles.headerTop}>
                    Languages {showLanguages ? '↓' : '→'}
                </Text>
            </TouchableOpacity>
            {showLanguages && renderLanguages()}
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        height: 100,
        width: 300,
    },
    container: {
        marginTop: '10%',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerTop: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    card: {
        width: '90%',
        alignSelf: 'center',
        minHeight: 100,
        padding: 20,
        borderColor: 'black',
        borderWidth: 2,
        margin: 2,
        borderRadius: 10,
    },
});
