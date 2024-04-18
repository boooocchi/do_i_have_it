import { gql, useQuery } from '@apollo/client';
import React from 'react';

import Loading from '@/components/elements/message/Loading';
import SmtWrongMessage from '@/components/elements/message/SmtWrongMessage';
import MainLayout from '@/components/layouts/layout/MainLayout';
import WardrobeDisplaySection from '@/features/wardrobe/components/WardrobeDisplaySection';
import { useAuth } from '@/hooks/useAuth';

export const GET_All_PIECES_QUERY = gql`
  query AllPieces($userId: String!) {
    all_pieces(userId: $userId) {
      id
      category
      createdAt
      imageUrl
      title
      color
      description
    }
  }
`;

const Page = () => {
  const { userId } = useAuth();

  const {
    data: wardrobeData,
    loading: wardrobeLoading,
    error,
  } = useQuery(GET_All_PIECES_QUERY, {
    variables: { userId },
  });

  if (error) {
    return (
      <MainLayout title="Wardrobe">
        <SmtWrongMessage />
      </MainLayout>
    );
  }

  return (
    <>
      {wardrobeLoading ? (
        <Loading size="large"></Loading>
      ) : (
        <MainLayout title="Wardrobe">
          <WardrobeDisplaySection allPieces={wardrobeData?.all_pieces}></WardrobeDisplaySection>
        </MainLayout>
      )}
    </>
  );
};

export default Page;
