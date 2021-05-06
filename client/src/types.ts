export type Form = {
    name: string,
    price: number,
    categories: string[]
}

export interface FormState {
    form: Form;
    status: 'idle' | 'failed' | 'loading';
}

export type ToDelete = {
    id: number,
    status: string,
}
