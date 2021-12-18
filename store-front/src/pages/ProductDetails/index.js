import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  return (
    <div className="bg-white">
      <div className="py-6">

        <div className="flex flex-col md:flex-row mx-auto px-4 lg:px-8 lg:max-w-7xl max-w-2xl">
            {/* Image gallery */}
            <div className="mx-auto w-full md:w-1/2">
                <div className="rounded-lg block">
                    <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-full h-full object-center object-cover"
                    />
                </div>
            </div>

            {/* Product info */}
            <div className="w-full md:w-1/2 mx-auto pb-16 px-4 sm:px-6">
            <div className="lg:col-span-2 flex">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl ml-auto">{product.price}</h1>
            </div>
            <div className="py-10 lg:pt-6 lg:pb-16">
                {/* Description and details */}
                <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description}</p>
                </div>
                </div>

                <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                    <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>

                <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                </div>
                </div>

                <button
                    type="submit"
                    className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add to bag
                </button>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}