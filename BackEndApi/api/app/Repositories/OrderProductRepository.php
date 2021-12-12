<?php

namespace App\Repositories;

class OrderProductRepository extends BaseRepository
{
    public function create($data)
    {
        return $this->model->insert($data);
    }
}
