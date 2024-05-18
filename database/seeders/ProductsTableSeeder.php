<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $categoryIds = DB::table('categories')->pluck('id')->toArray();

        for ($i = 0; $i < 100000; $i++) {
            DB::table('products')->insert([
                'name' => $faker->word,
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 10, 1000),
                'category_id' => $faker->randomElement($categoryIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
