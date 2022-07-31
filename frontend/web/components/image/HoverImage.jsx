import Swal from "sweetalert2"

export const imageHover = async (url, alt) => {
    await Swal.fire({
        imageUrl: `${url}`,
        imageWidth: 600,
        imageHeight: 400,
        imageAlt: alt
    })
}