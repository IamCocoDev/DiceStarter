export interface FormState {
    inputs: Inputs,
    status: 'idle' | 'failed' | 'loading',
}

export type ProductRes = {
    id:string,
    name:string,
    picture:string,
    price:string,
    size:string,
    color:string,
    available:boolean,
    stock:string,
    description:string,
    createdAt:string,
    updatedAt:string,
}
export interface Products {
    // Data
    productsList: [{id:string,
         name:string,
          picture:string,
           price:string
        }] | null,
    productById: object
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
    colors: string[];
    size: string;
    stock: number;
    rating: number;
    description: string;
    picture: string;
}

export interface errorsInput {
    name: string;
    price: string;
    categories: string;
    colors: string;
    size: string;
    stock: string;
    rating: string;
    description: string;
    picture: string;
}

export type formData = React.FormEvent<HTMLElement>;
export type formInputData = React.ChangeEvent<HTMLInputElement>;
export type formTextAreaData = React.ChangeEvent<HTMLTextAreaElement>;
