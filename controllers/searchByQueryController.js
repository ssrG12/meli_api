import axios from 'axios'

const setCategory = async (data) => {
  let idCategory
  let resultsByCategory = []
  for (const filters of data?.available_filters) {
    if (filters?.id === 'category') {
      for (const values of filters?.values) {
        resultsByCategory.push(values?.results)
        const maxResults = Math.max(...resultsByCategory)
        if (maxResults === values?.results) {
          idCategory = values?.id
        }
      }
    }
  }
  return idCategory
}

const setResults = async (data, category) => {
  let results = []
  for (const iterator of data?.results) {
    if (iterator?.category_id === category) {
      results.push(iterator)
    }
  }
  if (results && results?.length > 0) {
    if (results?.length > 4) {
      return results.slice(0, 4)
    } else {
      return results
    }
  } else {
    return data.results.slice(0, 4)
  }
}

const createObjectToSend = async (items, categories) => {
  const object = {
    items,
    categories,
    author: {
      name: 'Santiago',
      lastname: 'Silva'
    }
  }
  return object
}

async function searchByQueryController(query) {
  const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=:${query}`)
  if (response?.data?.results && response?.data?.results?.length > 0) {
    const category = await setCategory(response?.data)
    const results = await setResults(response?.data, category)
    return { code: 200, message: 'Proceso exitoso', data: await createObjectToSend(results, response?.data?.available_filters) }
  } else {
    return { code: 200, message: 'No se encontraron resultados para tu búsqueda' }
  }
}

export default searchByQueryController