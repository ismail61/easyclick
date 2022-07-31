// icon -> /* {<i className="fas fa-arrow-alt-circle-right" />} */
const Button = ({
    border,
    color,
    backgroundColor,
    buttonText,
    fontSize,
    onClick,
    radius,
    disabled,
    className,
    icon
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor,
                border,
                color,
                fontSize,
                borderRadius: radius ?? '5%',
            }}
            className={className}
            disabled={disabled ?? false}
        >
            {icon && icon}
            {buttonText}
        </button>
    );
};

export default Button;
