import { Formik, Form, type FormikValues } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import toast from "react-hot-toast";
import FormikInput from "./FormikInput";

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required('Email Required'),
})

const AuthForm= () => {
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleSubmit = async (values: FormikValues) => {
        setDisabled(true);

        const { email } = await schema.validate(values);
        let toastId;

        try {
            toastId = toast.loading('Loading...');

            await signIn('email', {
                email,
                redirect: false,
                callbackUrl: '/'
            });

            toast.dismiss(toastId);
        } catch (err) {
            toast.error('Unable to sign in', { id: toastId })
        } finally {
            setDisabled(false);
        }
    }

    return (
        <div className="flex flex-col items-center mt-5">
            <Formik
                initialValues={{ email: ''}}
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                <Form
                    className="flex flex-col items-center gap-5 mt-5"
                    name="auth-form"
                >
                    <h2 className="text-2xl font-bold text-sky-500">
                        Hey Lovely :)
                    </h2>

                    <FormikInput 
                        type="email"
                        id="email"
                        disabled={disabled}
                        label="Email"
                        required
                    />

                    <button 
                        disabled={disabled}
                        type="submit"
                        className="w-64 py-2 font-medium bg-white border-2 rounded-lg border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500"
                    >
                        Sign in
                    </button>
                </Form>
            </Formik>
            
        </div>
    );
}

export default AuthForm;