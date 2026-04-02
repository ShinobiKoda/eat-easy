
import { useOrderContext } from "../context/OrderContext";

export function useOrder() {
  return useOrderContext();
}
