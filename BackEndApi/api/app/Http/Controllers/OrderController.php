<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Repositories\OrderRepository;
use App\Services\OrderService;

class OrderController extends Controller
{
    private OrderService $orderService;
    private OrderRepository $orderRepository;

    public function __construct(OrderService $orderService, OrderRepository $orderRepository)
    {
        $this->orderService = $orderService;
        $this->orderRepository = $orderRepository;
    }

    public function create(OrderRequest $request)
    {
        $order = $this->orderService->setOrderProductsData($request->validated())->create();
        if($order) return response()->json(['message' => 'Order created successfully'], 201);
    }

    public function filter($filterParams)
    {
        $orderStatusFilterResult = $this->orderRepository->filter('status', $filterParams);
        if(count($orderStatusFilterResult) > 0) return response()->json(['orders' => $orderStatusFilterResult], 200);
        else return response()->json(['message' => 'No order found!'], 404);
    }

    public function search($orderId)
    {
        $orderDetails = $this->orderRepository->getOneById($orderId);
        if($orderDetails) return response()->json($orderDetails);
        return response()->json(['message' => 'Order not found'], 404);
    }

    public function update(OrderUpdateRequest $request, $order)
    {
        return $this->orderService->setOrderId($order)->update($request->validated());
    }
}
