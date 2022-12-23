import classNames from "classnames";
import { type FC } from "react";

type ConfirmEmailProps = {
    email: string;
    visible: boolean;
}

const ConfirmEmail:FC<ConfirmEmailProps> = ({ email, visible }) => {

    const containerClasses = classNames(
        "flex flex-col items-center justify-center",
        "h-screen w-screen",
        "absolute top-0",
        "bg-sky-500 text-white",
        "transition-opacity ease-out duration-500 motion-reduce:transition-none",
        {
            "opacity-0 pointer-events-none": !visible,
            "opacity-100": visible
        }
    )

    return (
        <div className={containerClasses}>
            <h3
                className="text-2xl font-semibold text-center"
            >
                Confirm Your Email
            </h3>
            <p 
                className="mt-4 text-lg text-center"
            >
                We emailed a link to <strong>{email}</strong>
                <br />
                Check your inbox and click the link in the email to login!
            </p>
        </div>
    )
};

export default ConfirmEmail;