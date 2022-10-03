import * as React from 'react';
import PaginationClasses from './Pagination.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function MoviesPagination({ count, changeCurrentPage }) {
  return (
    <Stack className={PaginationClasses.stack} spacing={2}>
      <Pagination size='large' count={count} variant="outlined" shape="rounded" onChange={(_, pageNum) => changeCurrentPage(_, pageNum)} />
    </Stack>
  );
}