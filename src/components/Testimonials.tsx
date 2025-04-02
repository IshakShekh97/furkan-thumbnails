import { client } from '@/sanity/lib/client';
import TestimonialCarousel from './ui/TestomonialCarousel';

async function getTestimonials() {
    const query = `*[_type == 'testimonials']{
   "id": _id,
    name,
    "src" : src.asset._ref
 }`
    const testimonials = await client.fetch(query)
    return testimonials
}


const Testimonials = async () => {
    const testimonials = await getTestimonials()

    return (
        <div className='mb-5' id='testimonials'>
            <div
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Client <span className="text-lime-400">Testimonials</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    What my clients say about me and my work
                </p>
            </div>

            <TestimonialCarousel testimonials={testimonials} />
        </div>
    )
}

export default Testimonials