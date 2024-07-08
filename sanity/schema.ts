import { type SchemaTypeDefinition } from 'sanity'
import { product } from './schemas/productSchema'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
