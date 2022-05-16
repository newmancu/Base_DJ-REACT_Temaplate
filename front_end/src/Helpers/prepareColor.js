import { convert } from "chromatism"

export function prepareHex(val) {
  const cval = val.slice(1)
  let sval = ''
  if (cval.length <= 4){
    for (let i=0; i < cval.length; ++i)
      sval += cval[i] + cval[i] 
    return '#' + sval
  }
  return val
}

export function getLighten(val) {
  const nval = prepareHex(val)
  const hsl_val = convert(nval).hsl
  if (hsl_val.l > 50)
    return '#000000'
  return '#ffffff'
}