import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Text, Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api';
import logoImg from '../../assets/logo.png'
import styles from './styles';

export default function Incidentes() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }
    function handleLogout() {
        navigation.navigate('Login');
    }
    async function loadInvidents() {
        if (loading) {
            return;
        }
        if (page > 0 && page === total) {
            return;
        }
        setLoading(true);
        await api.get('incidents', {
            params: { page }
        }).then(response => {
            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers['x-total-count'])
            setPage(page + 1);
            setLoading(false);
        }).catch(error => {
            Alert.alert(
                'Erro',
                `Ops...Algo deu errado. ${error.message}`,
                [{ text: 'OK', onPress: () => { } }],
                { cancelable: false }
            );
        });

    }
    useEffect(() => {
        loadInvidents();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
                    <Feather name="power" sise={12} color="#E02041" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList
                style={styles.incidentList}
                data={incidents}
                showsVerticalScrollIndicator={false}
                onEndReached={loadInvidents}
                onEndReachedThreshold={0.2}
                keyExtractor={incident => String(incident.id)}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
                        <TouchableOpacity style={styles.detailButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" sise={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    )
}
