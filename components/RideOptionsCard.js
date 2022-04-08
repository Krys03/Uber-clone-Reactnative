import { StyleSheet, Text, View , FlatList, Image, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements"; 
import { useNavigation } from '@react-navigation/native';
import { selectDestination, selectTravelTimeInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const data = [
    {
    id:
    "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
    },
    {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8"
     },
    {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_RATE = 1.5; 

const RideOptionsCard = () => {

    const navigation = useNavigation(); 
    const [selected,setSelected] = useState(null);
    const TravelTimeInformation = useSelector(selectTravelTimeInformation);



  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <TouchableOpacity
        onPress={() => navigation.navigate("NavigateCard")}
        style={tw`absolute  top-3 left-5 z-50 p-3 rounded-full `}>
        <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>

        <Text style={tw` absolute text-center pl-24 pt-5  text-xl`}>Select a Ride - {TravelTimeInformation?.distance?.text}</Text>
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: {id, title, multiplier, image}, item}) => (

            <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
                <Image 
                   style={{
                       width: 80,
                       height: 80, 
                       resizeMode: "contain",
                   }}
                   source={{uri: image}}
                />
                <View style={tw`-ml-6`}>
                    <Text style={tw`text-lg font-semibold`}>{title}</Text>
                    <Text>{TravelTimeInformation?.duration?.text}</Text>
                    
                </View>
                <Text style={tw`text-lg`}>
                        {new Intl.NumberFormat('en-gb', {
                            style: 'currency',
                            currency: 'GBP'

                        }).format(
                            (TravelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100

                        )}


                </Text>

            </TouchableOpacity>

        )}
        
        />
        <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity
             disabled={!selected}
             style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>
</SafeAreaView>
  );
};

export default RideOptionsCard

const styles = StyleSheet.create({})