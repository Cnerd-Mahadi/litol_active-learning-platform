<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Services\AuthServices;
use App\Http\Services\SignUpServices;
use App\Http\Services\UserServices;
use Illuminate\Http\Request;

class SignUpController extends Controller
{
    private $signupService;
    private $userService;
    private $authService;

    public function __construct(SignUpServices $signupService, UserServices $userService, AuthServices $authService)
    {
        $this->signupService = $signupService;
        $this->userService = $userService;
        $this->authService = $authService;
    }

    public function signUpSubmit(Request $request)
    {
        $validation = $this->signupService->checkValidation($request, $request->role);
        if ($validation->fails()) {
            return ResponseHelper::error($validation->errors());
        }

        try {
            $savedUser = $request->role === "student" ? $this->signupService->createStudent($request)
                : $this->signupService->createCreator($request);
            return ResponseHelper::success([
                'token' => $this->authService->generateAuthToken($savedUser->id(), $request->role),
                'userInfo' => [
                    'id' => $savedUser->id(),
                    'name' => $request->username,
                    'email' => $request->email,
                    'role' => $request->role,
                    'details' => $this->userService->getUserbyId($savedUser->id())->data->basic
                ],
            ]);

        } catch (\Throwable $th) {
            return ResponseHelper::error([
                'message' => 'User could not be created',
                'error' => $th->getMessage()
            ]);
        }

    }

}