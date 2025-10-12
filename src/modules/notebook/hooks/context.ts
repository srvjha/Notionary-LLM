import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ContextIndexingType } from "@/types/context.type";
import { addContext, getAllContextsForActiveSession } from "../actions/context";
import { Source } from "../components/sourceBox";


export function useGetAllContexts(userId?: string) {
  return useQuery<Source[], Error>({
    queryKey: ["contexts", userId],
    queryFn: () => {
      if (!userId) throw new Error("Missing userId");
      return getAllContextsForActiveSession(userId);
    },
    enabled: !!userId,
  });
}



export function useAddContext() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ source, chatSessionId }: ContextIndexingType) =>
      addContext({ source, chatSessionId }),

    onSuccess: () => {
      // invalidate to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },

    onError: (error) => {
      console.error("Error adding context:", error);
    },
  });
}
