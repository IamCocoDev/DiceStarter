
export interface FormState {
    inputs: Inputs,
    status: 'idle' | 'failed' | 'loading' | 'done',
}

export interface FormRegisterState {
    inputs: registerInput,
    status: 'idle' | 'failed' | 'loading' | 'done',
}
export interface ReviewState {
    input: Review,
    status: 'idle' | 'failed' | 'loading' | 'done',
}

export interface Review{
    body: string,
}

export interface SearchInput {
    name?:string,
    page:number,
    filter?: string,
    sort?: string,
}

export interface ProductRes {
    id:string,
    name:string,
    picture:string[],
    price:string,
    size:string,
    color:string[],
    available:boolean,
    stock:string,
    description:string,
    categories: dbCategories[],
}

export interface Inputs {
    id?: string;
    name: string;
    price: string;
    categories: number[];
    color: string[];
    size: string;
    stock: number;
    description: string;
    picture: string[];
    available: boolean;
}

export interface Products {
    // Data
    productsList: ProductRes[] | null,
    productById: ProductRes
    productCategories: Categories[]
    // Status
    productsListStatus: 'idle' | 'failed' | 'loading',
    productByIdStatus: 'idle' | 'failed' | 'loading',
    getCategoriesStatus: 'idle' | 'failed' | 'loading',
    deleteByIdStatus: 'idle' | 'failed' | 'loading' | 'deleted',
    addCategoryStatus: 'idle' | 'failed' | 'loading',
    totalPages: number,
    queryFilter: string,
    querySort: string,
    queryName: string,
};

export type Categories = {
    value: number,
    label: string
};

export interface dbCategories {
    id: number,
    name: string
};

export interface registerInput {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    country: string;
};


export interface errorsInput {
    name: string;
    price: string;
    categories: string;
    color: string;
    size: string;
    stock: string;
    description: string;
    picture: string;
}

export type formData = React.FormEvent<HTMLElement>;
export type formInputData = React.ChangeEvent<HTMLInputElement>;
export type formTextAreaData = React.ChangeEvent<HTMLTextAreaElement>;
