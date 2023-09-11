import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MdShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 3,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '1.2rem',
    backgroundColor: 'red'
  },
}));

export default function CartIcon() {
  // const cartItems = useSelector(state => state.cart.totalQuantity);
  const navigate = useNavigate();
  return (
    <IconButton aria-label='cart' onClick={() => navigate('/cart')}>
      <StyledBadge badgeContent={9} color='secondary'>
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--color-nav-lighter)',
            fontSize: '2rem',
            padding: '.6rem ',
            borderRadius: '50%',
            backgroundColor: '#F1F1F1',
          }}>
          <MdShoppingCart />
        </span>
      </StyledBadge>
    </IconButton>
  );
}
