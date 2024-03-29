import PageTitle from '@/components/common/PageTitle';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Table, TableRow, TableCell, Button, Chip, TableBody } from '@mui/material';
import { ROUTES } from '@/constants/routes';
import { deleteAdminProduct, getAdminProductDetail } from '@/apis/admin/product';
import { IProductDetail } from '@/interfaces/product';
import Image from '@/components/common/Image';
import { formatPrice, formatProductStatus, formatTypeToMbti } from '@/utils/format';
import Parser from 'html-react-parser';
import AdminTableHead from '@/components/common/AdminTableHead';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';

const ProductDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<IProductDetail>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getAdminProductDetail(Number(router.query.id));
        setProduct(data);
      } catch {
        return dispatch(
          setModal({
            isOpen: true,
            onClickOk: () => dispatch(setModal({ isOpen: false })),
            text: MESSAGES.PRODUCT_DETAIL.ERROR_GET_DETAIL,
          }),
        );
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAdminProduct(id);
      dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.COMPLETE_DELETE_PRODUCT,
        }),
      );
      router.push(ROUTES.ADMIN.PRODUCT);
    } catch {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.ERROR_DELETE_PRODUCT,
        }),
      );
    }
  };

  return (
    <Container>
      <PageTitle title="상품 상세" fontSize="20px" padding="10px" />
      <form>
        <Table>
          <TableRow>
            <TableCell align="center">썸네일</TableCell>
            <TableCell align="left" colSpan={3}>
              <Image
                src={product && product.thumbnail}
                alt={product && product.name}
                width="400px"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              카테고리
            </TableCell>
            <TableCell align="left" width="30%" colSpan={3}>
              <ChipWrap>
                {product &&
                  product.categories!.length > 0 &&
                  product.categories!.map((item, idx) => (
                    <Chip key={idx} label={item.categoryName} />
                  ))}
              </ChipWrap>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" width="15%">
              상품명
            </TableCell>
            <TableCell align="left" width="30%">
              {product && product.name}
            </TableCell>
            <TableCell align="center">상품상태</TableCell>
            <TableCell align="left">
              {product && formatProductStatus(product.productStatus!)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">가격</TableCell>
            <TableCell align="left">{product && formatPrice(product.price)}</TableCell>
            <TableCell align="center">싱글룸가격</TableCell>
            <TableCell align="left">{product && formatPrice(product.singleRoomPrice!)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">지역</TableCell>
            <TableCell align="left">{product && product.area}</TableCell>
            <TableCell align="center">항공</TableCell>
            <TableCell align="left">{product && product.airplane}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">특징</TableCell>
            <TableCell align="left">{product && product.feature}</TableCell>
            <TableCell align="center">추천유형</TableCell>
            <TableCell align="left">{product && formatTypeToMbti(product.type!)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">요약정보</TableCell>
            <TableCell align="left" colSpan={3}>
              {product && product.summary}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상품옵션</TableCell>
            <TableCell align="left" colSpan={3}>
              <Table>
                <AdminTableHead titles={['출발일자', '도착일자', '최대인원', '최대싱글룸']} />
                <TableBody>
                  {product && product.productOptions!.length > 0 ? (
                    product.productOptions!.map((item, idx) => (
                      <TableRow key={idx} hover>
                        <TableCell align="center">{item.startDate}</TableCell>
                        <TableCell align="center">{item.endDate}</TableCell>
                        <TableCell align="center">{item.maxPeople}</TableCell>
                        <TableCell align="center">{item.maxSingleRoom}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <EmptyText>등록된 상품 옵션이 없습니다.</EmptyText>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">상세정보</TableCell>
            <TableCell align="left" colSpan={3}>
              {product && Parser(product.detail)}
            </TableCell>
          </TableRow>
        </Table>
        <ButtonWrap>
          <Button variant="outlined" onClick={() => handleDelete(product!.productId!)}>
            숨김
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              router.push(
                { pathname: ROUTES.ADMIN.PRODUCT_EDIT, query: { id: product?.productId } },
                ROUTES.ADMIN.PRODUCT_EDIT,
              )
            }
          >
            수정
          </Button>
        </ButtonWrap>
      </form>
    </Container>
  );
};

export default withAuth(ProductDetail);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const EmptyText = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
