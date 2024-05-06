<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'libelle' => 'required|string'
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
            'libelle.required'=>'un libelle doit être saisie',
        ];
    }
}
