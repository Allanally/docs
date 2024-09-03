import { db } from "@/lib/db";
import { Document, Attachment } from "@prisma/client";

type GetDocuments = {
  userId: string;
};

export const getDocuments = async ({
  userId,
}: GetDocuments): Promise<(Document & { attachments: Attachment[] })[]> => {
  try {
    const documents = await db.document.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Attachments: true, 
      },
    });

    return documents.map((doc) => ({
      ...doc,
      attachments: doc.Attachments, 
    }));
  } catch (error) {
    console.log("[GET_DOCUMENTS]", error);
    return [];
  }
};
