<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'products.*.id' => 'required',
            'products.*.name' => 'required',
            'products.*.price' => 'required',
            'products.*.qty' => 'required|numeric|min:1',
            'delivery_name' => 'required',
            'delivery_mobile' => 'required',
            'delivery_email' => 'sometimes|email',
            'delivery_address' => 'required'
        ];
    }
}
