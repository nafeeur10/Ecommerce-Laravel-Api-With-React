<?php

namespace App\Repositories;

class ProductRepository extends BaseRepository
{
    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update($data)
    {
        return $this->model->update($data);
    }
}
