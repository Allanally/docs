import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { getDocuments } from "@/actions/get-documents";

const DocumentIdPage = async ({
  params,
}: {
  params: {
    documentId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const documents = await getDocuments({ userId });
  const document = documents.find((doc) => doc.id === params.documentId);

  if (!document) {
    console.log("Document not found:", params.documentId);
    return redirect("/");
  }

  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-2">
        <div className="p-4">
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {document.title}
            </h2>
          </div>
          <Separator />
          
          {document.attachments?.length && (
    <>
    <Separator />
    <div>
      {document.attachments.map((attachment) => (
        <a
          href={attachment.url}
          target="_blank"
          key={attachment.id}
          className="flex items-center p-3 w-[60%] gap-4 bg-sky-200 border text-sky-700 rounded-md hover:underline z-50"
        >
          <File />
          <p className="line-clamp-1">{attachment.name}</p>
        </a>
      ))}
    </div>
  </>
)}

        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
