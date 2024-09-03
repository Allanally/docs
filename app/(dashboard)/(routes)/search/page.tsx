import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getDocuments } from "@/actions/get-documents";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DocumentsList } from "@/components/documents-list";

interface SearchPageProps {
  searchParams: {
    title?: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const documents = await getDocuments({
    userId,
  });

  return (
    <>
      <div className="px-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="px-6 mt-6">
        <DocumentsList items={documents} />
      </div>
    </>
  );
};

export default SearchPage;
