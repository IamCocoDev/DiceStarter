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

export type formData = React.FormEvent<HTMLElement>;
export type formInputData = React.ChangeEvent<HTMLInputElement>;
export type formTextAreaData = React.ChangeEvent<HTMLTextAreaElement>;
