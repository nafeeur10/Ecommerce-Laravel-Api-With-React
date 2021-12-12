<?php

namespace App\Services;

use App\Constants\OrderStatus;
use App\Repositories\OrderProductRepository;
use App\Repositories\OrderRepository;

class OrderService
{
    private $orderProductsData;
    private OrderRepository $orderRepository;
    private OrderProductRepository $orderProductRepository;
    public $orderId = null;

    public function __construct(OrderRepository $orderRepository, OrderProductRepository $orderProductRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->orderProductRepository = $orderProductRepository;
    }

    public function setOrderId($id)
    {
        $this->orderId = $id;
        return $this;
    }

    public function setOrderProductsData($orderProductsData)
    {
        $this->orderProductsData = $orderProductsData;
        return $this;
    }

    public function create()
    {
        $orderData = $this->makeOrderData();
        $order = $this->orderRepository->create($orderData);
        $orderProductsResponse = null;
        if($order)
        {
            $this->setOrderId($order->id);
            $orderProducts = $this->makeOrderProductsData();
            $orderProductsResponse = $this->orderProductRepository->create($orderProducts);
        }

        return $order && $orderProductsResponse;
    }

    private function makeOrderData()
    {
        $data = [];
        $data['user_id'] = auth()->user()->id;
        $data['status'] = OrderStatus::PENDING;
        return $data;
    }

    private function makeOrderProductsData()
    {
        $data = [];
        foreach($this->orderProductsData['products'] as $singleProduct => $productArrayValueValue)
        {
            $data['order_id'] = $this->orderId;
            $data['product_id'] = $productArrayValueValue['id'];
            $data['product_name'] = $productArrayValueValue['name'];
            $data['product_description'] = $productArrayValueValue['description'] ?? '';
            $data['product_price'] = $productArrayValueValue['price'];
            $data['product_qty'] = $productArrayValueValue['qty'];
        }
        return $data;
    }
}
