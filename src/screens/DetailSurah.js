import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyColors } from '../BaseComponents'
import { useNavigation, useRoute } from '@react-navigation/native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'

export default function DetailSurah() {

    const nav = useNavigation()
    const route = useRoute()
    const { nomorSurah, namaSurah, artiSurah, tempatTurun, jumlahAyat } = route.params
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const playerState = usePlaybackState();

    useEffect(() => {
        console.log(nomorSurah);
        init()
    }, [])

    useEffect(() => {
        if (playerState.state != State.Ended) {
            setIsPlaying(true)
            // TrackPlayer.pause();
        }
        else {
            setIsPlaying(false)
            // TrackPlayer.play();
        }
        console.log(playerState.state);
    }, [playerState])

    const ListAyat = ({ item, index }) => {
        return (
            <View key={index} style={styles.containerDetailAyat} >
                <View style={styles.containerIcon}>
                    <View style={styles.containerNumber}>
                        <Text style={styles.txtNumber}>{item.nomorAyat}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onPlayAyah(item)}>
                        {isPlaying && item.isPlayingAyat ?
                            <Image source={require('../assets/images/icons/pause.png')} />
                            :
                            <Image source={require('../assets/images/icons/play.png')} />
                        }
                    </TouchableOpacity>
                </View>
                {isPlaying && item.isPlayingAyat ?
                    <View style={styles.containerAyat}>
                        <Text style={styles.txtAyatArabicPlaying}>{item.teksArab}</Text>
                        <Text style={styles.txtTranslatePlaying}>{item.teksIndonesia}</Text>
                    </View>
                    :
                    <View style={styles.containerAyat}>
                        <Text style={styles.txtAyatArabic}>{item.teksArab}</Text>
                        <Text style={styles.txtTranslate}>{item.teksIndonesia}</Text>
                    </View>
                }
            </View>
        );
    };





    async function init() {
        getDetailSurah()
        // await TrackPlayer.setupPlayer()
    }

    // async function onPlayAyah(item) {
    //     await TrackPlayer.stop()
    //     console.log(item.audio['01']);
    //     await TrackPlayer.load({
    //         url: item.audio['05']
    //     })

    //     await TrackPlayer.play()
    // }

    async function onPlayAyah(item) {
        // Hentikan pemutaran semua lagu
        await TrackPlayer.stop();

        // Memuat lagu yang dipilih
        await TrackPlayer.load({
            url: item.audio['05']
        });

        // Mulai pemutaran
        await TrackPlayer.play();

        // Mengatur status pemutaran untuk setiap item
        const updatedData = data.map(dataItem => ({
            ...dataItem,
            isPlayingAyat: dataItem === item // Menandai item yang sedang diputar
        }));
        setData(updatedData);
    }


    async function getDetailSurah() {
        try {
            const response = await fetch(`https://equran.id/api/v2/surat/${nomorSurah}`)
            const result = await response.json()
            console.log('Result : ', result.data.ayat[0].teksArab);
            setData(result.data.ayat)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { nav.goBack() }}>
                        <Image source={require('../assets/images/icons/arrow-left.png')} />
                    </TouchableOpacity>
                    <Text style={styles.txtSurahName}>{namaSurah}</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('../assets/images/icons/search.png')} />
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={{ backgroundColor: MyColors.Purple, padding: 20 }} onPress={getDetailSurah}>
                <Text>Kok Gamunculk</Text>
            </TouchableOpacity> */}
            <ImageBackground source={require('../assets/images/DetailSurah.png')} style={styles.imgDetailSurah}>
                <View style={styles.containerSurahName}>
                    <Text style={styles.txtSurahDetailName}>{namaSurah}</Text>
                    <Text style={styles.txtSurahDetailArti}>{artiSurah}</Text>
                </View>
                <Text style={styles.txtSurahDetailAyat} >{tempatTurun} : {jumlahAyat} Ayat</Text>
                <Image source={require('../assets/images/Basmalah.png')} />
            </ImageBackground>
            {loading ?
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator size="large" color={MyColors.Purple} />
                    <Text style={{ color: MyColors.White, fontFamily: 'MSmb', marginTop: 24 }}>Loading....</Text>
                </View>
                :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={ListAyat}
                    keyExtractor={(item) => item.nomorAyat.toString()}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    txtTranslatePlaying: {
        fontFamily: 'MSmb',
        color: MyColors.White
    },
    txtAyatArabicPlaying: {
        fontFamily: 'MBold',
        color: MyColors.Purple,
        fontSize: 18,
        marginTop: 24,
        marginBottom: 16
    },
    txtTranslate: {
        fontFamily: 'MReg',
        color: MyColors.Gray
    },
    txtAyatArabic: {
        fontFamily: 'Amiri',
        color: MyColors.White,
        fontSize: 18,
        marginTop: 24,
        marginBottom: 16
    },
    txtNumber: {
        color: MyColors.White,
    },
    containerNumber: {
        height: 30,
        width: 30,
        backgroundColor: MyColors.Purple,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: MyColors.DarkGray,
        borderRadius: 12,
        padding: 12
    },
    containerDetailAyat: {
        marginHorizontal: 24,
        paddingVertical: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: MyColors.Gray
    },
    txtSurahDetailAyat: {
        color: MyColors.White,
        fontFamily: 'MMd',
        fontSize: 14,
        marginTop: 16,
        marginBottom: 32
    },
    txtSurahDetailArti: {
        color: MyColors.White,
        fontFamily: 'MMd',
        fontSize: 16,
        marginTop: 8
    },
    txtSurahDetailName: {
        color: MyColors.White,
        fontFamily: 'MMd',
        fontSize: 26
    },
    containerSurahName: {
        width: '80%',
        borderBottomWidth: 0.5,
        borderBottomColor: MyColors.White,
        paddingBottom: 16,
        alignItems: 'center'
    },
    imgDetailSurah: {
        margin: 24,
        borderRadius: 12,
        overflow: 'hidden',
        paddingVertical: 24,
        paddingHorizontal: 56,
        alignItems: 'center',
    },
    txtSurahName: {
        color: MyColors.White,
        fontFamily: 'MBold',
        fontSize: 20,
        marginLeft: 24
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