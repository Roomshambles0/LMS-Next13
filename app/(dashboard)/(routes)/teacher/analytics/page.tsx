
import { redirect } from "next/navigation";

import { getAnalytics } from "@/app/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getCurrentAdmin } from "@/app/actions/getCurrentAdmin";

const AnalyticsPage = async () => {
const user = await getCurrentAdmin();

  if (!user) {
    return redirect("/");
  }
const userId =user.id;
  const {
    data,
    totalRevenue,
    totalSales,
  } = await getAnalytics(userId);

  return ( 
    <div className=" mt-32 p-6 md:ml-60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
      </div>
      <Chart
        data={data}
      />
    </div>
   );
}
 
export default AnalyticsPage;