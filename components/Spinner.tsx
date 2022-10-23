import React from "react";
import { ActivityIndicator, StyleSheet, View, Modal } from "react-native";
import { useTheme } from "../hooks";

type spinnerProps = {
  isLoading: boolean;
};

const Spinner = (props: spinnerProps) => {
  const { colors } = useTheme();

  return (
    <Modal transparent={true} animationType={"fade"} visible={props.isLoading}>
      <View style={styles.spinnerContainer}>
        <View style={styles.spinnerContent}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            animating={props.isLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  spinnerContent: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default React.memo(Spinner);
