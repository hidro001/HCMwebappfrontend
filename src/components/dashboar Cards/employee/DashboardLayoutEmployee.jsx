
import StatCard from './StatCard';
import PerformanceChart from './PerformanceChart';
import DemographicCard from './DemographicCard';
import AttendanceCard from './AttendanceCard';
import AnnouncementList from './AnnouncementList';
import EmployeeStatusChart from './EmployeeStatusChart';
import DepartmentChart from './DepartmentChart';
import MonthlyHiringChart from './MonthlyHiringChart';
import RaciOperationsChart from './RaciOperationsChart';

const statCardsData = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/33b2a5b98710a6cba505f5946e88b7176238058b4d46005e0bacbdf4a70aa24f?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
    iconBg: "https://cdn.builder.io/api/v1/image/assets/TEMP/6a85ad36c02abaf3b7f2e9986c6f7a728ca7609b927d052cc338741ccb2de56b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
    value: "650",
    label: "Total Employees",
    chart: "https://cdn.builder.io/api/v1/image/assets/TEMP/c8c556f3-0f82-4653-86fd-27cdb44b80df?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0849faf32a4e96a444ae069000717a635e7cef8e101303c7e452d755b4330cb0?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
    iconBg: "https://cdn.builder.io/api/v1/image/assets/TEMP/c96f1978f9159a3532d31c1f567bae27d439792b49bef1b23ea60f66c02a5200?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
    value: "400",
    label: "Users Logged In Today",
    chart: "https://cdn.builder.io/api/v1/image/assets/TEMP/597ae2e2-80e8-4d01-b07a-dc44fa83b2a0?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3ce7f522bedbb5911d2b3979895113ce595cddf77ff90ce059d43124ea0fd18?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
    iconBg: "https://cdn.builder.io/api/v1/image/assets/TEMP/c2dfc9cbc163655f76c801474dde7fbaad035bbe717e65dedf56589e681a3c1b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290",
    value: "10",
    label: "Employees On Leave Today",
    chart: "https://cdn.builder.io/api/v1/image/assets/TEMP/e86f287f-385e-4207-905f-1bea0fed97ee?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
  }
];

function DashboardLayoutEmployee() {
  return (
    <div className="flex overflow-hidden flex-col pt-3.5 bg-white">
      <header className="flex flex-wrap gap-5 justify-between self-center px-3.5 py-2 w-full bg-white rounded-lg max-w-[1423px] shadow-[0px_2px_8px_rgba(0,0,0,0.135)] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a21836cb70eb722e40d8a833ab21d04e42cdac953ff75eb785dc0fbb252b967?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
          alt="Company logo"
          className="object-contain shrink-0 aspect-[1.9] w-[97px]"
        />
        <div className="flex gap-9 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8307634b868e962731882a8dbbaedc7a110023f041e72cf31117100d7292d09?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
            alt="Navigation menu"
            className="object-contain self-start rounded-none aspect-[16.39] w-[835px] max-md:max-w-full"
          />
          <div className="flex gap-5 items-center py-3 pr-1.5 pl-2.5 text-xl text-black bg-lime-50 rounded-xl border border-lime-600 border-solid min-h-[53px]">
            <div className="self-stretch my-auto w-[92px]">Feb 2020</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/715538e594816eb2456241671b0741f4c4f014391f759c75562ed7b11857e797?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
              alt="Calendar icon"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </div>
          <div className="flex gap-6 items-start my-auto">
            <button aria-label="Notification" className="mt-3">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b348c63d66f554596c132fcecc3a205f6dd5c66db9e2bec440007043137bfe7?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
                alt=""
                className="object-contain shrink-0 w-4 aspect-[0.73]"
              />
            </button>
            <button aria-label="Messages" className="mt-3">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/41130dd57b4600404f773d78453a6f59254285ad836c4e6a891903e18c70445c?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
                alt=""
                className="object-contain shrink-0 w-4 aspect-[0.84]"
              />
            </button>
            <button aria-label="Profile" className="self-stretch">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba1137278fa0785f352a5f16bc1430b202e9188383dab190f78206d7a9dce2d8?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
                alt=""
                className="object-contain shrink-0 aspect-[0.86] shadow-[-1px_1px_6px_rgba(0,0,0,0.235)] w-[31px]"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="flex z-10 flex-wrap gap-7 mt-1.5 w-full max-w-[1438px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c1bf47505b8e4048acb1b38567322fc806ed4d86491500d951e23461033eb95?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
          alt=""
          className="object-contain shrink-0 aspect-[0.03] w-[97px] max-md:hidden"
        />
        
        <div className="flex-auto self-end mt-72 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col w-full max-md:mt-3.5 max-md:max-w-full">
                <div className="max-md:mr-1.5 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    {statCardsData.map((data, index) => (
                      <StatCard key={index} {...data} />
                    ))}
                  </div>
                </div>

                <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <EmployeeStatusChart />
                    <DepartmentChart />
                  </div>
                </div>

                <div className="mt-7 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col">
                    <div className="w-6/12 max-md:w-full">
                      <MonthlyHiringChart />
                    </div>
                    <div className="w-6/12 max-md:w-full">
                      <RaciOperationsChart />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center px-4 pt-4 pb-28 mt-12 ml-3.5 max-w-full text-lg font-semibold text-lime-600 bg-white rounded-2xl shadow-lg w-[434px] max-md:pb-24 max-md:mt-10">
                  <div className="self-start ml-3.5 max-md:ml-2.5">
                    ADD Dashlets
                  </div>
                  <div className="flex shrink-0 mt-3 h-px rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)]" />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b8216147e226d6bf40672622c22aee63b73c3a9d4e3baa8eb128c3cd21b8e9b?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
                    alt="Add dashlet illustration"
                    className="object-contain self-center mt-16 mb-0 max-w-full aspect-square w-[154px] max-md:mt-10 max-md:mb-2.5"
                  />
                </div>
              </div>
            </div>

            <aside className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-2 max-md:mt-5">
                <DemographicCard />
                <AttendanceCard />
                <AnnouncementList />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardLayoutEmployee;