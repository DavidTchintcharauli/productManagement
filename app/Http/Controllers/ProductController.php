<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\ProductImage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Product::with('category');

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("description")) {
            $query->where("description", "like", "%" . request("description") . "%");
        }

        if (request("price")) {
            $query->where("price", "like", "%" . request("price") . "%");
        }

        if (request("category")) {
            $query->where("category_id", "like", "%" . request("category") . "%");
        }

        $categories = Category::all();

        $products = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Product/Index", [
            "products" => ProductResource::collection($products),
            "categories" => $categories,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();

        return inertia('Product/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $images = $data['images'] ?? [];

        if (is_numeric($data['category'])) {
            $data['category_id'] = $data['category'];
        }

        $product = Product::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'category_id' => $data['category_id'],
            'price' => $data['price'],
        ]);

        foreach ($images as $image) {
            $path = $image->store('product/' . Str::random(), 'public');
            $product->images()->create(['path' => $path]);
        }

        return to_route('product.index')->with('success', 'Product was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return inertia('Product/Show', [
            'product' => new ProductResource($product),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $name = $product->name;
        $product->delete();
        
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }
        
        return to_route('product.index')->with('success', "Product \"$name\" was Deleted");
    }
}
