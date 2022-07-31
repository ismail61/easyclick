
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { SuccessToast } from 'utils';
import { getAllReviews, replyReview } from 'services/review/ReviewService';
import { imageHover } from 'components/hoverImage/HoverImage';

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const getReviews = async () => {
    try {
      const res = await getAllReviews();
      setReviews(res?.data);
    } catch (error) {

    }
  }
  const reviewReplyHandle = async (id) => {
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
      await replyReview(id, { reply: res?.value });
      SuccessToast('Replied!')
      getReviews()
    }
  }
  React.useEffect(() => {
    getReviews();
  }, [])

  return (
    <TableContainer component={Paper} className="p-5">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Reply</TableCell>
            <TableCell>Images</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews?.length > 0 ? <>

            {
              reviews?.map((review, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                      {review?.user_id?.name}
                  </TableCell>
                  <TableCell>
                    <Link to={`/product/${review?.product_id?._id}`}>{review?.product_id?.product_name}</Link>
                  </TableCell>
                  <TableCell>{review?.message}</TableCell>
                  <TableCell>{review?.reply}</TableCell>
                  <TableCell>{
                    review?.image && review?.image?.map(img => {
                      return (
                        <>
                          <img
                            height="40px"
                            width="40px"
                            className="img-fluid ml-5 m-2"
                            style={{ cursor: 'pointer' }}
                            src={img?.url}
                            onClick={() => imageHover(img?.url, 'image')}
                          />
                        </>
                      )
                    })
                  }</TableCell>
                  <TableCell>
                    {review?.rating} <i className="fa fa-star" aria-hidden="true"></i>
                  </TableCell>
                  <TableCell>
                    <small>
                      {
                        review?.reply ? <>*</> : <Button variant="outlined" size="small" color="success" sx={{ marginY: 1 }} onClick={() => reviewReplyHandle(review?._id)}>
                          Reply
                        </Button>
                      }
                    </small>
                  </TableCell>
                </TableRow>
              ))
            }
          </>
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
