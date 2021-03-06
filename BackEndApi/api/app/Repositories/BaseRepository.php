<?php

namespace App\Repositories;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Throwable;

class BaseRepository implements BaseRepositoryInterface
{
    private string $modelClass;
    protected Model $model;

    public function __construct(?string $modelClass = null)
    {
        $this->modelClass = $modelClass ?: self::guessModelClass();
        $this->model = app($this->modelClass);

        try {
            $this->auth = app(Guard::class);
        } catch (Throwable $e) {
        }
    }

    private static function guessModelClass(): string
    {
        return preg_replace('/(.+)\\\\Repositories\\\\(.+)Repository$/m', '$1\Models\\\$2', static::class);
    }

    public function getOneById($id): ?Model
    {
        return $this->model->find($id);
    }

    public function getByIds(array $ids): Collection
    {
        return $this->model->find($ids);
    }

    public function getAll(): Collection
    {
        return $this->model->all();
    }

    public function getModelClass(): string
    {
        return $this->modelClass;
    }

    public function getFirstWhere(...$params): ?Model
    {
        return $this->model->firstWhere(...$params);
    }

    public function search($columnName, $searchParameter)
    {
        return $this->model->where($columnName, 'like', '%' . $searchParameter . '%')->get();
    }

    public function sort($columnName, $sortOrder)
    {
        return $this->model->orderBy($columnName, $sortOrder)->get();
    }
}
