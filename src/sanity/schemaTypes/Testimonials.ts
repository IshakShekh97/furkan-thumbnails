import { DocumentDefinition } from 'sanity'


export const testimonials: DocumentDefinition = {
    type: 'document',
    name: 'testimonials',
    title: 'Testimonials',
    fields: [
        {
            type: 'string',
            name: 'name',
            title: 'Name',
            description: 'Name of the person giving the testimonial',
            validation: (Rule) => Rule.required(),
        },
        {
            type: 'image',
            name: 'src',
            title: 'Image Source',
            description: 'Image of the person giving the testimonial',
            options: {
                hotspot: true,
            },
        }
    ]
}