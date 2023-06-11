import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";
import { API_PATH } from "@/constants";
import api from "@/utils/api";

//

export default function PaymentStatusPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function loadData() {
      const id = router.query["payment-id"];
      const data = await api.get(API_PATH.GETPAYMENT(id));
      setData(data);
    }

    loadData();
  }, []);

  return (
    <DefaultLayout>
      <MaxConstraints>{data?.[0]?.payment_status}</MaxConstraints>
    </DefaultLayout>
  );
}
