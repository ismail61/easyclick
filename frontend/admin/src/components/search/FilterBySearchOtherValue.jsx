const FilterByProperty = (array, searchValue, property) => {
    const filtered = array?.filter(arr => {
        switch (property) {
            case 'voucher_code':
                return (
                    arr?.code?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
                )
            case 'free_shipping_name':
                return (
                    arr?.name?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
                )
            case 'campaign_name':
                return (
                    arr?.name?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
                )
            case 'product_name':
                return (
                    arr?.name?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
                )
            default:
                return null
        }
    });
    return filtered
}
export { FilterByProperty }