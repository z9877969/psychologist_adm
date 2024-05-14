import { useCallback } from 'react';
import { FieldsGroupWrapper, Textarea } from 'shared/components';

const TextList = ({ id, content, setBlog }) => {
  const handleContentChange = useCallback(
    (e) => {
      const { value } = e.target;
      setBlog((p) =>
        p.map((el) =>
          el.id !== id
            ? el
            : {
                ...el,
                content: value.split('\n'),
              }
        )
      );
    },
    [setBlog, id]
  );
  return (
    <FieldsGroupWrapper label="Список" sx={{ border: 'none' }}>
      <Textarea
        value={content?.join('\n') || ''}
        onChange={handleContentChange}
        sx={{ width: '100%' }}
      />
    </FieldsGroupWrapper>
  );
};

export default TextList;
