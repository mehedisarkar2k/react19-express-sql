import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-key";
import { healthApi } from "../api";

export const useHealthQuery = () => useQuery({
    queryKey: queryKeys.health.all(),
    queryFn: () => healthApi.getHealth(),
})