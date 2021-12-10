<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Repositories\AuthRepository;
use App\Services\TokenManager;

class AuthController extends Controller
{
    private $authRepository;
    private TokenManager $tokenManager;

    public function __construct(AuthRepository $authRepository, TokenManager $tokenManager)
    {
        $this->authRepository = $authRepository;
        $this->tokenManager = $tokenManager;
    }

    public function register(RegistrationRequest $request)
    {
        $user = $this->authRepository->create($request->validated());
        return response()->json([
            'message' => 'User created successfully',
            'code' => 201,
            'token' => $this->tokenManager->createToken($user)->plainTextToken,
        ]);
    }
}
