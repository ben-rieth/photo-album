import axios from 'axios';
import { type FC, useState, type FormEvent, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    file: yup.mixed().required(),
});

type AddImageProps = {
    albumId: string;
}

const AddImage : FC<AddImageProps> = ({ albumId }) => {

    const [disabled, setDisabled] = useState<boolean>(false);
    const [file, setFile] = useState<string>('');
    const [imgSrc, setImgSrc] = useState<string>('');

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) { return; }

        const file = files[0];

        const reader = new FileReader();

        reader.addEventListener('load', async () => {
            setImgSrc(reader.result as string);
        }, false);

        if (file) {
            if (file.size <= 10 * 1024 * 1024) {
                reader.readAsDataURL(file);
                setFile(e.target.value);
            }
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        let toastId;
        try {
            setDisabled(true);
            toastId = toast.loading('Uploading Image');

            await axios.post(
                `/api/album/image-upload`,
                { image: imgSrc, albumId, tags: []}
            );

            toast.success('Successfully uploaded image', { id: toastId });
        } catch (err) {
            console.log(err);
            toast.error('Unable to upload', { id: toastId })
        } finally {
            setDisabled(false);
            setFile('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="block" htmlFor="picture">Choose Image to Upload</label>
            <p>Current File: {file}</p>
            <input 
                id="picture"
                disabled={disabled}
                type="file"
                accept="image/*"
                value={file}
                onChange={handleImageChange}
                className="text-transparent"
            />
            <button type='submit'>
                Submit Photo
            </button>
        </form>
    )

    // const handleSubmit = async (values: FormikValues, actions: FormikHelpers) => {
        // const { file } = values;
    
        // if (!file) return;
        
        // const reader = new FileReader();
        // const filename = file?.name?.split('.')?.[0] ?? 'New File';
        
        // reader.addEventListener('load', async () => {
        //     const imgSrc = reader.result;
            
        //     let toastId;
        //     try {
        //         setDisabled(true);
        //         toastId = toast.loading('Uploading Image');

        //         await axios.post(
        //             `/api/album/image-upload`,
        //             { image: imgSrc, albumId, tags: []}
        //         );

        //         toast.success('Successfully uploaded image');
        //     } catch (err) {
        //         console.log(err);
        //         toast.error('Unable to upload', { id: toastId })
        //     } finally {
        //         setDisabled(false);
        //     }
        // });
        // reader.readAsDataURL(filename);

    // }

    // return (
    //     <Formik
    //         initialValues={{
    //             file: undefined,
    //         }}
    //         validationSchema={formSchema}
    //         onSubmit={handleSubmit}
    //     >
    //         {({ handleChange, handleBlur, values }) => (
    //             <Form>
                    // <input 
                    //     disabled={disabled}
                    //     type="file"
                    //     accept="image/*"
                    //     onChange={handleChange}
                    //     onBlur={handleBlur}
                    //     value={values.file || ''} 
                    //     name="file"
                    // />
    //                 <button type="submit">
    //                     Submit Photo
    //                 </button>
    //             </Form>
    //         )}
            
    //     </Formik>
    // );
};

export default AddImage;