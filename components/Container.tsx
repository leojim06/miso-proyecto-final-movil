import { useTheme } from "../hooks";
import { Platform, StyleSheet, ViewStyle, View, SafeAreaView } from 'react-native'
import React from "react";

const Container = (props) => {
    const {
        id = 'Container',
        children,
        safe,
        style,
        margin,
        marginBottom,
        marginTop,
        marginHorizontal,
        marginVertical,
        marginRight,
        marginLeft,
        padding,
        paddingBottom,
        paddingTop,
        paddingHorizontal,
        paddingVertical,
        paddingRight,
        paddingLeft,
        shadow,
        radius,
        height,
        width,
        overflow,
        flex = 1,
        row,
        align,
        center,
        justify,
        wrap,
        primary,
        secondary,
        tertiary,
        color,
        outlined,
        position,
        right,
        left,
        top,
        bottom,
        ...rest
    } = props;

    const { colors, sizes } = useTheme();

    const colorIndex = primary
        ? 'primary'
        : secondary
            ? 'secondary'
            : tertiary
                ? 'tertiary'
                : null;

    const blockColor = color
        ? color
        : colorIndex
            ? colors?.[colorIndex]
            : undefined;

    const blockStyles = StyleSheet.flatten([
        style,
        {
            ...(shadow && {
                shadowColor: colors.shadow,
                shadowOffset: {
                    width: sizes.shadowOffsetWidth,
                    height: sizes.shadowOffsetHeight,
                },
                shadowOpacity: sizes.shadowOpacity,
                shadowRadius: sizes.shadowRadius,
                elevation: sizes.elevation,
            }),
            ...(margin !== undefined && { margin }),
            ...(marginBottom && { marginBottom }),
            ...(marginTop && { marginTop }),
            ...(marginHorizontal && { marginHorizontal }),
            ...(marginVertical && { marginVertical }),
            ...(marginRight && { marginRight }),
            ...(marginLeft && { marginLeft }),
            ...(padding !== undefined && { padding }),
            ...(paddingBottom && { paddingBottom }),
            ...(paddingTop && { paddingTop }),
            ...(paddingHorizontal && { paddingHorizontal }),
            ...(paddingVertical && { paddingVertical }),
            ...(paddingRight && { paddingRight }),
            ...(paddingLeft && { paddingLeft }),
            ...(radius && { borderRadius: radius }),
            ...(height && { height }),
            ...(width && { width }),
            ...(overflow && { overflow }),
            ...(flex !== undefined && { flex }),
            ...(row && { flexDirection: 'row' }),
            ...(align && { alignItems: align }),
            ...(center && { justifyContent: 'center' }),
            ...(justify && { justifyContent: justify }),
            ...(wrap && { flexWrap: wrap }),
            ...(blockColor && { backgroundColor: blockColor }),
            ...(outlined && {
                borderWidth: 1,
                borderColor: blockColor,
                backgroundColor: 'transparent',
            }),
            ...(position && { position }),
            ...(right !== undefined && { right }),
            ...(left !== undefined && { left }),
            ...(top !== undefined && { top }),
            ...(bottom !== undefined && { bottom }),
        }
    ]) as ViewStyle;

    // generate component testID or accessibilityLabel based on Platform.OS
    const blockID = Platform.OS === 'android' ? { accessibilityLabel: id } : { testID: id };

    if (safe) {
        return (
            <SafeAreaView {...blockID} {...rest} style={blockStyles}>
                {children}
            </SafeAreaView>
        );
    }

    return (
        <View {...blockID} {...rest} style={blockStyles}>
            {children}
        </View>
    )
}

export default Container;