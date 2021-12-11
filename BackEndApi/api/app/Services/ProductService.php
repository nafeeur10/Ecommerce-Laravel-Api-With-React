<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService
{
    private ProductRepository $productRepository;
    private FileUploadService $fileUploadService;
    private FileRemoveService $fileRemoveService;
    private $productData;
    private $updatedProductData;

    public function __construct(ProductRepository $productRepository, FileUploadService $fileUploadService, FileRemoveService $fileRemoveService)
    {
        $this->fileUploadService = $fileUploadService;
        $this->productRepository = $productRepository;
        $this->fileRemoveService = $fileRemoveService;
    }

    public function setProductData($data)
    {
        $this->productData = $data;
        return $this;
    }

    public function setUpdatedProductData($data)
    {
        $this->updatedProductData = $data;
        return $this;
    }

    public function create()
    {
        $preparedData = $this->getPreparedDataToStore();
        return $this->productRepository->create($preparedData);
    }

    public function update()
    {
        $preparedData = $this->getPreparedDataToUpdate();
        return $this->productData->update($preparedData);
    }

    private function getPreparedDataToUpdate()
    {
        $processingData = $this->updatedProductData;
        if(isset($processingData['image'])) {
            $this->fileRemoveService->removeFileFromStorage($this->productData->image);
            $processingData['image'] = $this->fileUploadService->getImageUrl($this->updatedProductData['image']);
        }
        return $processingData;
    }

    private function getPreparedDataToStore()
    {
        $processingData = $this->productData;
        if(isset($processingData['image'])) {
            $processingData['image'] = $this->fileUploadService->getImageUrl($processingData['image']);
        }
        return $processingData;
    }
}
