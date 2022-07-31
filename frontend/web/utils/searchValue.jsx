export const FilterProducts = (array, searchValue) => {
    const filtered = array?.filter(arr => {
        return (
            arr?.product_name?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 
        )
    });
    return filtered
}