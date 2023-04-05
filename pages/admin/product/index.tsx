import React, { useEffect, useState } from 'react';
import withAuth from '@/components/common/PrivateRouter';
import styled from '@emotion/styled';
import PageTitle from '@/components/common/PageTitle';
import AdminTableHead from '@/components/common/AdminTableHead';
import { Button, Pagination, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import { getAdminProduct } from '@/apis/admin/product';
import { IProduct } from '@/interfaces/product';
import { formatPrice } from '@/utils/format';

const Product = () => {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAdminProduct();
      setProduct(data.content);
    })();
  }, []);

  return (
    <Container>
      <PageTitle title="상품 관리" fontSize="20px" padding="10px" />
      <TableWrap>
        <Table>
          <AdminTableHead titles={['번호', '제목', '가격']} />
          <TableBody>
            {product &&
              product.length > 0 &&
              product.map((item, idx) => (
                <TableRow
                  key={idx}
                  style={{ cursor: 'pointer' }}
                  hover
                  onClick={() => router.push(ROUTES.ADMIN.PRODUCT_BY_ID(String(item.productId)))}
                >
                  <TableCell align="center" width="200px">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="center">{item.productName}</TableCell>
                  <TableCell align="center">{formatPrice(item.productPrice)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ButtonWrap>
          <Button variant="outlined">삭제</Button>
          <Pagination count={5} color="primary" />
          <Button variant="contained" onClick={() => router.push(ROUTES.ADMIN.PRODUCT_ADD)}>
            등록
          </Button>
        </ButtonWrap>
      </TableWrap>
    </Container>
  );
};

export default withAuth(Product);

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const TableWrap = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
