import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, product }) {
    const baseUrl = window.location.origin;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                    {`Product name: "${product.name}"`}
                </h2>
            }
        >
            <Head title={`Product "${product.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='grid grid-cols-2 gap-4'>
                                {product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`${baseUrl}/storage/${image.path}`}
                                        alt={`Product ${index + 1}`}
                                        className='h-64 object-cover'
                                    />
                                ))}
                                <div className='col-span-1'>
                                    <div>
                                        <label className="font-bold text-lg" htmlFor="">Product ID</label>
                                        <p className='mt-1'>{product.id}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className="font-bold text-lg" htmlFor="">Product Name</label>
                                        <p className='mt-1'>{product.name}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className="font-bold text-lg" htmlFor="">Product Description</label>
                                        <p className='mt-1'>{product.description}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className="font-bold text-lg" htmlFor="">Product Price</label>
                                        <p className='mt-1'>{product.price}</p>
                                    </div>
                                    <div className='mt-4'>
                                        <label className="font-bold text-lg" htmlFor="">Product Category</label>
                                        <p className='mt-1'>{product.category.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}