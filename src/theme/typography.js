// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const primaryFont = 'Inter, sans-serif'; // Google Font
// const secondaryFont = 'CircularStd, sans-serif'; // Local Font

// ----------------------------------------------------------------------
const fontWeightRegular = 450;
const fontWeightMedium = 550;
const fontWeightSemiBold = 650;
const fontWeightBold = 700;

export const typography = {
  fontFamily: primaryFont,
  fontWeightRegular: fontWeightRegular,
  fontWeightMedium: fontWeightMedium,
  fontWeightSemiBold: fontWeightSemiBold,
  fontWeightBold: fontWeightBold,
  heading_lg: {
    fontWeight: fontWeightBold,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    //...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  heading_md: {
    fontWeight: fontWeightBold,
    lineHeight: 64 / 48,
    fontSize: pxToRem(24),
    //...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  heading_sm: {
    fontWeight: fontWeightBold,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    //...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  subtitle_bold: {
    fontWeight: fontWeightSemiBold,
    lineHeight: 1.5,
    fontSize: pxToRem(15),
  },
  subtitle_semibold: {
    fontWeight: fontWeightMedium,
    lineHeight: 1.5,
    fontSize: pxToRem(15),
  },
  body_sm: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(13),
    fontWeight: fontWeightRegular,
  },
  body_sm_medium: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(13),
    fontWeight: fontWeightMedium,
  },
  body_sm_semibold: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(12),
    fontWeight: fontWeightSemiBold,
  },
  body_md: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(12),
    fontWeight: fontWeightRegular,
  },
  body_md_medium: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(12),
    fontWeight: fontWeightMedium,
  },
  body_md_semibold: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(13),
    fontWeight: fontWeightSemiBold,
  },
  body_lg: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(14),
    fontWeight: fontWeightRegular,
  },
  body_lg_medium: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(14),
    fontWeight: fontWeightMedium,
  },
  body_lg_semibold: {
    lineHeight: pxToRem(20),
    fontSize: pxToRem(14),
    fontWeight: fontWeightSemiBold,
  },
  caption_semibold: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontWeight: fontWeightSemiBold,
  },
  button: {
    textTransform: 'unset',
  },
};
