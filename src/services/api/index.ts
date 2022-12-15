import asyncStorage from '@react-native-async-storage/async-storage'
import type { Shop, Servico } from './index.d'

const apiUrl = 'https://peat-api.onrender.com/'

export async function get<T>(endpoint: string, headers: HeadersInit = {}) {
  const request = await fetch(apiUrl + endpoint, {
    headers: { 'Content-Type': 'application/json', ...headers },
  })
  const data = (await request.json()) as T
  return data
}

export async function post<T>(endpoint: string, headers: HeadersInit = {}, body: object = {}) {
  try {
    const endpointFormatted = apiUrl + endpoint
    const bodyStringified = JSON.stringify(body)

    const request = await fetch(endpointFormatted, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: bodyStringified,
    })

    const contentType = request.headers.get('content-type')
    if (!contentType) throw new Error('Ocorreu um erro durante a requisição')

    if (contentType.indexOf('application/json') !== -1) {
      const data = (await request.json()) as T
      return { data, status: request.status }
    } else {
      const data = await request.text()
      return { data, status: request.status }
    }
  } catch (error) {
    console.log(error)
    throw new Error('Ocorreu um erro durante a requisição.')
  }
}

export async function getShops() {
  const shopsResponse = await get<Shop[]>('estabelecimento')
  return shopsResponse
}

export async function getShop(id: string) {
  const Authorization = await asyncStorage.getItem('@uid')

  const [shop, servicos] = await Promise.all([
    await get<Shop>(`estabelecimento/${id}`),
    await get<Servico[]>(`estabelecimento/${id}/servico`, { Authorization }),
  ])

  return {
    servicos,
    ...shop,
  }
}
