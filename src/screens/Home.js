import { ActivityIndicator, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyColors } from '../BaseComponents'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
    const nav = useNavigation()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getListSurah()
    }, [])

    async function getListSurah() {
        try {
            const response = await fetch('https://equran.id/api/surat')
            const result = await response.json()
            console.log(result);
            setData(result)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const ListSurah = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity key={index} style={styles.containerListSurah} onPress={() => {
                    nav.navigate('DetailSurah', { nomorSurah: item.nomor, namaSurah: item.nama_latin, artiSurah: item.arti, tempatTurun: item.tempat_turun, jumlahAyat: item.jumlah_ayat })
                }}>
                    <ImageBackground source={require('../assets/images/icons/number.png')} style={styles.containerNumber}>
                        <Text style={styles.txtNumber}>{item.nomor}</Text>
                    </ImageBackground>
                    {/* <View style={styles.containerNumber}>
                        <Text style={styles.txtNumber}>{item.nomor}</Text>
                    </View> */}
                    <View style={styles.containerDetailSurah}>
                        <View>
                            <Text style={styles.txtSurahName}>{item.nama_latin}</Text>
                            {item.tempat_turun === 'mekah' ? <Text style={styles.txtSurahAyat}>Makkiyah : {item.jumlah_ayat} ayat</Text> : <Text style={styles.txtSurahAyat}>Madaniyah : {item.jumlah_ayat} ayat</Text>}

                        </View>
                        <Text style={styles.txtSurahNameArabic}>{item.nama}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.txtApp}>MyQuran App</Text>
                <TouchableOpacity>
                    <Image source={require('../assets/images/icons/search.png')} />
                </TouchableOpacity>
            </View>
            <Text style={styles.txtWelcome}>Assalamualaikum</Text>
            <Text style={styles.txtName}>Muhammad Asrul</Text>
            <ImageBackground source={require('../assets/images/LastReadQuran.png')} style={styles.containerLastRead}>
                <View style={styles.containerTxtLastread}>
                    <Image source={require('../assets/images/icons/quran.png')} />
                    <Text style={styles.txtLastRead}>Last Read</Text>
                </View>
                <Text style={styles.txtSurahLastRead}>Al-Kahfi</Text>
                <Text style={styles.txtAyatLastRead}>Ayat : 110</Text>
            </ImageBackground>
            <Text style={styles.txtSurah}>Surah</Text>
            {isLoading ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color={MyColors.Purple} />
                    <Text style={{ color: MyColors.White, fontFamily: 'MSmb', marginTop: 24 }}>Loading....</Text>
                </View> :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={ListSurah}
                    keyExtractor={(item, idx) => idx.toString()}
                />
            }
        </View>
    )
}




const styles = StyleSheet.create({
    txtSurahNameArabic: {
        color: MyColors.Purple,
        fontFamily: 'MBold',
        fontSize: 20
    },
    txtSurahAyat: {
        color: MyColors.Gray,
        fontSize: 12,
        fontFamily: 'MMd',
        marginTop: 6
    },
    txtSurahName: {
        color: MyColors.White,
        fontFamily: 'MMd',
        fontSize: 18
    },
    containerDetailSurah: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 24,
        flex: 1,
        alignItems: 'center',
    },
    containerNumber: {
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // containerNumber: {
    //     height: 40,
    //     width: 40,
    //     borderRadius: 20,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderWidth: 2,
    //     borderColor: MyColors.Purple
    // },
    txtNumber: {
        color: MyColors.White,
        fontFamily: 'Mreg'
    },
    containerListSurah: {
        flexDirection: 'row',
        marginHorizontal: 24,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: MyColors.Gray,
        paddingVertical: 18
    },
    txtSurah: {
        color: MyColors.White,
        fontFamily: 'MSmb',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 8,
        marginHorizontal: 24
    },
    txtAyatLastRead: {
        color: MyColors.White,
        fontFamily: 'Mreg'
    },
    txtSurahLastRead: {
        color: MyColors.White,
        fontSize: 18,
        fontFamily: 'MSmb'
    },
    txtLastRead: {
        color: MyColors.White,
        marginLeft: 8,
        fontFamily: 'MMd'
    },
    containerTxtLastread: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'center'
    },
    containerLastRead: {
        marginHorizontal: 24,
        borderRadius: 12,
        overflow: 'hidden',
        padding: 20,
    },
    txtName: {
        marginBottom: 24,
        color: MyColors.White,
        fontFamily: 'MSmb',
        fontSize: 24,
        marginHorizontal: 24
    },
    txtWelcome: {
        color: MyColors.Gray,
        fontFamily: 'MMd',
        fontSize: 18,
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 6
    },
    txtApp: {
        color: MyColors.White,
        fontFamily: 'MBold',
        fontSize: 20
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 24,
        marginTop: 45
    },
    container: {
        backgroundColor: MyColors.Black,
        flex: 1,
    }
})