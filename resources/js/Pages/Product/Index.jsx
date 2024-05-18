import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function Index({ auth, products, categories, queryParams = null, success }) {

    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('product.index'), queryParams)
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return

        searchFieldChanged(name, e.target.value)
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc"
            } else {
                queryParams.sort_direction = "asc"
            }
        } else {
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
        }
        router.get(route('product.index'), queryParams)
    }

    const deleteProduct = (product) => {
        if (!window.confirm('Are you sure you want to delete the product?')) {
            return
        }
        router.delete(route('product.destroy', product.id))
    }

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length <= wordLimit) return description;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    const baseUrl = window.location.origin;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4'>
                            {success}
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='overflow-auto'>
                                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className='px-3 py-2 cursor-pointer'>Image</th>
                                            <th onClick={(e) => sortChanged('name')}
                                                className='px-3 py-2 cursor-pointer'>Name</th>
                                            <th onClick={(e) => sortChanged('description')}
                                                className='px-3 py-2 cursor-pointer'>Description</th>
                                            <th onClick={(e) => sortChanged('price')}
                                                className='px-3 py-2 cursor-pointer'>Price</th>
                                            <th onClick={(e) => sortChanged('category_id')}
                                                className='px-3 py-2 cursor-pointer'>Category</th>
                                            <th className='px-3 py-2 cursor-pointer'>Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className='px-3 py-2'></th>
                                            <th className='px-3 py-2'><TextInput
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Product Name"
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                            /></th>
                                            <th className='px-3 py-2'><TextInput
                                                className="w-full"
                                                defaultValue={queryParams.description}
                                                placeholder="Description"
                                                onBlur={e => searchFieldChanged('description', e.target.value)}
                                                onKeyPress={e => onKeyPress('description', e)}
                                            /></th>
                                            <th className='px-3 py-2'><TextInput
                                                className="w-full"
                                                defaultValue={queryParams.price}
                                                placeholder="Price"
                                                onBlur={e => searchFieldChanged('price', e.target.value)}
                                                onKeyPress={e => onKeyPress('price', e)}
                                            /></th>
                                            <th className='px-3 py-2'><SelectInput
                                                className="w-full"
                                                defaultValue={queryParams.category}
                                                onChange={(e) => searchFieldChanged("category", e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}
                                            </SelectInput></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={product.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {product.images.length > 0 ? (
                                                        <img
                                                            src={`${baseUrl}/storage/${product.images[0].path}`}
                                                            alt={product.name}
                                                            style={{ width: 60 }}
                                                        />
                                                    ) : (
                                                        'No Image'
                                                    )}
                                                </td>
                                                <th className='px-3 py-2 hover:underline text-black'>
                                                    <Link href={route('product.show', product.id)}>
                                                        {product.name}
                                                    </Link>
                                                </th>
                                                <td className='px-3 py-2'>
                                                    {truncateDescription(product.description, 10)}
                                                </td>
                                                <td className='px-3 py-2'>
                                                    {product.price}
                                                </td>
                                                <td className='px-3 py-2'>{product.category ? product.category.name : 'N/A'}</td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <button
                                                        onClick={(e) => deleteProduct(product)}
                                                        className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link href={route('product.show', product.id)}>
                                                        <button
                                                            className='font-medium text-green-600 dark:text-green-500 hover:underline mx-1'
                                                        >
                                                            View
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={products.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}