import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IReview } from '@/interfaces/community';
import styled from '@emotion/styled';
import { Pagination, TextField } from '@mui/material';

import WriteIcon from '@/../public/icons/edit.svg';
import SearchIcon from '@/../public/icons/Group.svg';
import ReviewItem from '@/components/Community/ReviewItem';
import CommunityRouter from '@/components/Community/CommunityRouter';
import { ROUTES } from '@/constants/routes';
import { getBoardList } from '@/apis/community';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';

const Review = () => {
  const router = useRouter();
  const [reviewData, setReviewData] = useState<Array<IReview>>([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    (async () => {
      const data =
        keyword !== ''
          ? await getBoardList('TRAVEL_REVIEW', page)
          : await getBoardList('TRAVEL_REVIEW', page, keyword);
      setReviewData(data?.content);
      setTotalPage(data.totalPages);
    })();
  }, [page]);

  const getSearchData = async () => {
    const searchData = await getBoardList('TRAVEL_REVIEW', 1, keyword);
    setReviewData(searchData?.content);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.nativeEvent.isComposing === false && event.key) === 'Enter') {
      getSearchData();
    }
  };

  const searchClick = () => {
    getSearchData();
  };

  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const moveLogin = () => {
    if (cookies.accessToken) {
      router.push(ROUTES.REVIEW_ADD);
    } else {
      return dispatch(
        setModal({
          isOpen: true,
          text: MESSAGES.INVALID_AUTH,
          onClickOk: () => {
            dispatch(
              setModal({
                isOpen: false,
              }),
            ),
              router.push(ROUTES.LOGIN);
          },
        }),
      );
    }
  };

  return (
    <ReviewContent>
      <TopArea>
        <p>
          생생한 <span className="textBold">여행후기</span>를 남겨주시고{' '}
          <span className="textBold">커피 한 잔</span>의 행운을 누려보세요.
        </p>
        <button onClick={() => moveLogin()}>
          <WriteIcon />
          <span>후기쓰기</span>
        </button>
        <InputArea>
          <TextField
            placeholder="검색어를 입력해 주세요."
            className="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon onClick={() => searchClick()} />
        </InputArea>
      </TopArea>

      <>
        <CommunityRouter pathname={router.pathname} />
      </>

      <BottomArea>
        {reviewData && reviewData.length > 0 ? (
          reviewData.map((item, i) => (
            <ReviewItem
              key={item.boardId}
              data={item}
              prev={reviewData[i - 1]?.boardId ? reviewData[i - 1]?.boardId : undefined}
              next={reviewData[i + 1]?.boardId ? reviewData[i + 1]?.boardId : undefined}
              length={reviewData.length}
            />
          ))
        ) : (
          <h3>후기가 존재하지 않습니다.</h3>
        )}
      </BottomArea>

      <PageContent>
        {totalPage > 1 && (
          <Pagination count={totalPage} color="primary" page={page} onChange={pageChange} />
        )}
      </PageContent>
    </ReviewContent>
  );
};

export default Review;

const ReviewContent = styled.div``;

const TopArea = styled.div`
  background-color: #e7f7fe;
  padding: 1rem 1.3rem;
  margin-bottom: 20px;
  display: grid;
  grid-template-rows: 5rem 3rem;
  grid-template-areas:
    'text button'
    'input input';
  .textBold {
    font-weight: bold;
  }
  p {
    font-size: 1.2rem;
    margin: auto;
    grid-area: text;
  }
  button {
    cursor: pointer;
    background-color: #0cb1f3;
    border: 1px solid #0cb1f3;
    border-radius: 8px;
    color: #fff;
    height: 50%;
    margin: auto;
    grid-area: button;
    span {
      margin-left: 5px;
      font-size: 1rem;
      z-index: 1;
    }
  }
`;

const InputArea = styled.div`
  grid-area: input;
  text-align: center;
  position: relative;
  .search {
    width: 60%;
    border-radius: 8px;
    input {
      padding: 5px;
      background-color: #fff;
    }
  }
  svg {
    position: absolute;
    right: 20%;
    width: 30px;
    height: 30px;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const BottomArea = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  h3 {
    margin-top: 50px;
    text-align: center;
  }

  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin: auto;
  }

  @media screen and (max-width: 1200px) {
    padding: 0 8rem;
  }

  @media screen and (max-width: 500px) {
    padding: 0 18px;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;
