
export interface FormState {
    inputs: Inputs,
    status: 'idle' | 'failed' | 'loading' | 'done',
}
export interface FormRegisterState {
    inputs: {
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        birthday: string,
        profilePicture: string,
        address: string,
        city: string,
        postalCode: number,
        phone: string,
        country: string,
        role: string,
    },
    status: 'idle' | 'failed' | 'loading' | 'done',
}
export interface ReviewState {
    reviewsResponse: ReviewRes[] | null,
    body: string,
    postReviewStatus: 'idle' | 'failed' | 'loading' | 'done',
    getReviewsStatus: 'idle' | 'failed' | 'loading' | 'done',
    deleteReviewStatus: 'idle' | 'failed' | 'loading' | 'done',
    changeReviewStatus: 'idle' | 'failed' | 'loading' | 'done',
    id: string,
}
export interface ReviewRes {
    id: number,
    rating: number,
    comment: string,
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

export interface loginInput {
    username: string,
    password: string,
}

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
