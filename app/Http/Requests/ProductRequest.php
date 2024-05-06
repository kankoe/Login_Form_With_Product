<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;


class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'image' => 'nullable|string|max:255', // Champs image nullable et string
            'category_id' => 'required|integer|min:0',
        ];
    }

    public function failedValidation(Validator $validator){
        throw new \HttpResponseException(response()->json([
            'success'=>false,
            'erroe'=>true,
            'message'=>'erreur de validation',
            'errorsList'=>$validator->errors()
        ]));
    }

    public function messages()
    {
        return [
           'name.required'=>'un nom doit être saisie',
            'description.required'=>'une description doit être saisie',
            'price.required'=>'un prix doit être saisie',
           'quantity.required'=>'une quantite  doit être saisie',
           'category_id.required'=>'le produit doit forcement corespondre a une catégorie',
        ];
    }
}
