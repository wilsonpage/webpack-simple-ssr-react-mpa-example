
const getFakeData = async () => {
  return {
    name: 'Wilson',
  }
}

module.exports = async (req) => {
  return await getFakeData()
}
