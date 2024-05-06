<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    function get_image_link(){
        $unsplash_link = "https://source.unsplash.com/random/400x300/?product";
        $headers = get_headers($unsplash_link, 1);
        $direct_link = $headers["Location"];
        return $direct_link;
    }
    protected $model = Product::class;
    public function definition(): array{
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(4),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'quantity' => $this->faker->numberBetween(1, 100),
            'image' => $this->get_image_link(), // Utilisation d'Unsplash pour les images aléatoires
        ];
    }
}
