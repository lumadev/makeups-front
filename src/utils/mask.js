/**
 * Apply mask for symbols ".", "-", "/", "(", ")", " "
 * 
 * applyMask('###.###.###-##', document)
 * applyMask('(##) ########', phoneWithoutMask)
 */
function applyMask (mask, value) {
  let posStr = 0
  let str = ''

  const containSymbols = (char) => {
    const chars = ['.', '-', '/', '(', ')', ' ', ':']
    for (let i = 0; i < chars.length; i++) {
      if (char === chars[i]) {
        return true
      }
    }
    return false
  }
  for (let pos = 0; pos < mask.length; pos++) {
    const charMask = mask.charAt(pos)

    if (containSymbols(charMask)) {
      str = str.concat(charMask)
    } else {
      const charStr = value.charAt(posStr)
      str = str.concat(charStr)
      posStr++
    }
  }
  return str
}

export { applyMask }