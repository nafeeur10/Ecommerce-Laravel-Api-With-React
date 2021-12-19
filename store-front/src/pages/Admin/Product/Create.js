import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../../features/product/productSlice"
import { selectAuthToken } from "../../../features/user/userSlice"

const ProductCreate = () => {

    const dispatch = useDispatch()
    const token = useSelector(selectAuthToken)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [image, setImage] = useState('')

    const imageChangeHandler = (e) => {
        let file = e.currentTarget.files[0]
        setImage(file)
    }

    const saveProduct = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('qty', qty)
        formData.append('image', image)

        let productData = {
            data: formData,
            token: token
        }

        dispatch(createProduct(productData))
    }

    return (
        <form onSubmit={(e) => saveProduct(e)} className="max-w-2xl mx-auto lg:max-w-7xl py-3 my-5 px-4 sm:px-6 lg:px-8">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid gap-6">

                <div className="flex sm:col-span-2">
                <div className="w-1/2 mr-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        type="text"
                        name="name"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="Apple"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                </div>

                <div className="w-1/2 sm:col-span-2 ml-3">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Product Price
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        type="text"
                        name="price"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="100"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                </div>
                </div>

                <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                    Product Quantity
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        type="number"
                        name="qty"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    />
                    </div>
                </div>
                </div>

                <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
                </label>
                <div className="mt-1">
                    <textarea
                    name="description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Description"
                    defaultValue={''}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                </div>

                <div>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                        <span>Upload a file</span>
                        <input id="image" name="image" type="file" onChange={(e) => imageChangeHandler(e)} className="sr-only"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Save
                </button>
            </div>
            </div>
        </form>
    )
}

export default ProductCreate