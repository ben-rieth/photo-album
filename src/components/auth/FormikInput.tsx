import { Field, ErrorMessage } from "formik";
import type { FC } from "react";

type InputProps = {
    id: string;
    type: string;
    disabled?: boolean;
    required?: boolean;
    label: string;
}

const FormikInput:FC<InputProps> = (
    { id, type, disabled=false, label, required=false }
) => {
    return (
        <div className="relative flex flex-col">
            <label htmlFor={id} className="absolute px-1 bg-white left-2 -top-3">
                {label}
                {required && <span className="text-rose-500">*</span>}
            </label>
            <Field 
                disabled={disabled}
                className="w-64 pt-3 pb-2 pl-3 border-2 rounded-lg outline-none border-slate-300 focus:border-sky-500"
                type={type}
                name={id}
                id={id}
            />
            <ErrorMessage 
                component="span"
                name={id}
                data-testid="error"
                className="text-sm text-rose-500" />
        </div>
    );
};

export default FormikInput;