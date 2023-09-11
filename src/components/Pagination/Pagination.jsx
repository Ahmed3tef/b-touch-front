
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .Mui-selected': {
      backgroundColor: '#4C4C4C',
      color: '#000',
    },
  }
}),
);
export default function PaginationRounded({ numOfPages, setPage, currentPage }) {

  const classes = useStyles();


  return (
    <div className='flex-center my-[3rem]'>

      <Stack spacing={8}>

        <Pagination count={numOfPages} variant="outlined" className={classes.root}
          shape="rounded" onChange={(event, page) => {
            setPage(page);
          }} page={currentPage} sx={{
            '.MuiPagination-root': { fontSize: '2rem' }
          }} />
      </Stack>
    </div>
  );
}
