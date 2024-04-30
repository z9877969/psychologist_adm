import {
  Box,
  FormGroup,
  IconButton,
  InputLabel,
  TextField,
} from '@mui/material';
import IconPlus from '@mui/icons-material/ControlPoint';
import IconMinus from '@mui/icons-material/RemoveCircleOutline';
import { nanoid } from 'nanoid';

const ImagesList = ({ images, setImages }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
        <InputLabel id="category">Зображення</InputLabel>
        <IconButton
          aria-label="delete"
          onClick={() => setImages([...images, { url: '' }])}
        >
          <IconPlus />
        </IconButton>
      </Box>
      <FormGroup
        sx={{
          '& > :not(style)': { mb: 1 },
        }}
      >
        {images.map((el, idx) => (
          <Box key={nanoid()} sx={{ display: 'flex', width: '100%' }}>
            <TextField
              variant="outlined"
              fullWidth
              label={`Зображення-${idx + 1}`}
              value={el.url}
              onChange={(e) => {
                setImages(
                  images.map((el, i) =>
                    i !== idx ? el : { ...el, url: e.target.value }
                  )
                );
              }}
            />
            <IconButton
              aria-label="delete"
              onClick={() => setImages(images.filter((_, i) => i !== idx))}
            >
              <IconMinus />
            </IconButton>
          </Box>
        ))}
      </FormGroup>
    </Box>
  );
};

export default ImagesList;
