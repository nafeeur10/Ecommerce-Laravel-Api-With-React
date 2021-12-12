<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function create(OrderRequest $request)
    {
        $order = $this->orderService->setOrderProductsData($request->validated())->create();
        if($order) return response()->json(['message' => 'Order created successfully'], 201);
    }
}
