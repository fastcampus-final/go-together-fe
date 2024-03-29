import { ROUTES } from '@/constants/routes';
import { IReview } from '@/interfaces/community';
import { formatUserName } from '@/utils/format';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  data: IReview;
  prev: number | undefined;
  next: number | undefined;
  length: number;
}

const ReviewItem = ({ data, prev, next, length }: Props) => {
  const router = useRouter();
  const imageUrl = data.boardThumbnail;

  return (
    <ItemContent
      image={imageUrl}
      onClick={() =>
        router.push(
          {
            pathname: ROUTES.REVIEW_BY_ID(data.boardId),
            query: {
              id: data.boardId,
              prev: prev,
              next: next,
              length: length,
            },
          },
          ROUTES.REVIEW_BY_ID(data.boardId),
        )
      }
    >
      <p className="reviewTitle">{data.boardTitle}</p>
      <p className="user">{formatUserName(data.userName)}</p>
      <p className="date">{data.createdDate}</p>
    </ItemContent>
  );
};

export default ReviewItem;

const ItemContent = styled.div<{ image: string }>`
  cursor: pointer;
  border-radius: 8px;
  width: 22%;
  aspect-ratio: 1 / 1;
  filter: brightness(80%);
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  padding: 2rem;
  position: relative;
  &:hover {
    filter: brightness(100%);
    transition: all 0.5s;
  }
  .reviewTitle {
    line-height: 1.5rem;
    margin-right: 10%;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user {
    position: absolute;
    bottom: 2.2rem;
    right: 1rem;
  }
  .date {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;
