
export interface Address {
    id: string,
    address: string,
    city: string,
    postalCode: string,
    phone: string | null,
}
export interface userChanges {
    id:string,
    name:string,
    firstName:string,
    lastName:string,
    birthday:string,
    country:string,
    email:string,
    password:string,
    role:string,
    status:string,
}
export interface FormState {
    inputs: Inputs,
}

export interface cartState {
    productsInCart: ProductRes[]
}

export interface wishlistState {
  productsInWishlist: ProductRes[]
}

export interface User {
        id: string,
        name: string,
        firstName: string,
        lastName: string,
        birthday: string,
        country: string,
        email: string,
        password: string,
        role: string,
        status: string,
}
export interface FormRegisterState {
    inputs: {
        id: string,
        name: string,
        firstName: string,
        lastName: string,
        birthday: string,
        profilePicture: string,
        address: string,
        city: string,
        postalCode: number,
        phone: string,
        country: string,
        email: string,
        password: string,
        role: string,
        status: string
    },
    userToken: string,
    users:User[] | null,
   userProfile: {
    id: string,
    name: string,
    firstName: string,
    lastName: string,
    birthday: string,
    profilePicture: string,
    address: string,
    city: string,
    postalCode: number,
    phone: string,
    country: string,
    email: string,
    password: string,
    role: string,
    status: string
   } | {}
}
export interface ReviewState {
    reviewsResponse: ReviewRes[] | null,
    allReviews: ReviewRes[] | null,
    body: string,
    id: string,
}
export interface ReviewPost {
    comment: string,
    id: string,
    rating:number,
    userId:string,
}
export interface ReviewRes {
    id: number,
    rating: number,
    comment: string,
    userId:string,
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
    rating: string,
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

export interface base64 {
    name: string,
    base64:string,
    size:string,
    type: string,
    file: {
      lastModified: number,
      lastModifiedDate: Date,
      name:string,
      size: number,
      type: string,
      webkitRelativePath: string}
}

export interface Products {
    // Data
    productsList: ProductRes[] | null,
    productById: ProductRes | null,
    productCategories: Categories[]
    bestProducts: ProductRes[] | null,
    // Status
    totalPages: number,
    queryFilter: string,
    querySort: string,
    queryName: string,
};

export type Categories = {
    value: string,
    label: string,
    id: number,
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
