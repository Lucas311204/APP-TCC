import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const url = 'https://peat-api.onrender.com'
const defaultBody = {
  cpf: '000.000.000-00',
  estado: 'SP',
  cidade: 'São Paulo',
  bairro: 'Não Definido',
  logradouro: 'Não Definido',
  complemento: '',
  numero: 0,
}

const auth = getAuth()

export async function createUser(name: string, email: string, password: string) {
  const body = { ...defaultBody, nome_completo: name }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const response = await fetch(`${url}/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userCredential.user.uid,
      },
      body: JSON.stringify({ data: body }),
    })
    console.log(await response.text())
    return userCredential.user.uid
  } catch (error) {
    console.log(error)
    return null
  }
}
