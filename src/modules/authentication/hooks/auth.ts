import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../actions";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => currentUser(),
    staleTime: 5 * 60 * 1000, 
  });
}
