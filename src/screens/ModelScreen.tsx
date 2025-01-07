import Icon from "@/components/Icon"
import { colors } from "@/constants/colors"
import { MainStackParamList } from "@/navigations/stack/MainStackNavigator";
import { setBrand } from "@/store/modelSettingsSlice";
import { storage } from "@/utility/storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux";

const brands = [
    {
        id: 'openai',
        name: 'OpenAI',
        icon: require('@/assets/images/openai.png'),
        selected: false,
    },
];

export const ModelScreen = (props: any) => {
    const currentBrand = useSelector(state => state.modelSettings.brand);
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: "Model",
            headerShadowVisible: false,
            headerLeft: () => (
                <Icon.ChevronLeftIcon 
                    onPress={() => props.navigation.goBack()}
                />
            ),
            headerTitleAlign: "center"
        })
    }, [])
    const handleUpdateBrand = useCallback(async (id: string) => {
        try {
          await storage.set("brand", id);
          dispatch(setBrand(id));
        } catch (error) {
          console.log(error);
        }
      }, []);

    return (
        <ScrollView
            style={{flex: 1, backgroundColor: colors.light.background}}
            contentContainerStyle={{paddingBottom: 40}}
        >
            <View style={styles.container}>
            {brands.map((brand) => (
                <View
                    key={brand.id}
                    style={styles.brandItem}
                    onTouchEnd={() => { 
                            handleUpdateBrand(brand.id);
                            navigation.navigate("OpenAISettings");
                        }
                    }
                >
                    <View style={styles.leftContent}>
                        <Image 
                            source={brand.icon}
                            style={styles.icon}
                        />
                        <Text style={styles.brandName}>{brand.name}</Text>
                    </View>
                    <View style={[
                        styles.radioButton,
                        currentBrand === brand.id && styles.radioButtonSelected
                    ]}
                    >
                        {currentBrand === brand.id && <View style={styles.radioButtonInner} />}
                    </View>
                </View>
            ))}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        overflow: 'hidden',
        justifyContent: "center"
    },
    brandItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginVertical: 10,
        borderRadius: 13,
        backgroundColor: colors.light.surface,
        borderColor: "#E0E0E0",
        borderWidth: 1,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    brandName: {
        fontSize: 16,
        fontWeight: '500',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: '#00C853',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#00C853',
    },
});