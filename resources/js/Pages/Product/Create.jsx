import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextInputArea from '@/Components/TextInputArea';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth, categories }) {

    const { data, setData, post, errors } = useForm({
        image: '',
        name: '',
        description: '',
        category: '',
        price: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('product.store'), {
            forceFormData: true
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create new Product</h2>}
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900">
                        <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-gray-400 dark:bg-gray-800 shadow sm:rounded-lg'>
                            <div>
                                <InputLabel
                                    htmlFor="product_images"
                                    value="Product Images"
                                />
                                <TextInput
                                    id='product_images'
                                    type="file"
                                    name='images'
                                    multiple
                                    className="mt-1 block w-full"
                                    onChange={e => setData('images', Array.from(e.target.files))}
                                />
                                <InputError message={errors.images} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="product_name"
                                    value="Product Name"
                                />
                                <TextInput
                                    id='product_name'
                                    type="text"
                                    name='name'
                                    value={data.name}
                                    className="mt-1 blok w-full"
                                    isFocused={true}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="product_description"
                                    value="Product description"
                                />
                                <TextInputArea
                                    id='product_description'
                                    type="text"
                                    name='description'
                                    value={data.description}
                                    className="mt-1 blok w-full"
                                    onChange={e => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="product_category"
                                    value="Product Category"
                                />
                                <SelectInput
                                    name='category'
                                    id='product_category'
                                    value={data.category}
                                    className="mt-1 blok w-full"
                                    onChange={e => setData('category', e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.category} className="mt-2" />
                            </div>
                            <div className='mt-4'>
                                <InputLabel
                                    htmlFor="product_price"
                                    value="Product Price"
                                />
                                <TextInput
                                    id='product_price'
                                    type="number"
                                    name='price'
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    onChange={e => setData('price', e.target.value)}
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                            <div className='mt-4 text-right'>
                                <Link href={route('admin.index')}
                                    className="bg-gray-500 py-2 px-4 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 inline-block text-center">
                                    Cancel
                                </Link>
                                <button className='bg-emerald-500 py-2 px-4 text-white rounded shadow transition-all hover:bg-emerald-600 inline-block text-center'>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
