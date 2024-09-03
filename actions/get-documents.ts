import { Document } from "@prisma/client";
import { db } from "@/lib/db";

type GetDocuments = {
    userId: string;
}

export const getDocuments = async ({
    userId
}: GetDocuments): Promise<Document[]> => {
    try {
        const documents = await db.document.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return documents;
    } catch (error) {
        console.log("[GET_DOCUMENTS]", error);
        return [];
    }
};
