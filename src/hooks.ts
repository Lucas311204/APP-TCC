import { useState, useEffect } from 'react'
import asyncStorage from '@react-native-async-storage/async-storage'

export function useId() {
  const [id, setUid] = useState('')

  useEffect(() => {
    async function getStorageUid() {
      setUid(await asyncStorage.getItem('@uid'))
    }

    getStorageUid()
  }, [])

  return id
}

export function useCurrency(amount: number) {
  const periodFormatted = amount
    .toFixed(2)
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  return `R$ ${periodFormatted}`
}
