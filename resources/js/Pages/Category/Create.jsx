import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('category.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Category</h2>
                    <Link
                        href={route('admin.index')}
                        className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-800 mr-2 inline-block text-center"
                    >
                        Cancel
                    </Link>
                </div>
            }
        >
            <Head title="Create New Category" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="category_name" className="block font-medium text-gray-700">
                                    Add Category Name
                                </label>
                                <input
                                    id="category_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600" role="alert">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600"
                                >
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
