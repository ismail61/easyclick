
const SetAllPostCodes = (postCodes) => { 
    const tmp = [];
    postCodes?.forEach(dis => {
        tmp.push({name : dis?.upazila});
    })
    return tmp;
}

export { SetAllPostCodes }