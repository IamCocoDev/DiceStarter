export interface FormState {
    inputs: Inputs,
    status: 'idle' | 'failed' | 'loading' | 'done',
}

export interface SearchInput{
    name:string,
    page:number,
}

export interface ProductRes {
    id:string,
    name:string,
    picture:string,
    price:string,
    size:string,
    color:string[],
    available:boolean,
    stock:string,
    description:string,
    rating:string,
    categories:string[],
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

};

export interface Categories {
    id: number,
    name: string
};

export interface registerInput {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export interface Inputs {
    name: string;
    price: number;
    categories: Categories[];
    color: string[];
    size: string;
    stock: number;
    rating: number;
    description: string;
    picture: string;
    available: boolean;
}

export interface errorsInput {
    name: string;
    price: string;
    categories: string;
    color: string;
    size: string;
    stock: string;
    rating: string;
    description: string;
    picture: string;
}

export type formData = React.FormEvent<HTMLElement>;
export type formInputData = React.ChangeEvent<HTMLInputElement>;
export type formTextAreaData = React.ChangeEvent<HTMLTextAreaElement>;
