  const pricePrint = {
    nonePrint: 0,
    SRA3_colorOneSided: 0.12,
    SRA3_colorAndBlack: 0.192,
    SRA3_colorAndColor: 0.24,
    SRA3_blackOneSided: 0.072,
    SRA3_blackAndBlack: 0.144,
    SRA3_blackOneSidedBlack: 0.02,
    SRA3_blackDubleSideBlack: 0.04,
    A4_blackOneSide: 0.01,
    A4_blackDubleSide: 0.02
  }
  
  const inner = new Object(pricePrint)
  const cover = new Object(pricePrint)

  export const printingCost = {
    inner,
    cover
}