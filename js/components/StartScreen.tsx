import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../reducers';
import { getCountries } from '../actions/countriesAction';

export const StartScreen = () => {

    const { countries } = useSelector((state: ReduxState) => state.countriesReducer);
    const [showCountries, setShowCountries] = useState<boolean>(false);
    const [smallestCountry, setSmallestCountry] = useState<string>('');
    const [biggestCountry, setBiggestCountry] = useState<string>('');
    const [averagePopulation, setAveragePopulation] = useState<string>('');

    const dispatch = useDispatch();


    const renderCountries = () => {
        if (!countries) {
            return <></>
        } else {
            // @ts-ignore
            return (countries?.map(country => { //this could easily be a functional component
                    return (
                        <View style={styles.card}>
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

    useEffect(() => {
        dispatch(getCountries()); //calling an action to get the countries from the api
    }, [countries]);


    useEffect(() => {
        //using one for-loop to calculate everything, to improve the run time
        var total = 0;
        var smallestCountry = '';
        var biggestCountry = '';
        if (countries != undefined) {
            var smallestCountryValue = countries[0].area;
            var biggestCountryValue = countries[0].area;
            var total = 0;
            // @ts-ignore
            countries?.map(country => {
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
        setSmallestCountry(smallestCountry);
        setBiggestCountry(biggestCountry);
        // @ts-ignore
        setAveragePopulation(numberFormatted(Math.ceil(total / countries?.length)))
    }, [countries]);

    const hideCountries = () => {
        setShowCountries(showCountries => !showCountries);
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
