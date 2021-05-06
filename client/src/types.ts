export interface FormState {
    form: Inputs;
    status: 'idle' | 'failed' | 'loading';
}

export type ToDelete = {
    id: number,
    status: string,
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
