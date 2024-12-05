import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import DeviceInfo from "react-native-device-info";

function emojis () {
  if (nivelBateria <= 100 || nivelBateria >= 90) {
    return (
      <Image source={require="./img/100-90.png"} />
    )
  } else if (nivelBateria <= 80 || nivelBateria >= 70) {
    return (
      <Image source={require="./img/80-70.png"} />
    )
  } else if (nivelBateria <= 60 || nivelBateria >= 50) {
    return (
      <Image source={require="./img/60-50.png"} />
    )
  } else if (nivelBateria <= 40 || nivelBateria >= 30) {
    return (
      <Image source={require="./img/40-30.png"} />
    )
  } else if (nivelBateria == 20) {
    return (
      <Image source={require="./img/20.png"} />
    )
  } else {
    return (
      <Image source={require="./img/10.png"} />
    )
  }
}

export default function App() {
  const [nivelBateria, setNivelBateria] = useState(null);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await DeviceInfo.getBatteryLevel();
      setNivelBateria(Math.floor(level * 100));
    };

    const fetchChargingStatus = async () => {
      const isCharging = await DeviceInfo.isBatteryCharging();
      setChanging(isCharging);
    };

    fetchBatteryLevel();
    fetchChargingStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Nível da sua bateria 👉 {nivelBateria}</Text>
      <View>{emojis}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
