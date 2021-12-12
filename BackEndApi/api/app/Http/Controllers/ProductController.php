<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\ProductService;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductController extends Controller
{
    private ProductRepository $productRepository;
    private ProductService $productService;

    public function __construct(ProductRepository $productRepository, ProductService $productService)
    {
        $this->productRepository = $productRepository;
        $this->productService = $productService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->productRepository->getAll());
    }

    public function create(ProductCreateRequest $request): JsonResponse
    {
        $this->checkAuth();

        $product = $this->productService->setProductData($request->validated())->create();
        if(!$product) return response()->json(['message' => "Product didn't save"]);

        return response()->json([
           'message' => 'Product uploaded successfully',
           'data' => $product,
           'code' => 201
        ]);
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->productRepository->getOneById($id));
    }

    public function update(ProductUpdateRequest $request, Product $product): JsonResponse
    {
        $this->checkAuth();
        $this->productService->setProductData($product)->setUpdatedProductData($request->all())->update();

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
            'code' => 200
        ]);
    }

    public function delete(Product $product): JsonResponse
    {
        $this->checkAuth();
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
            'code' => 200
        ]);
    }

    public function search($search)
    {
        $productSearchResult = $this->productRepository->search('name', $search);
        return response()->json([
           'data' => $productSearchResult
        ]);
    }

    public function sortAsc()
    {
        return response()->json($this->productRepository->sort('price', 'asc'));
    }

    public function sortDesc()
    {
        return response()->json($this->productRepository->sort('price','desc'));
    }

    private function checkAuth()
    {
        if(!(auth()->user()['role'] === 'admin'))
        {
            throw new UnauthorizedException("Unauthenticated Attempt");
        }
    }
}
