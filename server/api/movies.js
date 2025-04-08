export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const query = getQuery(event)
    const { s, i } = query
  
    const apiKey = config.apiSecret
    if (!apiKey) {
      throw createError({ statusCode: 500, message: 'API key not set' })
    }
  
    let url = ''
  
    if (s) {
      url = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=${apiKey}`
    } else if (i) {
      url = `https://www.omdbapi.com/?i=${encodeURIComponent(i)}&apikey=${apiKey}`
    } else {
      throw createError({ statusCode: 400, message: 'Missing query parameter: s or i' })
    }
  
    const res = await fetch(url)
    const data = await res.json()
  
    if (data.Error) {
      throw createError({ statusCode: 404, message: data.Error })
    }
  
    return data
  })
  