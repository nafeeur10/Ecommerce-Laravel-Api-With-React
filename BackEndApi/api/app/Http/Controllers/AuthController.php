<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use App\Repositories\AuthRepository;
use App\Services\TokenManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private AuthRepository $authRepository;
    private TokenManager $tokenManager;

    public function __construct(AuthRepository $authRepository, TokenManager $tokenManager, ?Authenticatable $currentUser)
    {
        $this->authRepository = $authRepository;
        $this->tokenManager = $tokenManager;
    }

    public function register(RegistrationRequest $request): JsonResponse
    {
        $user = $this->authRepository->create($request->validated());
        return response()->json([
            'message' => 'User created successfully',
            'code' => 201,
            'token' => $this->tokenManager->createToken($user)->plainTextToken,
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->authRepository->getFirstWhere('email', $request->email);

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return response()->json([
            'token' => $this->tokenManager->createToken($user)->plainTextToken,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged Out']);
    }
}
