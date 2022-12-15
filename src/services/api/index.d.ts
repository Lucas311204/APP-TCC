export type Shop = {
  id: string
  nome: string
  descricao: string
  coordenadas: {
    lat: number
    long: number
  }
  bairro: string
  numero: number
  logradouro: string
  cidade: string
  estado: string
  complemento: string
  avaliacao_media: null | number
  nome_imagens: string[]
}

export type Servico = {
  id: string
  nome: string
  preco: number
}

export type EstabelecimentoWithServicos = Shop & {
  servicos: Servico[]
}
