<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $productIds = DB::table('products')->pluck('id')->toArray();

        foreach ($productIds as $productId) {
            for ($i = 0; $i < rand(1, 3); $i++) {
                DB::table('product_images')->insert([
                    'product_id' => $productId,
                    'path' => $faker->imageUrl(640, 480, 'technics'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
