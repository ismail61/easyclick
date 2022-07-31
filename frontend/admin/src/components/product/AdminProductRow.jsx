/* eslint-disable jsx-a11y/alt-text */
import { IconButton, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { SuccessToast, TryCatch } from 'utils';
import { dynamicFeaturesHandler } from 'services/product/ProductService';
import { imageHover } from 'components/hoverImage/HoverImage';
import { Link, useNavigate } from 'react-router-dom';

const AdminProductRow = (props) => {
    const { product } = props;
    const history = useNavigate();
    const editProduct = async (id) => {
        history(`/edit-product/${id}`)
    };
    const activeProduct = async (type, id) => {
        TryCatch(async () => {
            TryCatch(async () => {
                await dynamicFeaturesHandler(type, id);
                SuccessToast('Product Activated Successful');
                props.getAllProducts();
            });
        });
    };
    const deActiveProduct = async (type, id) => {
        TryCatch(async () => {
            await dynamicFeaturesHandler(type, id);
            SuccessToast('Product De Activated Successful');
            props.getAllProducts();
        });
    };
    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell component="th" scope="row">
                        <Link to={{
                            pathname: `/product/${product?._id}`
                        }}>
                            <small>{product.name}</small>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <img
                            height="100px"
                            width="80px"
                            className="img-fluid ml-5 m-2"
                            style={{ cursor: 'pointer' }}
                            src={product.image}
                            onClick={() => imageHover(product.image)}
                        />
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                        <del>{product?.price}</del>
                        <br />
                        {product?.special_price}
                    </TableCell>
                    <TableCell>
                        {product.quantity > 5 ? (
                            <span className="text-success">
                                {product.quantity}
                            </span>
                        ) : (
                            <span className="text-danger">
                                {product.quantity}
                            </span>
                        )}
                    </TableCell>
                    <TableCell>
                        <small>
                            Created<br />
                            {product.created?.slice(0, 10)}
                            <br />
                            Updated<br />
                            {product.updated?.slice(0, 10)}
                        </small>
                    </TableCell>
                    <TableCell>
                        <IconButton
                            onClick={() => editProduct(product._id)}
                            size="small"
                            title="Edit"
                            className="px-1"
                            sx={{ color: "green" }}
                        >
                            <i className="fas fa-edit"></i>
                        </IconButton>
                        {
                            (props.type === 'online' || props.type === 'active') ? <>
                                <IconButton
                                    onClick={() => deActiveProduct('deactive',product._id)}
                                    size="small"
                                    title="DeActive"
                                    className="px-1"
                                >
                                    <i className="fa-solid fa-ban"></i>
                                </IconButton>
                            </> : null
                        }
                        {
                            props.type === 'deactive' ? <>
                                <IconButton
                                    onClick={() => activeProduct('active', product._id)}
                                    size="small"
                                    title="Active"
                                    className="px-1"
                                    sx={{ color: "green" }}
                                >
                                    <i className="fa-solid fa-square-check"></i>
                                </IconButton>
                            </> : null
                        }
                    </TableCell>
                </TableRow>
            </React.Fragment>
        </>
    )
}

export default AdminProductRow