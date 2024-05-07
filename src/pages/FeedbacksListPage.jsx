import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  deleteFeedbackApi,
  getFeedbacksListApi,
  updateFeedbackStatusApi,
} from 'services/feedbacksApi';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from 'react-redux';
import { setError as setErrorAction } from '@redux/error/errorsSlice';
import { createAxiosError } from 'helpers';
import { setLoading } from '@redux/loader/loaderSlice';

const FeedbackListPage = () => {
  const dispatch = useDispatch();
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  const setIsLoading = useCallback(
    (state) => {
      dispatch(setLoading(state));
    },
    [dispatch]
  );

  const handleChangeStatus = async (e, id) => {
    try {
      const { checked } = e.target;
      setIsLoading(true);
      const data = await updateFeedbackStatusApi({ id, showStatus: checked });
      setFeedbacks((p) => p.map((el) => (el._id !== id ? el : data)));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      setIsLoading(true);
      await deleteFeedbackApi(id);
      setFeedbacks((p) => p.filter((el) => el._id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        setIsLoading(true);
        const data = await getFeedbacksListApi();
        setFeedbacks(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getFeedbacks();
  }, [setIsLoading]);

  useEffect(() => {
    if (error) {
      const { message, status } = createAxiosError(error);
      dispatch(setErrorAction({ message, status }));
    }
  }, [error, dispatch]);

  return (
    <Box sx={{ pb: 3 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right" width={180}>
                Phone
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map(({ _id, isShow, name, age, phone, message }) => (
              <TableRow key={_id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                  <Switch
                    value="isShow"
                    checked={isShow}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={(e) => handleChangeStatus(e, _id)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{age}</TableCell>
                <TableCell align="left">{message}</TableCell>
                <TableCell align="right">{phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteFeedback(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FeedbackListPage;
