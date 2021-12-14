<?php

namespace App\Services;

class RoleCheckerService
{
    public function checkAdmin()
    {
        return auth()->user()['role'] === 'admin' ? true : false;
    }
}
