"use client";

import Pagination from "@/app/components/buttons/Pagination";
import NewCard from "@/app/components/cards/NewCard";
import AddCategory from "@/app/components/pages/admin/categories/AddCategory";
import CategoriesCard from "@/app/components/pages/admin/categories/CategoriesCard";
import CardShimmer from "@/app/components/skeletons/CardShimmer";
import PageHeadings from "@/app/components/typography/PageHeadings";
import { getAllCategories } from "@/redux/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Suspense, useCallback, useEffect, useState } from "react";

export interface CategoriesTypes {
  _id: number;
  name: string;
  image: string;
  description: string;
}

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchCategories, setSearchCategories] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isReload, setIsReload] = useState<boolean>(true);
  const itemPerPage = 10;
  const { isLoading, error, categories } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  const totalPages = Math.ceil((categories?.length || 0) / itemPerPage);

  const changePages = useCallback(
    (directionOrPage: "next" | "prev" | number) => {
      setPage((prevPage) => {
        // if (directionOrPage === 0) return "";

        if (typeof directionOrPage === "number") return directionOrPage;

        // if (typeof prevPage === "string") return 1;

        return directionOrPage === "next"
          ? prevPage + 1
          : Math.max(prevPage - 1, 1);
      });
    },
    []
  );

  const onOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, isReload]);
  return (
    <>
      <div className="space-y-7 ">
        <NewCard
          title="Add New Category"
          description="You can categorize courses and list multiple courses under each category."
          onClick={onOpen}
        />
        <PageHeadings
          heading="All Categories"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchCategories(e.target.value)
          }
          value={searchCategories}
          // setReload={() => setIsReload((prev) => !prev)}
          isLoading={isLoading}
        />
        <div className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid gap-1">
          <Suspense fallback={<CardShimmer size={3} />}>
            {categories
              ?.slice((page - 1) * itemPerPage, page * itemPerPage)
              .map((category) => (
                <CategoriesCard
                  key={category._id}
                  setReload={() => setIsReload((prev) => !prev)}
                  categoryId={category._id}
                  onOpen={onOpen}
                  img={category?.image}
                  label={category?.name}
                  description={category?.description}
                  setCategoryId={setCategoryId}
                />
              ))}
          </Suspense>
        </div>
        <Pagination
          changePages={changePages}
          currentPage={page}
          isLoading={isLoading}
          totalPages={totalPages}
        />
      </div>

      <AddCategory
        onOpen={onOpen}
        isModalOpen={isModalOpen}
        setReload={setIsReload}
      />
    </>
  );
};

export default Categories;
