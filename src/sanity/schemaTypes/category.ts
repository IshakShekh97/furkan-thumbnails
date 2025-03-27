import { DocumentDefinition } from 'sanity'

export const category: DocumentDefinition = {
    type: 'document',
    name: 'category',
    title: 'Category',
    fields: [
        {
            type: 'string',
            name: 'title',
            title: 'Title',
            description: 'Title of the category',
            validation: (Rule) => Rule.required(),
        },
        {
            type: 'slug',
            name: 'slug',
            title: 'Slug',
            description: 'Slug of the category',
            validation: (Rule) => Rule.required(),
            options: {
                source: 'title'
            }
        },
        {
            type: 'array',
            name: 'images',
            title: 'Images',
            of: [
                {
                    type: 'object',
                    name: 'imageItem',
                    title: 'Image Item',
                    fields: [
                        {
                            type: 'image',
                            name: 'image',
                            title: 'Image',
                        },
                        {
                            type: 'string',
                            name: 'caption',
                            title: 'Caption',
                            description: 'Caption for the image',
                        }
                    ]
                }
            ]
        }
    ]
}