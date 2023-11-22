
import { redirect } from "next/navigation";

import { Pclient } from "@/lib/prismadb";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/app/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "./_components/categories";

import {getCurrentUser} from "@/app/actions/getCurrentUser";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const categories = await Pclient.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
    userId:user.id,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories}
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;