import axios from 'axios'

const createObjectToSend = async (product, description) => {
  let condition
  for (const iterator of product.attributes) {
    if (iterator?.id === 'ITEM_CONDITION') {
      condition = iterator?.value_name
    }
  }
  const object = {
    item: {
      id: product?.id,
      title: product?.title,
      price: {
        currency: product?.currency_id,
        amount: product?.price,
        decimals: product?.decimals,
      },
      picture: product?.pictures[0]?.url,
      condition: condition,
      free_shipping: product?.shipping?.free_shipping,
      sold_quantity: product?.sold_quantity,
      description: description?.plain_text
    },
    author: {
      name: 'Santiago',
      lastname: 'Silva'
    }
  }
  return object
}

async function detailProductController(id) {
  const response = await axios.get(`https://api.mercadolibre.com/items/${id}`)
  const description = await axios.get(`https://api.mercadolibre.com/items/${id}/description`)
  if (response?.data) {
    return { code: 200, message: 'Proceso exitoso', data: await createObjectToSend(response?.data, description?.data) }
  } else {
    return { code: 200, message: 'No se encontraron resultados para tu búsqueda' }
  }
}

export default detailProductController