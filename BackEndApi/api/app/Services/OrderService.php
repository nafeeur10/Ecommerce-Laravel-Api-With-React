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
    private RoleCheckerService $roleCheckerService;
    public $orderId = null;

    public function __construct(OrderRepository $orderRepository, OrderProductRepository $orderProductRepository, RoleCheckerService $roleCheckerService)
    {
        $this->orderRepository = $orderRepository;
        $this->orderProductRepository = $orderProductRepository;
        $this->roleCheckerService = $roleCheckerService;
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

    public function update($orderStatus)
    {
        if($this->checkAuthorityToUpdateStatus($orderStatus))
        {
            $updatedOrder = $this->orderRepository->update($this->orderId, $orderStatus);
            if($updatedOrder) return response()->json(['message' => 'Order updated successfully'], 200);
            else return response()->json(['message' => 'Something went wrong'], 500);
        }
        else
        {
            return response()->json(['message' => 'You are not authorized to do this action'], 401);
        }
    }

    private function checkAuthorityToUpdateStatus($orderStatus)
    {
        $order = $this->orderRepository->getOneById($this->orderId);
        if(!$this->roleCheckerService->checkAdmin() && ($order->status === OrderStatus::ACCEPTED || $order->status === OrderStatus::REJECTED || $orderStatus['status'] != OrderStatus::CANCEL))
        {
            return false;
        }
        return true;
    }

    private function makeOrderData()
    {
        $data = [];
        $data['user_id'] = auth()->user()->id;
        $data['status'] = OrderStatus::PENDING;
        $data['delivery_name'] = $this->orderProductsData['delivery_name'];
        $data['delivery_mobile'] = $this->orderProductsData['delivery_mobile'];
        $data['delivery_email'] = $this->orderProductsData['delivery_email'];
        $data['delivery_address'] = $this->orderProductsData['delivery_address'];
        return $data;
    }

    private function makeOrderProductsData()
    {
        $data = [];
        $orderProducts = $this->orderProductsData["products"] ?? $this->orderProductsData;
        foreach($orderProducts as $singleProduct => $productArrayValueValue)
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
