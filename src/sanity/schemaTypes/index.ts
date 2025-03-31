import { type SchemaTypeDefinition } from 'sanity'
import { category } from '@/sanity/schemaTypes/category'
import { testimonials } from '@/sanity/schemaTypes/Testimonials'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, testimonials],
}
