<?php

namespace App\Repositories;

class OrderRepository extends BaseRepository
{
    public function create($data)
    {
        return $this->model->create($data);
    }
}
