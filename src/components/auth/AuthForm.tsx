import { Formik, Form, type FormikValues } from "formik";
import { useCallback, useState } from "react";
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import toast from "react-hot-toast";
import FormikInput from "./FormikInput";
import ConfirmEmail from "./ConfrimEmail";

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required('Email Required'),
})

const AuthForm= () => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);

    const handleSubmit = useCallback(async (values: FormikValues) => {
        setDisabled(true);

        const { email } = await schema.validate(values);
        let toastId;

        try {
            toastId = toast.loading('Loading...');

            const result = await signIn('email', {
                email,
                redirect: false,
            });
            
            if (result && result.error) {
                toast.error('Not authorized to sign in', { id: toastId });
            } else {
                setConfirm(true);
                toast.dismiss(toastId);
            }
            
        } catch (err) {
            console.log(err);
            toast.error('Unable to sign in', { id: toastId })
        } finally {
            setDisabled(false);
        }
    }, []);

    return (
        <Formik
            initialValues={{ email: ''}}
            onSubmit={handleSubmit}
            validationSchema={schema}
        >
            {({ values }) => (
                <Form
                    className="flex flex-col justify-center items-center gap-5 h-screen"
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

                    <ConfirmEmail email={values.email} visible={confirm} />
                </Form>
            )}
        </Formik>
    );
}

export default AuthForm;