const AuthInput = ({
    label,
    type,
    name,
    className,
    value,
    onChange,
    placeholder,
    required
}) => {
    return (
        <div className="row px-3">
            <label className="mb-1">
                <h6 className="mb-0 text-sm">{label}</h6>
            </label>
            <input
                type={type ?? 'text'}
                name={name}
                className={className}
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? ""}
                required={required ?? false}
            />
        </div>
    );
};

export default AuthInput;
