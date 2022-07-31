import { error } from "../../utils";
import * as address from '@bangladeshi/bangladesh-address';
import _ from "lodash";

function addressController() {
    return {
        // Get All Cities
        getCities: async (req, res) => {
            const divisions = address.allDivision();
            let district = [];
            divisions?.forEach(div => {
                const dis = address?.districtsOf(div?.toLowerCase());
                let tempAddress = []
                dis?.forEach(district => {
                    tempAddress.push({
                        key: district,
                        name: district
                    })
                })
                district.push([...tempAddress]);
            })
            return res.status(200).send(_.flatten(district));
        },
    }
}
export { addressController };