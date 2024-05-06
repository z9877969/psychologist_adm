import { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
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

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeStatus = async (e, id) => {
    try {
      const { checked } = e.target;
      setIsLoading(true);
      const data = await updateFeedbackStatusApi({ id, showStatus: checked });
      setFeedbacks((p) => p.map((el) => (el._id !== id ? el : data)));
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.message);
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
      // eslint-disable-next-line
      console.log(error.message);
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
        // eslint-disable-next-line
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFeedbacks();
  }, []);

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
            {feedbacks.map(({ _id, isShow, author, age, phone, message }) => (
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
                  {author}
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
