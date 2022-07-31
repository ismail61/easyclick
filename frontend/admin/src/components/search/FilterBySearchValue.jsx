const FilterByID = (array, searchValue) => {
    const filtered = array?.filter(arr => {
        return (
            arr?._id?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1 
        )
    });
    return filtered
}
export { FilterByID }   