const backGroundColor = {
    light: '#fff',
    dark: '#444',
}
const textColor = {
    light: '#0E1317',
    dark: '#FAEBD7',
}
const iconColor = {
    light: '#0E1317',
    dark: 'white',
}
const phoneNoColor = {
    light: '#424e9c',
    dark: '#ADD8E6',
}
const bottomBorderColor = {
    light: '#f1f0f5',
    dark: '#444',
}
const subHeaderButton = {
    light: '#f1f0f5',
    dark: '#444',
}

const dayButton = {
    light: '#f1f0f5',
    dark: '#696969',
}
export const colors = {
    background: backGroundColor.light,
    textColor: textColor.light,
    iconColor: iconColor.light,
    phoneNoColor: phoneNoColor.light,
    bottomBorderColor: bottomBorderColor.light,
    subHeaderButton: subHeaderButton.light,
    dayButton: dayButton.light,
    // buttonPrimaryBg: palette.palette02,
    // headingText: palette.palette01,
}
export const themedColors = {
    default: {
        ...colors,
    },
    light: {
        ...colors,
    },

    dark: {
        ...colors,
        background: backGroundColor.dark,
        textColor: textColor.dark,
        iconColor: iconColor.dark,
        phoneNoColor: phoneNoColor.dark,
        bottomBorderColor: bottomBorderColor.dark,
        subHeaderButton: subHeaderButton.dark,
        dayButton: dayButton.dark,
        //   paragraphText: palette.palette02,
    },
}
