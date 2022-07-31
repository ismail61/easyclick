
const SetAllDistricts = (districts) => { 
    const tmp = [];
    districts?.forEach(dis => {
        tmp.push({name : dis});
    })
    return tmp;
}

export { SetAllDistricts }