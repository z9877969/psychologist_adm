import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, FormGroup } from '@mui/material';
import {
  MyHelpSection,
  SertificatesSection,
  VideoSection,
} from 'modules/mainPage';
import { FormButtons } from 'shared/components';
import { getPagesApi, updatePageApi } from 'services/pagesApi';
import { setError as setErrorAction } from '@redux/error/errorsSlice';
import { createAxiosError } from 'helpers/createAxiosError';
import { setLoading } from '@redux/loader/loaderSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(null);
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState(null);

  const pageRef = useRef(null);

  const setIsLoading = useCallback(
    (state) => {
      dispatch(setLoading(state));
    },
    [dispatch]
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // eslint-disable-next-line
      const { _id, items, ...body } = page;
      setIsLoading(true);
      const data = await updatePageApi(_id, body);
      setCanSave(false);
      pageRef.current = JSON.stringify(data);
    } catch (error) {
      setError(error);
    } finally {
      setCanSave(false);
      setIsLoading(false);
    }
  };

  const handleCancelSave = useCallback(() => {
    setPage(JSON.parse(pageRef.current));
    setCanSave(false);
  }, []);

  useEffect(() => {
    if (!canSave && page && pageRef.current) {
      if (JSON.stringify(page) !== pageRef.current) {
        setCanSave(true);
      }
    }
  }, [page, canSave]);

  useEffect(() => {
    const getPages = async () => {
      try {
        setIsLoading(true);
        const data = await getPagesApi('main');
        setPage(data);
        pageRef.current = JSON.stringify(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(true);
      }
    };
    getPages();
  }, [setIsLoading]);

  useEffect(() => {
    if (error) {
      const { message, status } = createAxiosError(error);
      dispatch(setErrorAction({ message, status }));
    }
  }, [error, dispatch]);

  if (!page) return null;

  const { videoSection, sertificateSection, myHelpSection } = page;

  return (
    <Box sx={{ pb: 3 }} component={'form'} onSubmit={handleSubmit}>
      <FormGroup sx={{ pr: 2, mb: 2 }}>
        <Box width={'100%'} sx={{ '& > :not(style)': { mb: 2 } }}>
          <VideoSection
            {...videoSection}
            block="videoSection"
            setPage={setPage}
          />
          <SertificatesSection
            {...sertificateSection}
            block="sertificateSection"
            setPage={setPage}
          />
          <MyHelpSection
            {...myHelpSection}
            block={'myHelpSection'}
            setPage={setPage}
          />
        </Box>
      </FormGroup>

      <FormButtons
        disabledCancel={!canSave}
        disabledSave={!canSave}
        onCancel={handleCancelSave}
      />
    </Box>
  );
};

export default MainPage;
