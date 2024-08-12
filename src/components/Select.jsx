export const Select =
  () =>
  ({
    options = [],
    label,
    value,
    onChange,
    placeholder = "Select an option",
    className = "",
    labelClassName = "",
    selectClassName = "",
    ...props
  }) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && <label className={`mb-2 ${labelClassName}`}>{label}</label>}
        <select
          value={value}
          onChange={onChange}
          className={`px-4 py-2 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${selectClassName}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
