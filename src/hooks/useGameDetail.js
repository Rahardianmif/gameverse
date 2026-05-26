import { useQuery } from "@tanstack/react-query";
import gameApi from "../api/gameApi";

export function useGameDetail(id) {
  return useQuery({
    queryKey: ["game-detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await gameApi.get("/game", {
        params: { id },
      });

      return response.data;
    },
  });
}
