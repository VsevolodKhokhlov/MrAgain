import { createFormModule } from "@/modules/forms";

export const searchForm = createFormModule({
  guid: "quick-search",
  async init() {
    return {
      model: "",
      zip: "",
    };
  },
});
