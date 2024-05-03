import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, FormGroup } from '@mui/material';
import { FormButtons } from 'shared/components';
import { getPagesApi, updatePageApi } from 'services/pagesApi';
import {
  MyHelpSection,
  SertificatesSection,
  VideoSection,
} from 'modules/mainPage';

const MainPage = () => {
  const [page, setPage] = useState(null);

  const [canSave, setCanSave] = useState(false);

  const pageRef = useRef(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { _id, items, ...body } = page;
      items;
      const data = await updatePageApi(_id, body);
      setCanSave(false);
      pageRef.current = JSON.stringify(data);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error.message);
    } finally {
      setCanSave(false);
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
      const data = await getPagesApi('main');
      setPage(data);
      pageRef.current = JSON.stringify(data);
    };
    getPages();
  }, []);

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
