import axios from 'axios';
import { type FC, useState, type FormEvent, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';

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
};

export default AddImage;