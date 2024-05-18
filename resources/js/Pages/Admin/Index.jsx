import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, success }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>
                    <div className="space-x-4">
                        <Link
                            href={route("product.create")}
                            className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                            Create New Product
                        </Link>
                        <Link
                            href={route("category.create")}
                            className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                            Create New Category
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {success && (
                    <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4'>
                        {success}
                    </div>
                )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Content of the admin dashboard goes here...</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
