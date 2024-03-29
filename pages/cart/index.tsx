import { deleteCart, getCart } from '@/apis/cart';
import CartCard from '@/components/Cart/CartCard';
import PageTitle from '@/components/common/PageTitle';
import { MESSAGES } from '@/constants/messages';
import withAuth from '@/components/common/PrivateRouter';
import { ROUTES } from '@/constants/routes';
import { ICart } from '@/interfaces/cart';
import { RootState } from '@/store';
import { deleteCartState, setCartState } from '@/store/cart';
import { setModal } from '@/store/modal';
import { COLORS } from '@/styles/colors';
import { formatPrice } from '@/utils/format';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart: ICart[] = useSelector((state: RootState) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checkId, setCheckId] = useState<number[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCart();
        dispatch(setCartState(data));
      } catch {
        return dispatch(
          setModal({
            isOpen: true,
            text: MESSAGES.CART.ERROR_GET_CART,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
          }),
        );
      }
    })();
  }, []);

  const handleCheck = (checked: HTMLInputElement['checked'], id: number) => {
    if (checked) {
      setCheckId((prev) => [...prev, id]);
    } else {
      setCheckId(checkId.filter((checkedId) => checkedId !== id));
    }
  };

  const handleAllCheck = () => {
    if (!allChecked) {
      const idArray: Array<number> = [];
      cart.forEach((item) => idArray.push(item.cartId));
      setCheckId(idArray);
    } else {
      setCheckId([]);
    }
    setAllChecked((prev) => !prev);
  };

  const handleDelete = async () => {
    if (checkId.length === 0) {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.CART.ERROR_NOT_CHECK,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
        }),
      );
    } else {
      try {
        await deleteCart(checkId);
        setCheckId(checkId.filter((item) => !checkId.includes(item)));
        checkId.map((item) => dispatch(deleteCartState(item)));
        setTotalAmount(
          cart
            .filter((item) => item && !checkId.includes(item.cartId))
            .reduce(
              (acc: number, cur: ICart) =>
                acc +
                (cur.productPrice * cur.numberOfPeople +
                  cur.singleRoomPrice * cur.singleRoomNumber),
              0,
            ),
        );
        return dispatch(
          setModal({
            isOpen: true,
            text: MESSAGES.CART.COMPLETE_DELETE,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
          }),
        );
      } catch {
        return dispatch(
          setModal({
            isOpen: true,
            text: MESSAGES.CART.ERROR_DELETE,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
          }),
        );
      }
    }
  };

  return (
    <Container>
      <PageTitle title="장바구니" />
      <CartButtonWrap>
        <Button variant="outlined" onClick={handleAllCheck}>
          전체 선택 ({checkId.length}/{cart.length})
        </Button>
        <Button variant="text" onClick={handleDelete}>
          선택 삭제
        </Button>
      </CartButtonWrap>
      <CartWrap>
        <CartList>
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <CartCard
                key={idx}
                data={item}
                setTotalAmount={setTotalAmount}
                handleCheck={handleCheck}
                checkId={checkId}
                setCheckId={setCheckId}
              />
            ))
          ) : (
            <p>담으신 상품이 없습니다.</p>
          )}
        </CartList>
        <AmountWrap>
          <PriceText>
            <p>총 상품</p>
            <p>{cart.length} 개</p>
          </PriceText>
          <PriceText>
            <p>예약 금액</p>
            <p>{formatPrice(totalAmount)}</p>
          </PriceText>
          <PriceText>
            <p>할인 금액</p>
            <p>0 원</p>
          </PriceText>
          <PriceText>
            <p>총 예약 금액</p>
            <p>{formatPrice(totalAmount)}</p>
          </PriceText>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                {
                  pathname: ROUTES.ORDER,
                  query: {
                    amount: totalAmount,
                    items: JSON.stringify(cart),
                  },
                },
                '/order',
              )
            }
          >
            예약하기
          </Button>
        </AmountWrap>
      </CartWrap>
    </Container>
  );
};

export default withAuth(Cart);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 16px 0;
  @media (max-width: 1200px) {
    padding: 16px;
  }
`;

const CartButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0 20px;
`;

const CartWrap = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const AmountWrap = styled.div`
  width: 40%;
  box-sizing: border-box;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid ${COLORS.gray};
  gap: 20px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const CartList = styled.div`
  width: 60%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const PriceText = styled.div`
  display: flex;
  justify-content: space-between;
`;
