import { useQuery } from "@tanstack/react-query";
import gameApi from "../api/gameApi";

export function useGames() {
  return useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await gameApi.get("/games");
      return Array.isArray(response.data) ? response.data : [];
    },
  });
}
