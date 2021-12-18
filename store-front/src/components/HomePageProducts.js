import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"
import { productList, selectProductList } from "../features/product/productSlice"
import { selectUser } from "../features/user/userSlice"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePageProducts = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const products = (useSelector(selectProductList)).slice(0, 4)
    let navigate = useNavigate()

    const addToBag = (product) => {
        if(!user) {
            toast.warn("Please Login First");
            navigate("/login", { replace: true });
            return
        }
        toast.success("Product added successfully");
        dispatch(addToCart(product))
    }

    useEffect( () => {
        dispatch(productList())
    }, [])

    return (
        <div className="max-w-2xl mx-auto lg:max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 lg:pb-16">
            <h2 className="text-center text-2xl py-8">Products</h2>
            <ToastContainer />
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                <div>
                    <a key={product.id} href={product.href} className="group">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                        />
                    </div>

                    <div className="flex">
                        <div>
                        <h3 className="mt-3 text-md font-medium text-gray-900">{product.name}</h3>
                        </div>
                        <div className="ml-auto">
                        <p className="mt-3 text-md font-medium text-gray-900">{product.price}</p>
                        </div>
                    </div>
                    </a>
                    <button
                    className="mt-3 w-full border bg-gray-200 py-1.5 px-3 flex items-center justify-center text-base font-medium text-black"
                    onClick={ () => addToBag(product)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                    </svg>
                    <span>
                    Add to bag
                    </span>
                    </button>
                </div>
                ))}
            </div>
        </div>
    )
}

export default HomePageProducts