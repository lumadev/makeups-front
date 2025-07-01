/**
 * Apply mask for symbols ".", "-", "/", "(", ")", " "
 * 
 * applyMaskPhone('###.###.###-##', document)
 * applyMaskPhone('(##) ########', phoneWithoutMask)
 */
function applyMaskPhone(mask, value) {
  if (!value) return ''

  let masked = ''
  let digitIndex = 0

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i]

    if (maskChar === '9') {
      const digit = value[digitIndex]
      if (!digit) break 

      masked += digit
      digitIndex++
    } else {
      if (digitIndex < value.length) {
        masked += maskChar 
      } else {
        break
      }
    }
  }

  return masked
}

export { applyMaskPhone }