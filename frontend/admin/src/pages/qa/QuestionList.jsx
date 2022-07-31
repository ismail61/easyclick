
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { SuccessToast } from 'utils';
import { getAllQAs, replyQA } from 'services/qa/QAService';

export default function QuestionList() {
    const [qas, setQAs] = React.useState([]);
    const getQAs = async () => {
        try {
            const res = await getAllQAs();
            setQAs(res?.data);
        } catch (error) {

        }
    }
    const qaReplyHandle = async (product_id, id) => {
        const res = await Swal.fire({
            text: `Enter reply message`,
            input: 'text',
            confirmButtonText: 'Submit',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to input text!'
                }
            },
        })
        if (res?.isConfirmed && res?.value) {
            await replyQA(product_id, id, { reply: res?.value });
            SuccessToast('Replied!')
            getQAs()
        }
    }
    React.useEffect(() => {
        getQAs();
    }, [])

    return (
        <TableContainer component={Paper} className="p-5">
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {qas?.length > 0 ? <>
                        {
                            qas?.map((product, index) => (
                                product?.questions_and_answers && product?.questions_and_answers?.map(qa => {
                                    return (
                                        <>
                                            {
                                                !qa?.reply ? <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell>
                                                        {qa?.user_id?.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {product?.product_name}
                                                    </TableCell>
                                                    <TableCell>{qa?.text}</TableCell>
                                                    <TableCell>
                                                        <small><Button variant="outlined" size="small" color="success" sx={{ marginY: 1 }} onClick={() => qaReplyHandle(product?._id, qa?._id)}>
                                                            Reply
                                                        </Button>

                                                        </small>
                                                    </TableCell>
                                                </TableRow> : null
                                            }

                                        </>
                                    )
                                })
                            ))
                        }
                    </> : null}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
