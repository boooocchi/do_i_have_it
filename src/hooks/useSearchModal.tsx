import { useQuery } from '@apollo/client';
import { Categories, Piece } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect } from 'react';

import ImageWithLoading from '@/components/elements/ImageWithLoading';
import Loading from '@/components/elements/message/Loading';
import SearchResultModal from '@/components/elements/modal/SearchResultModal';
import { dendoOutfitType } from '@/features/dendoOutfitGallery/types/types';
import { useWardrobe } from '@/features/wardrobe/hooks/useWardrobe';
import { upperCamelCase } from '@/features/wardrobe/utility/upperCamelCase';
import { DENDOOUTFIT_QUERY } from '@/pages/dendoOutfitGallery/[id]';
import { GET_All_PIECES_QUERY } from '@/pages/wardrobe/[id]';

import { useAuth } from './useAuth';

// type PiecesSearchResult =
//   | {
//       title: string;
//       category: string;
//       createdAt: string;
//       imageUrl: string;
//       id: string;
//     }[]
//   | null;

// type DendoOutfitsSearchResult =
//   | {
//       title: string;
//       imageUrl: string;
//       createdAt: string;
//       id: string;
//     }[]
//   | null;

type SearchHook = () => {
  Modal: React.ReactNode;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSearch: SearchHook = () => {
  const { userId } = useAuth();
  const [searchText, setSearchText] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const categoriesArray = Object.values(Categories);

  const { data: wardrobeData, loading: wardrobeDataLoading } = useQuery(GET_All_PIECES_QUERY, {
    variables: { userId },
  });
  const { data: all_dendoOutfit_data, loading: all_dendoOutfit_loading } = useQuery(DENDOOUTFIT_QUERY, {
    variables: {
      userId,
    },
  });

  const [data, setData] = React.useState<Piece[]>([]);
  const [outfitData, setOutfitData] = React.useState<dendoOutfitType[]>([]);

  useEffect(() => {
    setData(wardrobeData?.all_pieces);
    setOutfitData(all_dendoOutfit_data?.dendoOutfits);
  }, [wardrobeData, all_dendoOutfit_data]);

  const { sortedWardrobeData, dendoOutfitData, handleSearchTextChange } = useWardrobe({
    wardrobeData: data,
    outfitData: outfitData,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleSearchTextChange('');
    setSearchText('');
  };

  const Modal = (
    <SearchResultModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="h-[600px] w-[850px] bg-gray rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-lg px-2xl flex flex-col gap-3 items-center  fixed z-999">
        <div className="relative flex w-full justify-center items-center">
          <div className={`relative justify-center items-center ${searchText && 'mb-3'}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#00110F"
              className="w-4 h-4 absolute left-2 top-[7px]"
            >
              <path
                strokeLinecap="square"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleSearchTextChange(e.target.value);
              }}
              placeholder="search your wardrobe"
              type="text"
              className="w-[250px] h-[30px] mr-sm p-sm pl-xl text-sm rounded-md bg-lightGreen"
            />
          </div>
          <button className="absolute right-0 w-10 top-2" onClick={handleModalClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="w-full  overflow-y-scroll flex flex-col gap-4">
          <div>
            <h1 className="font-bold mb-2 text-xl">Your Wardrobe</h1>
            <div className="flex flex-col w-full overflow-hidden">
              {wardrobeDataLoading && <Loading size="small"></Loading>}
              {!wardrobeDataLoading && !sortedWardrobeData && <div className="text-sm h-10">No search result</div>}
              {sortedWardrobeData &&
                categoriesArray.map((category) => {
                  const dataOfTheCategory = sortedWardrobeData[category];
                  if (dataOfTheCategory && dataOfTheCategory.length === 0) return <></>;
                  return (
                    <div className="flex flex-col w-full " key={category}>
                      <div>{upperCamelCase(category)}</div>
                      <div className="flex gap-3 mb-3 overflow-x-scroll">
                        {dataOfTheCategory?.map((piece) => (
                          <div key={piece.id}>
                            <Link href={`/piece/${piece.id}`} onClick={handleModalClose}>
                              <div className="relative w-[150px] aspect-[2/3] rounded-md overflow-hidden">
                                <ImageWithLoading alt="piece image" url={piece.imageUrl} />
                              </div>
                            </Link>

                            <div className="text-sm">{piece.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-2 text-xl">Your Outfit</h2>
            <div className="flex w-full gap-3 overflow-x-scroll">
              {all_dendoOutfit_loading && <Loading size="small"></Loading>}
              {!all_dendoOutfit_loading && !dendoOutfitData && <div className="text-sm h-10">No search result</div>}
              {dendoOutfitData?.map((outfit: dendoOutfitType) => {
                return (
                  <div key={outfit.id}>
                    <Link href={`/dendoOutfit/${outfit.id}`} onClick={handleModalClose}>
                      <div className="relative w-[150px] aspect-[2/3] rounded-md overflow-hidden mb-1">
                        <ImageWithLoading
                          alt="outfit image"
                          url={outfit.imageUrl ? outfit.imageUrl : '/image/home/dendo_outfit.jpg'}
                        />
                      </div>
                    </Link>
                    <div className="text-sm">{outfit.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SearchResultModal>
  );

  return { Modal, setIsModalOpen };
};