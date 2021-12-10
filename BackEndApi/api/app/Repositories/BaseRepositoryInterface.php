<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

interface BaseRepositoryInterface
{
    public function getOneById($id): ?Model;
    public function getByIds(array $ids): Collection;
    public function getAll(): Collection;
}
