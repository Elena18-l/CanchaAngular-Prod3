import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';
import TeamScreen from "../screens/Team";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export function Layout() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <TeamScreen></TeamScreen>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#457854',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });