module.exports =  function exclude(obj : Object , keys : string[]) {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}