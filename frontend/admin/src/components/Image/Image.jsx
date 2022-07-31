/* eslint-disable jsx-a11y/alt-text */
const Image = ({
    src,
    alt,
    className
}) => {
    return (
        <img
            src={src ?? ""}
            alt={alt ?? "Image"}
            className={className ?? ""}
        />
    );
};

export default Image;
