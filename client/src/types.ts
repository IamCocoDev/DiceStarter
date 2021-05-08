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
    colors:string[],
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
    // Status
    productsListStatus: 'idle' | 'failed' | 'loading',
    productByIdStatus: 'idle' | 'failed' | 'loading',
    deleteByIdStatus: 'idle' | 'failed' | 'loading' | 'deleted',

};

export interface Categories {
    value: string,
    label: string
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
