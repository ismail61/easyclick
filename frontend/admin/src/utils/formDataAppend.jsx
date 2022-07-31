const FormDataAppend = (formData, data, keys) => {
    let index = 0;
    for (let field in data) {
        formData.append(keys[index], data[field]);
        index++;
    }
    return formData;
}
export { FormDataAppend }
